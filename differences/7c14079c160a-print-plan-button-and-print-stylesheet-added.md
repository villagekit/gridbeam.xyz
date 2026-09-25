---
title: Print plan button and print stylesheet added
status: regression
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

- 2026-09-25: Regression (cutting planner grilling C7). The print button and print stylesheet are removed; legacy has no print affordance.
