---
title: Cutting plan list and listitem roles removed
status: fixed
route: /designs/bed-frame
axis: accessibility
kind: removed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:24-33` `<VStack role="list">` of `<Box role="listitem">` per beam (snapshot: `list` > nine `listitem`).

## Current

`app/_components/design/DesignCuttingPlan.tsx:94-101` a plain `VStack` of `CutBeamSvg` (snapshot: nine `figure` siblings).

## Verdict

plan 3c448a379ad7

## Log

- 2026-09-12: Template.
