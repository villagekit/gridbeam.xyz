---
title: "Card: Gridbeam Supply compatibility"
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`content/suppliers.ts:40-41` "Imperial profile — the original grid beam, traced back to Ken Isaacs' Living Structures. Different geometry from this site's 40 mm focus; parts don't mix with 40 mm hardware." after the bold lead-in "Compatibility:" at `app/suppliers/page.tsx:192-194`. No `notes` field on this supplier.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q3 + Q4). The compatibility sentence is replaced by a one-word system label on the card, imperial for Gridbeam Supply; the operator confirms the label's wording.

- 2026-09-25: Confirmed (suppliers grilling S1): the label ships as "Imperial".
