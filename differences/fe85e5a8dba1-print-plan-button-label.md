---
title: Print plan button label
status: fixed
route: /tools/cutting-planner
axis: copy
kind: added
---
## Legacy

No print affordance in `packages/applet-cutting-planner/src/components/`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:211-213` `<Button onClick={handlePrint} variant="secondary" size="sm">Print plan</Button>`. The feature is [[7c14079c160a]].

## Verdict

plan c273dfed7e26

## Log

- 2026-09-25: Regression (cutting planner grilling C7). The print button and print stylesheet are removed; legacy has no print affordance.
