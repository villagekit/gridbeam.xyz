#!/usr/bin/env node
// scripts/audit-pages.ts
//
// Side-by-side parity screenshots of the legacy gridkit.nz vs the current gridbeam.xyz.
// For each route in scripts/audit-routes.txt × each viewport width, captures a full-page
// screenshot of both bases and writes audit/<slug>/<width>/{legacy,current}.png. Then
// generates audit/index.html — a static grid that puts every pair side by side.
//
// The screenshot half of the parity ledger's tooling; `pnpm audit:dom` is the text half.
//
// Prerequisites (per machine):
//   - `pnpm install` (adds the playwright dep)
//   - `pnpm exec playwright install chromium`
//   - `pnpm dev` running in another terminal (for current-side captures)
//
// Usage:
//   pnpm audit:pages
//   pnpm audit:pages --widths 375,1280
//   pnpm audit:pages --routes scripts/audit-routes.txt --headed
//   pnpm audit:pages --current-base http://localhost:3001
//   pnpm audit:pages --help
//
// The argument parsing, the routes-file reader and the wait strategy live in
// scripts/audit-shared.ts, shared with `pnpm audit:dom`, beside the index renderer, shared with
// scripts/rebuild-audit-index.ts; the routes-file grammar and the slugging live in
// scripts/audit-routes.ts.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'

import { type Page, chromium } from 'playwright'

import { SIDES, type Side, routeToSlug } from './audit-routes.ts'
import {
  type LoadResult,
  REPO_ROOT,
  errorMessage,
  gotoSettled,
  loadRoutes,
  parseArgs,
  renderIndexHtml,
} from './audit-shared.ts'

// One capture's outcome, as the index renders it.
type CaptureResult = LoadResult & { route: string; width: number; side: Side }

async function captureSide({
  page,
  url,
  outFile,
}: { page: Page; url: string; outFile: string }): Promise<LoadResult> {
  const loaded = await gotoSettled(page, url)
  if (!loaded.ok) return loaded
  try {
    await mkdir(dirname(outFile), { recursive: true })
    await page.screenshot({ path: outFile, fullPage: true })
    return { ok: true, status: loaded.status }
  } catch (err) {
    return { ok: false, status: 0, error: errorMessage(err) }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2), { command: 'audit:pages', widths: true })
  const outDir = resolve(REPO_ROOT, args.outDir)

  console.log(`Audit configuration:
  legacy base:  ${args.legacyBase}
  current base: ${args.currentBase}
  widths:       ${args.widths.join(', ')}
  routes file:  ${args.routesFile}
  out dir:      ${outDir}
`)

  const routes = await loadRoutes(args.routesFile)
  if (routes.length === 0) {
    console.error('No routes found in routes file.')
    process.exit(1)
  }
  console.log(
    `${routes.length} route(s) × ${args.widths.length} width(s) × 2 sides = ${routes.length * args.widths.length * 2} captures.\n`,
  )

  await mkdir(outDir, { recursive: true })

  const browser = await chromium.launch({ headless: !args.headed })
  const results: CaptureResult[] = []

  const bases = { legacy: args.legacyBase, current: args.currentBase }

  try {
    // A route marked one-sided in the routes file is still screenshotted on both sides: the
    // 404 capture is a useful signal.
    for (const { route } of routes) {
      console.log(`▷ ${route}`)
      const slug = routeToSlug(route)
      for (const width of args.widths) {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          deviceScaleFactor: 1,
        })
        const page = await context.newPage()
        for (const side of SIDES) {
          const url = `${bases[side]}${route}`
          const outFile = join(outDir, slug, String(width), `${side}.png`)
          const r = await captureSide({ page, url, outFile })
          results.push({ route, width, side, ...r })
          const tag = r.ok
            ? r.status >= 400
              ? `ok (HTTP ${r.status})`
              : 'ok'
            : `FAILED — ${r.error}`
          console.log(`  · ${width}px ${side}: ${tag}`)
        }
        await context.close()
      }
    }
  } finally {
    await browser.close()
  }

  await writeFile(
    join(outDir, 'index.html'),
    renderIndexHtml({
      routes: [...new Set(results.map((r) => r.route))],
      widths: args.widths,
      cell: (route, width, side) => {
        const result = results.find(
          (r) => r.route === route && r.width === width && r.side === side,
        )
        if (result?.ok) return { ok: true, status: result.status }
        return {
          ok: false,
          reason: `capture failed${result?.error ? ` — ${result.error}` : ''}`,
        }
      },
    }),
    'utf8',
  )

  const failed = results.filter((r) => !r.ok)
  console.log(`\nDone. ${results.length - failed.length}/${results.length} captures succeeded.`)
  console.log(`Open ${join(args.outDir, 'index.html')} to review.`)
  if (failed.length > 0) {
    console.log(`(${failed.length} captures failed — see warnings above.)`)
  }
}

main().catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})
