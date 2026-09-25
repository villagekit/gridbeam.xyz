---
title: Add row disabled at 60 rows
status: regression
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

- 2026-09-25: Regression (cutting planner grilling C6). The share-link URL state, its row cap and its warning are removed; legacy keeps no URL state. Shareable plans would return only as an operator-approved improvement with its own decision.
