---
title: "Cleared length field on blur: reset to 30 to keep the last value"
status: regression
route: /tools/cutting-planner
axis: interaction
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-row.tsx:51-61` `handleSizeBlur` resets a `NaN` size to 30 and `handleCountBlur` a `NaN` count to 1: live, clearing the length and blurring shows 30.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:376-378,408-410` `onValueChange` ignores a non-finite value, so the state keeps the last valid number: live, clearing and blurring shows the previous value.

## Verdict

## Log
