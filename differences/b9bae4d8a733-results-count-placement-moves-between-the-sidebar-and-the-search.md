---
title: "Results count placement: moves between the sidebar and the search row by width to always beside the search bar"
status: regression
route: /designs
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/catalogue.tsx:58-59,66` the count sits at the end of the left column below `xl` (after the filters and the sort, last before the grid on mobile: `audit/designs/375/legacy.png`) and beside the search bar from `xl`.

## Current

`app/_components/catalogue/Catalogue.tsx:212-223` the count is always in the search row, so on mobile it is the second control, before the selects (`audit/designs/375/current.png`).

## Verdict

## Log
