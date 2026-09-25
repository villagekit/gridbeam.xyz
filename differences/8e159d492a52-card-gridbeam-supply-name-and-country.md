---
title: "Card: Gridbeam Supply name and country"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`content/suppliers.ts:35` `name: 'Gridbeam Supply'` (`app/suppliers/page.tsx:176`); `:37` `country: 'United States'` (`page.tsx:181`). `:36` `region: 'US'` is not rendered.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q4). Gridbeam Supply stays. Location: Willits, California (39.4031029, -123.3590017) for the map; the operator confirms the location line's wording.
