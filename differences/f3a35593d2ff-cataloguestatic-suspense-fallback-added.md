---
title: CatalogueStatic Suspense fallback added
status: regression
route: /designs
axis: code
kind: added
---
## Legacy

No fallback and no server/client split: `apps/gridkit/pages/designs/index.tsx:67-88` renders `<Catalogue>` once, through `CatalogueContextProvider` (`components/catalogue/catalogue.tsx:40`).

## Current

`app/_components/catalogue/CatalogueStatic.tsx:1-30` a server-rendered, pre-sorted card grid used as `<Suspense fallback>` in `app/designs/page.tsx:34-36` because `useSearchParams()` forces dynamic rendering.

## Verdict

## Log

- 2026-09-12: Its column mismatch with the hydrated grid is a visual item on this route.

- 2026-09-25: Regression (designs grilling D4). The fallback grid goes with the URL-synced filter state legacy never had; one grid, rendered once.
