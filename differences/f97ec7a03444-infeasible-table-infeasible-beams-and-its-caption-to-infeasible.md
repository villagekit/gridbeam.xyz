---
title: "Infeasible table: Infeasible beams and its caption to Infeasible cuts"
status: fixed
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:185-187` `title="Infeasible beams"`, `caption="We couldn't figure out how to cut these beams."`. Carried forward from note [[526d5330ef4e]].

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:225-226` `title="Infeasible cuts"`, `caption="These cuts couldn't be made — typically a single cut longer than any available beam."`.

## Verdict

plan 9c6e9dd981bd

## Log

- 2026-09-25: Regression (cutting planner grilling C3). Ships as "Infeasible beams" / "We couldn't figure out how to cut these beams."
