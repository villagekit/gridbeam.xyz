---
title: QueryParamProvider replaced by a hand-written url-state helper
status: fixed
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:6,11,94`: `<QueryParamProvider adapter={NextQueryParamAdapter}>` from `use-query-params` and `next-query-params`, wrapping every page.

## Current

`app/_lib/url-state.ts:1-30`: `replaceUrl` and `withSearchParams` over `window.history.replaceState`; no provider in `app/layout.tsx`.

## Verdict

plan 531b810f

## Log

- 2026-09-12: No rule covers it. The closing plan checks whether `use-query-params` has an app-router adapter before deciding how to restore the legacy pattern.

- 2026-09-26: Verified by plan a7bf623f885c, not closed by it: next-query-params@5.1.0 (peers Next 15 and React 19, MIT) exports an app-router adapter, dist/app.cjs.development.js:12, that calls useSearchParams(). Mounted in the root layout with no Suspense, next build fails every static route (useSearchParams() should be wrapped in a suspense boundary, at /designs/[id] and /stories/[slug] first); wrapped in Suspense at the root, the build passes but every route bails out to client-side rendering: .next/server/app/about.html holds <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"> and no <main>. Neither is the legacy pages adapter, whose query is empty on the server and fills after hydration with the static HTML intact. The choice of adapter is plan 531b810f2dbd, a Phase 0 slice on the shell record.
