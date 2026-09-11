---
title: Virtual menubar Designs menu with aria-owns removed
status: regression
route: /designs
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/components/catalogue/catalogue.tsx:47-52` an empty `<div id="designs-menu" role="menubar" aria-label="Designs menu" aria-owns="designs-menu-search designs-menu-filters designs-menu-sorting" />` splices the search, the categories and the sort into one menubar in that order regardless of DOM position (the author's note at `:43-46` explains the flexbox reason). `audit/designs/dom/legacy.aria.yaml`: `menubar "Designs menu"` holding `search`, `group "Categories"`, `group "Sort by"`; this virtual order differs from the DOM and Tab order (categories, search, grid, sort).

## Current

`app/_components/catalogue/Catalogue.tsx:177-283` has no `menubar` and no `aria-owns`; `audit/designs/dom/current.aria.yaml` shows `complementary`, `searchbox`, the cards and the `Sort by` group as flat siblings of `main`, in DOM order.

## Verdict

## Log
