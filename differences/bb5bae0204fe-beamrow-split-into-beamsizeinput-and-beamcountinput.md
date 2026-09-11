---
title: BeamRow split into BeamSizeInput and BeamCountInput
status: regression
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-row.tsx:24` `export function BeamRow(props: BeamRowProps)`: one component per table row, rendering both `NumberInput`s, the NaN-on-blur resets (`:51-61`, size to 30, count to 1) and the delete button.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:363` `function BeamSizeInput` and `:397` `function BeamCountInput`, one per cell, each rounding `valueAsNumber` (`:376-378`, `:408-410`); the row is inlined in `BeamsTable` (`:301-331`). No blur reset.

## Verdict

## Log
