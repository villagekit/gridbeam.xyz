---
title: "Card: Grid Kit blurb"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`content/suppliers.ts:29-30` "Aotearoa New Zealand–based supplier of 40 mm grid-beam hardware. Operates independently of the gridbeam.xyz project." (an en dash in "New Zealand–based"); rendered at `app/suppliers/page.tsx:184`.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q4). The blurb goes with the `blurb` field (Q3).
