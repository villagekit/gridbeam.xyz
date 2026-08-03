/**
 * Shallow URL updates for client-side view state (design parameters, catalogue
 * filters, cutting-planner input).
 *
 * `router.replace` refetches the RSC payload from the server on every call, so
 * a slider drag or a keystroke costs a worker round-trip and the address bar
 * only catches up once it lands. The native History API is the App Router's
 * shallow-routing equivalent: Next patches `pushState`/`replaceState` and keeps
 * `usePathname` / `useSearchParams` in sync, so state derived from the URL still
 * re-renders. This mirrors the legacy site's `shallow: true` router calls.
 *
 * Note(cc): replace, never push — none of these views treat back as "undo my
 * last filter". Back/forward across a real navigation still restores state,
 * because each of these components reads its initial state from the URL when it
 * remounts.
 */
export function replaceUrl(url: string): void {
  window.history.replaceState(null, '', url)
}

/** Builds a `?a=b` string from the current query plus `mutate`, or the bare path when empty. */
export function withSearchParams(
  queryString: string,
  mutate: (next: URLSearchParams) => void,
): string {
  const next = new URLSearchParams(queryString)
  mutate(next)
  const search = next.toString()
  return search ? `${window.location.pathname}?${search}` : window.location.pathname
}
