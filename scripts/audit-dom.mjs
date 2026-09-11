#!/usr/bin/env node
// scripts/audit-dom.mjs
//
// The text half of the parity ledger's tooling; `pnpm audit:pages` is the screenshot half.
// For each route in scripts/audit-routes.txt × each side the route is declared on, loads the
// page and writes, under audit/<slug>/dom/:
//
//   <side>.txt        the visible text in document order, one block per line, whitespace
//                     collapsed (`document.body.innerText` through scripts/audit-dom/normalize.ts);
//                     `diff legacy.txt current.txt` is the copy diff
//   <side>.aria.yaml  the accessibility tree as Playwright's aria snapshot, raw: roles, names,
//                     headings, links, buttons and their states; the accessibility family reads it
//   manifest.json     each side's status: the URL, the HTTP status, an error, or `skipped` for
//                     the side a `legacy-only` / `current-only` route does not have
//
// A side the route is declared on that fails (HTTP 400 or more, a navigation error, a timeout)
// is recorded; after every route was attempted, the script exits non-zero if any did. Both
// files are still written for an HTTP failure that rendered a page (a 404 page is a useful
// signal); the manifest says which.
//
// Pages load at the 1280 px desktop viewport: innerText and the aria snapshot follow what is
// rendered, so a menu collapsed at phone width would otherwise drop out of the extraction.
//
// Read the two files together; each is innerText or the accessibility tree, nothing more:
//   - `.txt` is what is rendered at the moment of capture, in DOM order. It has no alt text
//     (an image leaves no line at all; an icon with a text alternative is a gap in the
//     sentence), nothing behind an inactive tab or a closed menu, and it does include visually
//     hidden text (a skip link, a carousel's live region). The `.aria.yaml` has the alt text
//     and the names; the source has what is behind a tab.
//   - Neither file has the page's `<title>` or its meta description: both snapshots start at
//     `<body>`. The copy family reads those from the source on both sides.
//   - Animated text (the home hero's typewriter, a carousel slide) is captured wherever the
//     animation is after the wait strategy's settle, and can differ between runs.
//   - A table row is one line with its cells separated by single spaces.
//
// Prerequisites (per machine):
//   - `pnpm install` (adds the playwright dep)
//   - `pnpm exec playwright install chromium`
//   - `pnpm dev` running in another terminal (for current-side captures)
//   - Node 22.18 or later (the normalizer is a `.ts` import; `.nvmrc` is the version CI uses)
//
// Usage:
//   pnpm audit:dom
//   pnpm audit:dom --routes scripts/audit-routes.txt --headed
//   pnpm audit:dom --current-base http://localhost:3001
//   pnpm audit:dom --help
//
// The argument parsing, the routes-file reader, the slugging and the wait strategy live in
// scripts/audit-shared.mjs, shared with `pnpm audit:pages`.

import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

import { chromium } from 'playwright'

import { normalize } from './audit-dom/normalize.ts'
import {
  REPO_ROOT,
  SIDES,
  gotoSettled,
  loadRoutes,
  parseArgs,
  routeToSlug,
} from './audit-shared.mjs'

const VIEWPORT = { width: 1280, height: 900 }

async function captureSide({ page, url, outDir, side }) {
  const files = [join(outDir, `${side}.txt`), join(outDir, `${side}.aria.yaml`)]
  // A side that never loaded leaves no files behind: a stale extraction from an earlier run
  // beside a manifest that says the side failed would diff as if it were fresh.
  await Promise.all(files.map((file) => rm(file, { force: true })))
  const loaded = await gotoSettled(page, url)
  if (!loaded.ok) return { ok: false, status: 0, error: loaded.error, url }
  try {
    const [innerText, aria] = await Promise.all([
      page.evaluate(() => document.body.innerText),
      page.ariaSnapshot(),
    ])
    await mkdir(outDir, { recursive: true })
    const [textFile, ariaFile] = files
    await Promise.all([
      writeFile(textFile, normalize(innerText), 'utf8'),
      writeFile(ariaFile, aria.endsWith('\n') ? aria : `${aria}\n`, 'utf8'),
    ])
  } catch (err) {
    return { ok: false, status: loaded.status, error: err.message, url }
  }
  if (loaded.status >= 400) {
    return { ok: false, status: loaded.status, error: `HTTP ${loaded.status}`, url }
  }
  return { ok: true, status: loaded.status, url }
}

async function main() {
  const args = parseArgs(process.argv.slice(2), { command: 'audit:dom', widths: false })
  const outDir = resolve(REPO_ROOT, args.outDir)

  console.log(`Audit configuration:
  legacy base:  ${args.legacyBase}
  current base: ${args.currentBase}
  routes file:  ${args.routesFile}
  out dir:      ${outDir}
`)

  const routes = await loadRoutes(args.routesFile)
  if (routes.length === 0) {
    console.error('No routes found in routes file.')
    process.exit(1)
  }
  const captureCount = routes.reduce((n, { sides }) => n + sides.length, 0)
  console.log(`${routes.length} route(s), ${captureCount} captures.\n`)

  await mkdir(outDir, { recursive: true })

  const bases = { legacy: args.legacyBase, current: args.currentBase }
  const browser = await chromium.launch({ headless: !args.headed })
  const failures = []

  try {
    for (const { route, sides } of routes) {
      console.log(`▷ ${route}`)
      const slug = routeToSlug(route)
      const routeDir = join(outDir, slug, 'dom')
      const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 })
      const page = await context.newPage()
      const manifest = { route, slug, capturedAt: new Date().toISOString() }
      for (const side of SIDES) {
        if (!sides.includes(side)) {
          manifest[side] = { skipped: true, reason: `${sides[0]}-only` }
          console.log(`  · ${side}: skipped (${sides[0]}-only)`)
          continue
        }
        const url = `${bases[side]}${route}`
        const r = await captureSide({ page, url, outDir: routeDir, side })
        manifest[side] = r
        if (!r.ok) failures.push({ route, side, error: r.error })
        console.log(`  · ${side}: ${r.ok ? 'ok' : `FAILED — ${r.error}`}`)
      }
      await context.close()
      await mkdir(routeDir, { recursive: true })
      await writeFile(
        join(routeDir, 'manifest.json'),
        `${JSON.stringify(manifest, null, 2)}\n`,
        'utf8',
      )
    }
  } finally {
    await browser.close()
  }

  console.log(`\nDone. ${captureCount - failures.length}/${captureCount} captures succeeded.`)
  if (failures.length > 0) {
    console.error(`${failures.length} capture(s) failed:`)
    for (const f of failures) console.error(`  ${f.route} ${f.side}: ${f.error}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
