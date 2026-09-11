---
title: "Add and delete glyphs: outlined squares to a bare cross and bar"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-table.tsx:89` `FaRegPlusSquare` and `beam-row.tsx:113` `FaRegMinusSquare`: a square outline with the sign inside (`audit/tools__cutting-planner/1280/legacy.png`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:497-514` `MinusIcon` (a 10x2 bar) and `PlusIcon` (a cross), no outline (`audit/tools__cutting-planner/1280/current.png`). The code is [[423cdd0c2533]].

## Verdict

## Log
