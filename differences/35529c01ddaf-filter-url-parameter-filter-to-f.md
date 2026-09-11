---
title: "Filter URL parameter: filter to f"
status: regression
route: /stories
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/context/stories.tsx:22-24,35-39` `useQueryParams({ filter: withDefault(filterEnumParam, 'all') })`: `/stories?filter=guide`.

## Current

`app/stories/StoriesBrowser.tsx:16,34-48` `FILTER_PARAM = 'f'`, read with `useSearchParams`, written with `replaceUrl` (`app/_lib/url-state.ts:17-30`): `/stories?f=guide`. A legacy `?filter=guide` link is ignored.

## Verdict

## Log

- 2026-09-12: The library swap (use-query-params to url-state) is shell 43c1babc2051; this is the route's parameter name.
