---
title: Tip prop and component dropped from CatalogueItem
status: regression
route: /designs/bed-frame
axis: code
kind: removed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:19,35,133` `tip?: ReactNode` rendered through `components/tip.tsx:11-19`.

## Current

`app/_components/catalogue/CatalogueItem.tsx:28-43` no `tip`. Unused by the design page on both sides.

## Verdict

## Log

- 2026-09-12: Template.
