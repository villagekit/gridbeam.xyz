---
title: "Stories state: constate context with use-query-params to a client component with url-state"
status: fixed
route: /stories
axis: code
kind: changed
---
## Legacy

`apps/gridkit/context/stories.tsx:1-69` `constate(useStories)`: `useQueryParams` with `createEnumParam`/`withDefault`, `filteredStories` in the hook, `sortedStories` sorted in place at module scope (`:32`); `apps/gridkit/pages/stories.tsx:14` `<StoriesContextProvider>` around the page.

## Current

`app/stories/StoriesBrowser.tsx:1,29-53` `'use client'`, `useSearchParams`, a `useMemo` filter and a `useCallback` setter over `replaceUrl`/`withSearchParams` (`app/_lib/url-state.ts:17-30`); no context module.

## Verdict

plan 278fb531

## Log

- 2026-09-12: The shell item 43c1babc2051 is the provider swap; this is the route's state module.

- 2026-09-26: The layout slice [[a7bf623f885c]] did not mount QueryParamProvider: next-query-params/app calls useSearchParams, which fails the static build outside Suspense and, wrapped at the root, client-renders every route; the shell slice [[531b810f2dbd]] chooses the adapter and mounts it. This route slice migrates the consumer to useQueryParams once that provider is mounted, and the last consumer migrated deletes app/_lib/url-state.ts (the four: app/_components/catalogue/Catalogue.tsx, app/_components/design/DesignViewer.tsx, app/stories/StoriesBrowser.tsx, app/tools/cutting-planner/CuttingPlanner.tsx).
