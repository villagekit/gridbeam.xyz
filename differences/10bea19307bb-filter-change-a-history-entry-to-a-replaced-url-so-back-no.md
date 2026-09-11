---
title: "Filter change: a history entry to a replaced URL, so Back no longer undoes it"
status: regression
route: /stories
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/context/stories.tsx:36-39,55-60` `useQueryParams` with `setQuery({ filter })` and no `updateType`, whose default is `pushIn` (`use-query-params@2.1.2 src/options.ts:12`): each filter click pushes a history entry and Back returns to the previous filter.

## Current

`app/stories/StoriesBrowser.tsx:38-48` `replaceUrl(...)`; `app/_lib/url-state.ts:12-19` `window.history.replaceState` with the comment "replace, never push": Back leaves the page.

## Verdict

## Log

- 2026-09-12: The provider swap is shell 43c1babc2051; this is the visitor-facing behaviour on /stories.
