---
title: "For makers card: Suppliers"
status: regression
route: /
axis: copy
kind: added
---
## Legacy

No such section: the legacy page ends with "A place to share ideas" (`apps/gridkit/pages/index.tsx:341-371`).

## Current

`app/page.tsx:366-372` title "Suppliers", description "Already-cut grid beams and panels from suppliers around the world. We don't sell parts; we link to people who do.", to `/suppliers`.

## Verdict

## Log

- 2026-09-25: Regression (grilling Q12). The "For makers" section is removed; the page ends at "A place to share ideas" as legacy does.
