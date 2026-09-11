---
title: Add row disabled at 60 rows
status: open
route: /tools/cutting-planner
axis: interaction
kind: added
---
## Legacy

No cap: `packages/applet-cutting-planner/src/components/beam-table.tsx:36-43` adds unconditionally.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:336-346` `disabled={beams.length >= MAX_ROWS}` (`MAX_ROWS = 60`, `url-codec.ts:33`) so the table cannot outgrow its share link; no tooltip on the disabled button. Part of the share-link feature [[c94f539612d6]].

## Verdict

## Log
