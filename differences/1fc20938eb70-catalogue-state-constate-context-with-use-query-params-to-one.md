---
title: "Catalogue state: constate context with use-query-params to one client component deriving state from useSearchParams"
status: regression
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/context/catalogue.ts:1-207` `useCatalogue` + `constate` give `CatalogueContextProvider`/`useCatalogueContext`, read by `Catalogue`, `Filters`, `Sorting`, `SearchBar`, `ResultsCount`, `List` and `Item`; the URL through `useQueryParams` with `createEnumParam` validation (`:5-11,43-45,90-99`); props `listPath`, `defaultFilterOption`, `inactiveItemMessage`, `itemImageMode` (`:28-33`).

## Current

`app/_components/catalogue/Catalogue.tsx:78-168` one component: `useSearchParams()`, local `useState`/`useMemo`, membership checks against `filterOptions` and `SORT_OPTIONS` (`:86-87`), `replaceUrl`/`withSearchParams` from `app/_lib/url-state.ts`; `ItemCard` takes `item` and `basePath` props (`ItemCard.tsx:17-21`); `ALL_FILTER` is a module constant (`:36`), no `defaultFilterOption`. `constate`, `use-query-params` and `lodash-es` are not dependencies.

## Verdict

## Log

- 2026-09-12: The url-state helper is the shell item [[43c1babc2051]].

- 2026-09-26: The layout slice [[a7bf623f885c]] did not mount QueryParamProvider: next-query-params/app calls useSearchParams, which fails the static build outside Suspense and, wrapped at the root, client-renders every route; the shell slice [[531b810f2dbd]] chooses the adapter and mounts it. This route slice migrates the consumer to useQueryParams once that provider is mounted, and the last consumer migrated deletes app/_lib/url-state.ts (the four: app/_components/catalogue/Catalogue.tsx, app/_components/design/DesignViewer.tsx, app/stories/StoriesBrowser.tsx, app/tools/cutting-planner/CuttingPlanner.tsx).
