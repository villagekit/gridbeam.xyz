---
title: "CatalogueItem: useIsMobile and useTopNavHeight to display props and a static scrollMarginTop"
status: regression
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:14,20,59,81-82,89,122` `useIsMobile()` picks one heading slot and the stack direction; `useTopNavHeight()` sets `scrollMarginTop` to the measured nav.

## Current

`app/_components/catalogue/CatalogueItem.tsx:73-100,134` two heading slots toggled by `display`, `direction={{ base, lg }}`, `scrollMarginTop="20"`.

## Verdict

## Log

- 2026-09-12: Template.
