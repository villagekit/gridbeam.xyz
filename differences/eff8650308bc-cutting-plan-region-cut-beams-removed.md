---
title: Cutting plan region Cut beams removed
status: regression
route: /designs/bed-frame
axis: accessibility
kind: removed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:175` `<Section index={1} aria-label="Cut beams">` around the plan (Plan tab snapshot: `region "Cut beams"`).

## Current

`app/_components/design/DesignCuttingPlan.tsx:70-119` the bars sit directly in the tabpanel.

## Verdict

## Log

- 2026-09-12: Template.
