---
title: "Viewer and controls row layout: from md to from lg"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:59,92,101` `direction={isMobile ? 'column' : 'row'}` with `useIsMobile` (`md`); `audit/designs__bed-frame/768/legacy.png` is side by side.

## Current

`app/_components/catalogue/CatalogueItem.tsx:94` `direction={{ base: 'column', lg: 'row' }}`; `audit/designs__bed-frame/768/current.png` is stacked.

## Verdict

## Log

- 2026-09-12: Template. Cause: the `useIsMobile`/`useTopNavHeight` code item.
