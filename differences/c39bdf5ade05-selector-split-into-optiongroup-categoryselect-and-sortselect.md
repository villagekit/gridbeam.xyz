---
title: Selector split into OptionGroup, CategorySelect and SortSelect; Filters, Sorting, SearchBar, ResultsCount and List folded into Catalogue.tsx
status: regression
route: /designs
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/selector.tsx:1-69` one generic `Selector` (select on mobile, badge list otherwise) reused by `filters.tsx:14-21` and `sorting.tsx:11-18`; `search-bar.tsx`, `results-count.tsx`, `list.tsx` and `item.tsx` are separate modules.

## Current

`app/_components/catalogue/Catalogue.tsx:298-319,440-468,476-503` three private components toggled by `display` props; `SearchBar` (`:384-417`), `ResultsCount` (`:424-431`), `EmptyState` (`:510-531`) and the grid (`:239-259`) live in the same file; only `ItemCard.tsx` stays separate.

## Verdict

## Log
