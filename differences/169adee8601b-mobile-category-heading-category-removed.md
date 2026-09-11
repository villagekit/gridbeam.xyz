---
title: Mobile category heading Category removed
status: open
route: /designs
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/components/catalogue/filters.tsx:17` `title={isMobile ? 'Category' : 'Categories'}`, rendered by `selector.tsx:36-44` as a visible heading that also labels the mobile select via `aria-labelledby` (`audit/designs/375/legacy.png`: `Category` above the dropdown).

## Current

`app/_components/catalogue/Catalogue.tsx:449-457` the below-`lg` category `Select` has no heading, only `aria-label="Filter designs by category"` (`audit/designs/375/current.png`: the `All designs` dropdown has no heading).

## Verdict

## Log
