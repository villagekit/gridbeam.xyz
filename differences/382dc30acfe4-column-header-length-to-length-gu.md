---
title: "Column header: Length to Length (gu)"
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:59` `<Text variant="secondary">Length</Text>` in the first `Th`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:293` `<Table.ColumnHeader w="45%">Length (gu)</Table.ColumnHeader>`. "Quantity" and the hidden "Delete" header are identical on both sides.

## Verdict

## Log
