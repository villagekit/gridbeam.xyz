---
title: QueryParamProvider replaced by a hand-written url-state helper
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:6,11,94`: `<QueryParamProvider adapter={NextQueryParamAdapter}>` from `use-query-params` and `next-query-params`, wrapping every page.

## Current

`app/_lib/url-state.ts:1-30`: `replaceUrl` and `withSearchParams` over `window.history.replaceState`; no provider in `app/layout.tsx`.

## Verdict

## Log

- 2026-09-12: No rule covers it. The closing plan checks whether `use-query-params` has an app-router adapter before deciding how to restore the legacy pattern.
