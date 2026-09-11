---
title: "Add-row cell colSpan: 4 to 3"
status: regression
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:86` `<Td colSpan={4}>` in a table with three `Th` (`:58-68`), one more column than exists.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:334` `<Table.Cell colSpan={3}>`, matching the three headers (`:293-297`). A legacy defect corrected; no rule covers the correction, the operator may sanction it under rule 5.

## Verdict

## Log
