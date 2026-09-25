---
title: Dropped share-link beams warning added
status: regression
route: /tools/cutting-planner
axis: copy
kind: added
---
## Legacy

No share links, so no such text.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:119-123` `<Text variant="tertiary" color="red.700" textAlign="center">Some beams in that link were out of range and have been left out.</Text>` when `initial.dropped`. The feature is [[c94f539612d6]].

## Verdict

## Log

- 2026-09-25: Regression (cutting planner grilling C6). The share-link URL state, its row cap and its warning are removed; legacy keeps no URL state. Shareable plans would return only as an operator-approved improvement with its own decision.
