---
title: "Stories state: constate context with use-query-params to a client component with url-state"
status: regression
route: /stories
axis: code
kind: changed
---
## Legacy

`apps/gridkit/context/stories.tsx:1-69` `constate(useStories)`: `useQueryParams` with `createEnumParam`/`withDefault`, `filteredStories` in the hook, `sortedStories` sorted in place at module scope (`:32`); `apps/gridkit/pages/stories.tsx:14` `<StoriesContextProvider>` around the page.

## Current

`app/stories/StoriesBrowser.tsx:1,29-53` `'use client'`, `useSearchParams`, a `useMemo` filter and a `useCallback` setter over `replaceUrl`/`withSearchParams` (`app/_lib/url-state.ts:17-30`); no context module.

## Verdict

## Log

- 2026-09-12: The shell item 43c1babc2051 is the provider swap; this is the route's state module.
