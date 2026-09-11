---
title: "CatalogueStatic fallback grid: 3 columns at lg and 4 at xl, reflowing to 2 and 3 on hydration"
status: open
route: /designs
axis: visual
kind: added
---
## Legacy

No fallback: `apps/gridkit/components/catalogue/list.tsx` is the only grid.

## Current

`app/_components/catalogue/CatalogueStatic.tsx:23` `columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}` for the Suspense fallback in `app/designs/page.tsx:34`, against `Catalogue.tsx:242` `{ base: 1, sm: 2, xl: 3 }` once `DesignsBrowser` mounts: the swap reflows the grid at `lg` and `xl` (read from code; the captures are post-hydration).

## Verdict

## Log
