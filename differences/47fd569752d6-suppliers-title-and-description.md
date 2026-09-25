---
title: Suppliers title and description
status: regression
route: /suppliers
axis: copy
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:57-58` `<Title description="Places that sell grid-beam hardware: beams, panels, fasteners, and sometimes full kits.">Suppliers</Title>`.

## Verdict

## Log

- 2026-09-25: Regression (suppliers grilling Q1). Ships as the bare title "Suppliers", no description line; the decision [[8b5e51fcaf61]] names none.
