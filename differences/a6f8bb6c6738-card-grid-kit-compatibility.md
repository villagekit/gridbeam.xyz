---
title: "Card: Grid Kit compatibility"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`content/suppliers.ts:28` "40 mm grid — matches this site's catalogue." after the bold lead-in "Compatibility:" at `app/suppliers/page.tsx:192-194`. No `notes` field on this supplier, so `page.tsx:195-199` renders nothing.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q3 + Q4). The compatibility sentence is replaced by a one-word system label on the card, metric for Grid Kit; the operator confirms the label's wording.
