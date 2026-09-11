---
title: Result section tinted gray where legacy's was white
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:104` only the controls carry `colorScheme="gray"`; `:175` `<Section index={1} aria-label="Cut beams" maxW="6xl">` renders on white, a visible break between the controls and the plan.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:114` and `:193` both the controls and the result `Section`s carry `colorPalette="gray"`, one continuous gray band through the plan and the Print button.

## Verdict

## Log
