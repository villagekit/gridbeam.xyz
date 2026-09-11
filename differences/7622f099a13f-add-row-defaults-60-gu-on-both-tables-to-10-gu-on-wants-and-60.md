---
title: "Add row defaults: 60 gu on both tables to 10 gu on wants and 60 gu on stock"
status: regression
route: /tools/cutting-planner
axis: interaction
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:36-43` `handleCreate` adds `{ count: 1, size: 60 }` on either table: live, a new row reads 60 and 1 on both.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:131,138` `defaultSize={10}` on "Beams you want", `defaultSize={60}` on "Beams you have" (`:260-262`): live, 10 and 1 on the first, 60 and 1 on the second. Carried forward from note [[526d5330ef4e]] ("its default rows and stock").

## Verdict

## Log
