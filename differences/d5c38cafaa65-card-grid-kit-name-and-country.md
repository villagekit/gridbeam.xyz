---
title: "Card: Grid Kit name and country"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`content/suppliers.ts:23` `name: 'Grid Kit'` (the card's `h3`, `app/suppliers/page.tsx:176`); `:25` `country: 'Aotearoa New Zealand'` (`page.tsx:181`). `:24` `region: 'NZ'` is not rendered.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q4). Grid Kit stays listed: it still trades, under other hands. Name and location follow legacy's producer entries; the operator confirms whether both Auckland and Wellington return.

- 2026-09-25: Confirmed (suppliers grilling S2): one entry, legacy's Wellington producer verbatim: "Grid Kit Wellington", location "Wellington, New Zealand", coordinates -41.2768, 174.7779 (`apps/gridkit/producers.ts`). Auckland does not return.
