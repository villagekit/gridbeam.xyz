---
title: "Filter and sort controls: native selects below md to below lg"
status: regression
route: /designs
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/catalogue.tsx:27,54-58` and `selector.tsx:20,36-44` switch from selects to the clickable badge lists at `useIsMobile` (`@villagekit/ui@0.9.0 src/hooks/useIsMobile.ts:3-11`, `{ base: true, md: false }`); `audit/designs/768/legacy.png` shows the badge sidebar.

## Current

`app/_components/catalogue/Catalogue.tsx:182,227` `display={{ base: 'none', lg: 'flex' }}` for the sidebar and `{ base: 'block', lg: 'none' }` for the selects; `audit/designs/768/current.png` (1018 px wide, shell overflow) still shows two selects.

## Verdict

## Log
