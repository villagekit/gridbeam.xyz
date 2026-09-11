---
title: Print plan button and print stylesheet added
status: open
route: /tools/cutting-planner
axis: interaction
kind: added
---
## Legacy

No print button or print styles in `packages/applet-cutting-planner/src/`.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:50-66` `PRINT_STYLES` (hides the controls, the unused table, the header, the footer and the skip link; strips the result section's border, padding and background; keeps each `figure` on one page), injected at `:107`; `:101-103,210-214` a "Print plan" button calling `window.print()`.

## Verdict

## Log
