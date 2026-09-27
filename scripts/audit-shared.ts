// scripts/audit-shared.ts
//
// What `pnpm audit:pages` (scripts/audit-pages.ts) and `pnpm audit:dom` (scripts/audit-dom.ts)
// share: the argument parsing, the routes-file reader and the wait strategy for loading a
// page on either side; and what `pnpm audit:pages` shares with scripts/rebuild-audit-index.ts:
// the audit/index.html renderer. The routes file's grammar and the route slugging are pure
// and live in scripts/audit-routes.ts. Neither script duplicates the other; the parity
// ledger's two halves point at the same routes file and the same `audit/<slug>/` layout.
//
// Wait strategy: each capture tries `networkidle` first (best for static pages); on the
// 15 s timeout it falls back to `load` + 2.5 s settle. This handles 3D-viewer pages
// (`/designs/<slug>`) where the network never goes quiet. Either way, animations get
// 800 ms before the capture.

import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Page, Response } from 'playwright'

import { type RouteEntry, type Side, parseRoutes, routeToSlug } from './audit-routes.ts'

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** The parsed command line, the defaults filled in. */
export interface AuditArgs {
  legacyBase: string
  currentBase: string
  widths: number[]
  routesFile: string
  outDir: string
  headed: boolean
}

/** How a page load ended: settled with its HTTP status, or failed with no response. */
export type LoadResult = { ok: true; status: number } | { ok: false; status: 0; error: string }

export const DEFAULTS: AuditArgs = {
  legacyBase: 'https://gridkit-landing-villagekit.vercel.app',
  currentBase: 'http://localhost:3000',
  widths: [375, 768, 1280],
  routesFile: 'scripts/audit-routes.txt',
  outDir: 'audit',
  headed: false,
}

// `command` names the script in the usage text; `widths` says whether `--widths` is one of
// its flags (the screenshots take viewport widths, the DOM extraction does not).
export function parseArgs(
  argv: string[],
  { command, widths: acceptsWidths }: { command: string; widths: boolean },
): AuditArgs {
  const args: AuditArgs = { ...DEFAULTS }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    const next = (): string => {
      const v = argv[++i]
      if (v === undefined) {
        console.error({ argument: arg }, 'missing value for argument')
        process.exit(1)
      }
      return v
    }
    if (arg === '--legacy-base') args.legacyBase = next()
    else if (arg === '--current-base') args.currentBase = next()
    else if (arg === '--widths' && acceptsWidths)
      args.widths = next()
        .split(',')
        .map((s) => Number(s.trim()))
    else if (arg === '--routes') args.routesFile = next()
    else if (arg === '--out') args.outDir = next()
    else if (arg === '--headed') args.headed = true
    else if (arg === '--help' || arg === '-h') {
      const widthsLine = acceptsWidths
        ? `\n  --widths W1,W2,...   Default: ${DEFAULTS.widths.join(',')}`
        : ''
      console.log(`Usage: pnpm ${command} [options]

  --legacy-base URL    Default: ${DEFAULTS.legacyBase}
  --current-base URL   Default: ${DEFAULTS.currentBase}${widthsLine}
  --routes PATH        Default: ${DEFAULTS.routesFile}
  --out DIR            Default: ${DEFAULTS.outDir} (relative to repo root)
  --headed             Run browser in headed mode (debugging)
  --help, -h           Show this help`)
      process.exit(0)
    } else {
      console.error({ argument: arg }, 'unknown argument, run with --help for usage')
      process.exit(1)
    }
  }
  return args
}

/**
 * Reads the routes file, relative to the repo root, into one entry per route line, per
 * parseRoutes in scripts/audit-routes.ts (scripts/audit-routes.txt documents the markers in its
 * header). A line that breaks the grammar stops the run.
 */
export async function loadRoutes(routesFile: string): Promise<RouteEntry[]> {
  const text = await readFile(resolve(REPO_ROOT, routesFile), 'utf8')
  const parsed = parseRoutes(text)
  if (!parsed.ok) {
    console.error(
      { routesFile, line: parsed.line, text: parsed.text },
      'expected "<route>" or "<route> legacy-only|current-only"',
    )
    process.exit(1)
  }
  return parsed.routes
}

/** The message of a caught value, which JavaScript does not promise is an `Error`. */
export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

/** One screenshot cell of the index: a capture, with its HTTP status when known, or why there is none. */
export type IndexCell = { ok: true; status?: number } | { ok: false; reason: string }

/**
 * Renders audit/index.html: a section per route, in the order given, with the legacy and the
 * current screenshot side by side at each width. `cell` says what each screenshot is; a status
 * of 400 or more is tagged on the image.
 */
export function renderIndexHtml({
  routes,
  widths,
  cell,
}: {
  routes: readonly string[]
  widths: readonly number[]
  cell: (route: string, width: number, side: Side) => IndexCell
}): string {
  const sections = routes
    .map((route) => {
      const slug = routeToSlug(route)
      const widthBlocks = widths
        .map((w) => {
          const figure = (side: Side) => {
            const file = `${slug}/${w}/${side}.png`
            const shown = cell(route, w, side)
            if (!shown.ok) return `<div class="missing">${shown.reason}</div>`
            const tag =
              shown.status !== undefined && shown.status >= 400
                ? `<span class="status">HTTP ${shown.status}</span>`
                : ''
            return `<a href="${file}" target="_blank">${tag}<img src="${file}" alt="${side} ${route} ${w}px" loading="lazy"></a>`
          }
          return `      <section class="width">
        <h3>${w}px</h3>
        <div class="pair">
          <figure><figcaption>legacy</figcaption>${figure('legacy')}</figure>
          <figure><figcaption>current</figcaption>${figure('current')}</figure>
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

// Loads `url` in `page` per the wait strategy above. Resolves to `{ ok: true, status }` once
// the page has settled, or `{ ok: false, status: 0, error }` when no attempt landed.
//
// A pass that fails outright is tried once more after a pause: under load, the `load`
// fallback can start while the timed-out `networkidle` navigation is still in flight, and
// Chromium then reports the fallback as "interrupted by another navigation". A page that is
// really down fails twice; a collision or a network blip clears.
export async function gotoSettled(page: Page, url: string): Promise<LoadResult> {
  const first = await gotoOnce(page, url)
  if (first.ok) return first
  console.warn({ url, error: first.error }, 'capture failed, retrying once')
  await page.waitForTimeout(2_000)
  return gotoOnce(page, url)
}

async function gotoOnce(page: Page, url: string): Promise<LoadResult> {
  let response: Response | null
  try {
    response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15_000 })
  } catch {
    try {
      response = await page.goto(url, { waitUntil: 'load', timeout: 30_000 })
      // Pages that don't reach networkidle usually have heavy late-paint work; give them more.
      await page.waitForTimeout(2_500)
    } catch (err) {
      return { ok: false, status: 0, error: errorMessage(err) }
    }
  }
  await page.waitForTimeout(800)
  return { ok: true, status: response?.status() ?? 0 }
}
