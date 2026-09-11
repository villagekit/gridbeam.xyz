---
title: "Beam table: variant unstyled to line, column widths 40/40/20 to 45/35/20"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:55` `<Table size="sm" variant="unstyled" sx={{ width: '100%' }}>`, no row rules; `:58,62,66` `Th` widths `40%`, `40%`, `20%`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:290` `<Table.Root size="sm" variant="line" w="full">`, a rule under every row; `:293-295` widths `45%`, `35%`, `20%`.

## Verdict

## Log
