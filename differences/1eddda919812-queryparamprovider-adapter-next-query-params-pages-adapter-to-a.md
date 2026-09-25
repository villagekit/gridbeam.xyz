---
title: "QueryParamProvider adapter: next-query-params' pages adapter to a site-written app-router adapter"
status: open
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:6,94`: the adapter is the library's, `NextAdapter` from `next-query-params` (4.3.0 in the legacy lock, the pages adapter, over `use-query-params` 2.2.1): the query empty until `router.isReady`, then the live `window.location`, so a history write made outside the adapter is read by the next `setQuery` at once; writes are shallow `router.push` and `router.replace` with `scroll: false`.

## Current

`app/_components/NextQueryParamAdapter.tsx`: a site-written adapter over `use-query-params` 2.2.2, mounted by `app/_components/SiteProvider.tsx` in the same position. The query is empty on the server and during hydration (a `useSyncExternalStore` hydrated flag), then the one Next's router holds, read by `useSearchParams()` on the client only; writes are `window.history.pushState` and `replaceState`, which Next patches to keep its router in sync, and are read back at once until the router reports them, so a later `setQuery` builds on them before the router has caught up. Two semantic gaps against the live `window.location`, neither reached by a consumer: a history write made outside the adapter is read only once Next's router reports it, a transition later; and the pending writes are trimmed in render, so a time-sliced render React throws away keeps its trim, and a write made while a heavy transition render is in flight can read the older search until that transition commits (not reproduced under 60x CPU throttling). `next-query-params` is not a dependency: its app adapter (5.1.0, `dist/app.cjs.development.js:12`) calls `useSearchParams()` unconditionally, which under a static prerender fails the build outside Suspense and, wrapped at the root, client-renders every route ([[43c1babc2051]]'s Log).

## Verdict

## Log

- 2026-09-26: Filed by plan [[531b810f2dbd]] for its own deviation, so not judged by it. The rule to test it against is rule 4 of `2032533f` (upgrade-forced): the app router has no library adapter that keeps the static prerender, and the site-written one changes nothing a consumer sees (`useQueryParams` from `use-query-params`, one provider in the shell, empty query until hydrated, back and forward through the history). The Phase 0 alternatives dropped, with their evidence, are in that plan's Outcome.
