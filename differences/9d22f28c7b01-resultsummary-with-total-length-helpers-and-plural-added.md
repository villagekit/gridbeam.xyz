---
title: ResultSummary with total-length helpers and plural added
status: regression
route: /tools/cutting-planner
axis: code
kind: added
---
## Legacy

No summary: `packages/applet-cutting-planner/src/components/cutting-planner.tsx:172-201` renders the `CuttingPlan` and the infeasible and unused tables only.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:468-495` `ResultSummary` ("{n} stock beam(s) used — {total}.", "Cuts placed total {placed}; off-cut waste {waste}.", "Some cuts are infeasible — see below."), fed by `totalCutLength`, `totalPlacedLength`, `totalRemainderLength` (`algorithm.ts:98-110`) and `plural` (`CuttingPlanner.tsx:516-518`). Its text is a copy item.

## Verdict

## Log

- 2026-09-25: Regression (cutting planner grilling C5). The result summary is removed; legacy renders the heading, the drawings and the unit toggle.
