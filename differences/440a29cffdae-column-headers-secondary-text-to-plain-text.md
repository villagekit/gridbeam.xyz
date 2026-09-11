---
title: "Column headers: secondary Text to plain text"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:58-64` `<Th><Text variant="secondary">Length</Text></Th>`: a secondary-coloured paragraph inside the header cell (`legacy.aria.yaml`: `columnheader "Length": - paragraph: Length`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:293-294` `<Table.ColumnHeader w="45%">Length (gu)</Table.ColumnHeader>`: plain text in the default header colour (`current.aria.yaml`: `columnheader "Length (gu)"`). The wording is [[382dc30acfe4]].

## Verdict

## Log
