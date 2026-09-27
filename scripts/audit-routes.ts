// scripts/audit-routes.ts
//
// The parity tooling's pure route helpers: the grammar of scripts/audit-routes.txt, the
// mapping between a route and its `audit/<slug>/` directory, and the order audit/index.html
// lists routes in when scripts/rebuild-audit-index.ts discovers them. No file system, no
// browser: scripts/audit-shared.ts reads the routes file and exits on an error, and
// `audit-routes.test.ts` specifies these.

/** Which site a capture is of: the legacy gridkit.nz site or this one. */
export type Side = 'legacy' | 'current'

/** Both sides, legacy first, the order every capture and every index row follows. */
export const SIDES: readonly Side[] = ['legacy', 'current']

/** One line of the routes file: the path and the sides it is declared on. */
export interface RouteEntry {
  route: string
  sides: Side[]
}

/** The routes file read whole, or the first line that breaks its grammar, numbered from one. */
export type ParsedRoutes =
  | { ok: true; routes: RouteEntry[] }
  | { ok: false; line: number; text: string }

/**
 * Reads the routes file's text: one route per line, `#` starting a comment, blank lines
 * skipped. An unmarked route is declared on both of SIDES; a route followed by `legacy-only`
 * or `current-only` on that side alone. Anything else after the path is an error, so a typo
 * can't silently pass as "both sides".
 */
export function parseRoutes(text: string): ParsedRoutes {
  const routes: RouteEntry[] = []
  for (const [index, raw] of text.split('\n').entries()) {
    const line = raw.replace(/#.*$/, '').trim()
    if (!line) continue
    const [route = '', marker, ...rest] = line.split(/\s+/)
    const markedSide = marker === undefined ? undefined : SIDE_MARKERS.get(marker)
    if (rest.length > 0 || (marker !== undefined && markedSide === undefined)) {
      return { ok: false, line: index + 1, text: line }
    }
    routes.push({ route, sides: markedSide ? [markedSide] : [...SIDES] })
  }
  return { ok: true, routes }
}

/** The directory name under `audit/` for a route: `_root` for `/`, `__` for each inner slash. */
export function routeToSlug(route: string): string {
  if (route === '/') return '_root'
  return route.replace(/^\/+|\/+$/g, '').replace(/\//g, '__')
}

/** The route an `audit/<slug>/` directory holds, the inverse of routeToSlug. */
export function slugToRoute(slug: string): string {
  if (slug === '_root') return '/'
  return `/${slug.replace(/__/g, '/')}`
}

/**
 * Sorts routes for the index, into a new array: the known top-level routes first in their
 * known order, each known route's children right after it, then every other route; ties
 * alphabetical.
 */
export function orderRoutes(routes: readonly string[]): string[] {
  return [...routes].sort((a, b) => knownIndex(a) - knownIndex(b) || a.localeCompare(b))
}

const SIDE_MARKERS = new Map<string, Side>([
  ['legacy-only', 'legacy'],
  ['current-only', 'current'],
])

const KNOWN_ORDER = [
  '/',
  '/about',
  '/faq',
  '/contact',
  '/subscribe',
  '/tools-and-resources',
  '/tools/cutting-planner',
  '/legal',
  '/legal/privacy-policy',
  '/legal/cookie-policy',
  '/legal/return-policy',
  '/stories',
  '/designs',
]

function knownIndex(route: string): number {
  const index = KNOWN_ORDER.indexOf(route)
  if (index !== -1) return index
  // A child sorts between its parent and the next known route.
  const parent = KNOWN_ORDER.findIndex((known) => route.startsWith(`${known}/`))
  return parent !== -1 ? parent + 0.5 : KNOWN_ORDER.length
}
