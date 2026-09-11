---
title: Unit toggle moved from the result to the controls, visible before any plan
status: regression
route: /tools/cutting-planner
axis: interaction
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:48-52` `<DisplayUnitToggle sx={{ justifyContent: 'flex-end' }} ...>` inside `CuttingPlan`, so it appears right-aligned under the drawings once a plan exists; `:15` the state lives in `CuttingPlan` (`useBoolean(false)`).

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:173` `<DisplayUnitToggle value={displayUnit} onChange={setDisplayUnit} />` in the controls row beside the top-up select and the Plan button, shown on load (`audit/tools__cutting-planner/1280/current.png`); `:76` the state lives in `CuttingPlanner` and is encoded in the share link (`?d=`).

## Verdict

## Log
