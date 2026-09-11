// scripts/audit-shared.mjs
//
// What `pnpm audit:pages` (scripts/audit-pages.mjs) and `pnpm audit:dom` (scripts/audit-dom.mjs)
// share: the argument parsing, the routes-file reader, the route slugging and the wait
// strategy for loading a page on either side. Neither script duplicates the other; the
// parity ledger's two halves point at the same routes file and the same `audit/<slug>/`
// layout.
//
// Wait strategy: each capture tries `networkidle` first (best for static pages); on the
// 15 s timeout it falls back to `load` + 2.5 s settle. This handles 3D-viewer pages
// (`/designs/<slug>`) where the network never goes quiet. Either way, animations get
// 800 ms before the capture.

import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

export const SIDES = ['legacy', 'current']

export const DEFAULTS = {
  legacyBase: 'https://gridkit-landing-villagekit.vercel.app',
  currentBase: 'http://localhost:3000',
  widths: [375, 768, 1280],
  routesFile: 'scripts/audit-routes.txt',
  outDir: 'audit',
  headed: false,
}

// `command` names the script in the usage text; `widths` says whether `--widths` is one of
// its flags (the screenshots take viewport widths, the DOM extraction does not).
export function parseArgs(argv, { command, widths: acceptsWidths }) {
  const args = { ...DEFAULTS }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    const next = () => {
      const v = argv[++i]
      if (v === undefined) {
        console.error(`Missing value for ${arg}`)
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
      console.error(`Unknown argument: ${arg}\nRun with --help for usage.`)
      process.exit(1)
    }
  }
  return args
}

// One entry per route line: `{ route, sides }`, where `sides` is both of SIDES for an
// unmarked route and one of them for a route marked `legacy-only` or `current-only` after
// the path (scripts/audit-routes.txt documents the markers in its header). Anything else
// after the path is an error, so a typo can't silently pass as "both sides".
export async function loadRoutes(routesFile) {
  const text = await readFile(resolve(REPO_ROOT, routesFile), 'utf8')
  const routes = []
  for (const [index, raw] of text.split('\n').entries()) {
    const line = raw.replace(/#.*$/, '').trim()
    if (!line) continue
    const [route, marker, ...rest] = line.split(/\s+/)
    if (rest.length > 0 || (marker !== undefined && !SIDE_MARKERS.has(marker))) {
      console.error(
        `${routesFile}:${index + 1}: expected "<route>" or "<route> legacy-only|current-only", got "${line}"`,
      )
      process.exit(1)
    }
    routes.push({ route, sides: marker ? [SIDE_MARKERS.get(marker)] : [...SIDES] })
  }
  return routes
}

const SIDE_MARKERS = new Map([
  ['legacy-only', 'legacy'],
  ['current-only', 'current'],
])

export function routeToSlug(route) {
  if (route === '/') return '_root'
  return route.replace(/^\/+|\/+$/g, '').replace(/\//g, '__')
}

// Loads `url` in `page` per the wait strategy above. Resolves to `{ ok: true, status }` once
// the page has settled, or `{ ok: false, status: 0, error }` when no attempt landed.
//
// A pass that fails outright is tried once more after a pause: under load, the `load`
// fallback can start while the timed-out `networkidle` navigation is still in flight, and
// Chromium then reports the fallback as "interrupted by another navigation". A page that is
// really down fails twice; a collision or a network blip clears.
export async function gotoSettled(page, url) {
  const first = await gotoOnce(page, url)
  if (first.ok) return first
  console.warn({ url, error: first.error }, 'capture failed, retrying once')
  await page.waitForTimeout(2_000)
  return gotoOnce(page, url)
}

async function gotoOnce(page, url) {
  let response
  try {
    response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15_000 })
  } catch {
    try {
      response = await page.goto(url, { waitUntil: 'load', timeout: 30_000 })
      // Pages that don't reach networkidle usually have heavy late-paint work; give them more.
      await page.waitForTimeout(2_500)
    } catch (err) {
      return { ok: false, status: 0, error: err.message }
    }
  }
  await page.waitForTimeout(800)
  return { ok: true, status: response?.status() ?? 0 }
}
