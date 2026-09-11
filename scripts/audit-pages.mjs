#!/usr/bin/env node
// scripts/audit-pages.mjs
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
// The argument parsing, the routes-file reader, the slugging and the wait strategy live in
// scripts/audit-shared.mjs, shared with `pnpm audit:dom`.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'

import { chromium } from 'playwright'

import {
  REPO_ROOT,
  SIDES,
  gotoSettled,
  loadRoutes,
  parseArgs,
  routeToSlug,
} from './audit-shared.mjs'

async function captureSide({ page, url, outFile }) {
  const loaded = await gotoSettled(page, url)
  if (!loaded.ok) return loaded
  try {
    await mkdir(dirname(outFile), { recursive: true })
    await page.screenshot({ path: outFile, fullPage: true })
    return { ok: true, status: loaded.status }
  } catch (err) {
    return { ok: false, status: 0, error: err.message }
  }
}

function renderIndexHtml({ results, widths }) {
  const routes = [...new Set(results.map((r) => r.route))]
  const sections = routes
    .map((route) => {
      const slug = routeToSlug(route)
      const widthBlocks = widths
        .map((w) => {
          const cell = (side) => {
            const file = `${slug}/${w}/${side}.png`
            const result = results.find(
              (r) => r.route === route && r.width === w && r.side === side,
            )
            if (!result?.ok) {
              return `<div class="missing">capture failed${result?.error ? ` — ${result.error}` : ''}</div>`
            }
            const tag =
              result.status >= 400 ? `<span class="status">HTTP ${result.status}</span>` : ''
            return `<a href="${file}" target="_blank">${tag}<img src="${file}" alt="${side} ${route} ${w}px" loading="lazy"></a>`
          }
          return `      <section class="width">
        <h3>${w}px</h3>
        <div class="pair">
          <figure><figcaption>legacy</figcaption>${cell('legacy')}</figure>
          <figure><figcaption>current</figcaption>${cell('current')}</figure>
        </div>
      </section>`
        })
        .join('\n')
      return `    <article id="${slug}">
      <header><h2><code>${route}</code></h2></header>
${widthBlocks}
    </article>`
    })
    .join('\n')

  const nav = routes.map((r) => `<a href="#${routeToSlug(r)}"><code>${r}</code></a>`).join(' ')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Parity audit</title>
<style>
  :root { color-scheme: light dark; font-family: system-ui, sans-serif; }
  body { margin: 0; padding: 1.5rem; max-width: 1800px; margin-inline: auto; }
  h1 { margin-top: 0; }
  nav { position: sticky; top: 0; z-index: 1; background: Canvas; padding: 0.5rem 0; border-bottom: 1px solid color-mix(in srgb, CanvasText 25%, transparent); margin-bottom: 1rem; line-height: 2; }
  nav a { margin-right: 0.5rem; }
  article { margin-block: 2rem; padding-top: 1rem; border-top: 1px solid color-mix(in srgb, CanvasText 25%, transparent); }
  article > header h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }
  .width { margin-block: 1rem; }
  .width h3 { font-size: 0.9rem; margin: 0.25rem 0; opacity: 0.7; font-weight: normal; }
  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  figure { margin: 0; position: relative; }
  figcaption { font-size: 0.75rem; opacity: 0.6; margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 0.05em; }
  img { width: 100%; height: auto; display: block; border: 1px solid color-mix(in srgb, CanvasText 25%, transparent); }
  .missing { padding: 2rem; text-align: center; opacity: 0.6; border: 1px dashed currentColor; font-size: 0.85rem; }
  .status { position: absolute; top: 0.4rem; left: 0.4rem; background: color-mix(in srgb, CanvasText 80%, transparent); color: Canvas; padding: 0.1em 0.4em; font-size: 0.75rem; border-radius: 3px; z-index: 1; }
  code { background: color-mix(in srgb, CanvasText 10%, transparent); padding: 0.1em 0.3em; border-radius: 3px; font-size: 0.9em; }
</style>
</head>
<body>
<h1>Parity audit</h1>
<nav>${nav}</nav>
${sections}
</body>
</html>
`
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
  const results = []

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
    renderIndexHtml({ results, widths: args.widths }),
    'utf8',
  )

  const failed = results.filter((r) => !r.ok)
  console.log(`\nDone. ${results.length - failed.length}/${results.length} captures succeeded.`)
  console.log(`Open ${join(args.outDir, 'index.html')} to review.`)
  if (failed.length > 0) {
    console.log(`(${failed.length} captures failed — see warnings above.)`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
