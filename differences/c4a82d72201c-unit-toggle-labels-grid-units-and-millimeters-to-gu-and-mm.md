---
title: "Unit toggle labels: Grid units and Millimeters to gu and mm"
status: open
route: /tools/cutting-planner
axis: copy
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/display-unit-toggle.tsx:23-27,36-40` two `FormLabel aria-hidden htmlFor="cutting-plan-units"` > `Text fontSize="sm" variant="tertiary"`: "Grid units", "Millimeters".

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:436-438,456-458` two `Text fontSize="sm" variant="secondary" aria-hidden`: "gu", "mm". The switch's accessible name "Display units as millimeters or grid units" is identical on both sides.

## Verdict

## Log

- 2026-09-12: The design page's parts breakdown has its own copy of this label change (`app/_components/design/PartsBreakdown.tsx:40,54`), filed on `/designs/bed-frame` (plan cf52c388).
