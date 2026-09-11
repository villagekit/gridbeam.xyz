---
title: Unit toggle's group role dropped
status: regression
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/display-unit-toggle.tsx:21` `<FormControl sx={{ display: 'flex', ...sx }}>` around the labels and the switch renders `role="group"`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:431` a plain `HStack gap="2"`: no group around the switch. The top-up control's is [[623947dd6b3c]].

## Verdict

## Log
