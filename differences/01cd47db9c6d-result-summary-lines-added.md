---
title: Result summary lines added
status: open
route: /tools/cutting-planner
axis: copy
kind: added
---
## Legacy

No summary text: `packages/applet-cutting-planner/src/components/cutting-plan.tsx:17-55` renders the "Cutting plan" heading, the drawings and the unit toggle.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:479-491` "{n} stock beam(s) used — {total}." then "Cuts placed total {placed}; off-cut waste {waste}." and, when infeasible cuts exist, "Some cuts are infeasible — see below." in `color="red.700"`. Live with the default rows: "3 stock beams used — 180 gu.", "Cuts placed total 140 gu; off-cut waste 40 gu." The code is [[9d22f28c7b01]].

## Verdict

## Log
