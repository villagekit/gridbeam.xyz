---
title: "Unit toggle side labels: clickable labels to inert spans"
status: regression
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/display-unit-toggle.tsx:23-27,36-40` two `FormLabel aria-hidden htmlFor="cutting-plan-units"`: hidden from the tree but real `label` elements, so clicking "Grid units" or "Millimeters" flips the switch.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:436-438,456-458` two `Text ... aria-hidden` spans with no `htmlFor`: not clickable, the switch's 2em control is the whole target. The code's own comment at `:432-435` names this for the ledger. The wording is [[c4a82d72201c]].

## Verdict

## Log
