---
title: "Top-up options: None, 30gu, 60gu to 2400 mm (60 gu), 1200 mm (30 gu), None — use only stock"
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-planner.tsx:144-146` `<option value="false">None</option>`, `<option value="30">30gu</option>`, `<option value="60">60gu</option>`, in that order.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:165-167` `<option value="60">2400 mm (60 gu)</option>`, `<option value="30">1200 mm (30 gu)</option>`, `<option value="false">None — use only stock</option>`, reversed. Which option is selected by default is an interaction item.

## Verdict

## Log
