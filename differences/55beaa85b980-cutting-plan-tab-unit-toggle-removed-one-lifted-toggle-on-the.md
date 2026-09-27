---
title: Cutting plan tab unit toggle removed; one lifted toggle on the Parts tab
status: fixed
route: /designs/bed-frame
axis: interaction
kind: removed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:6,48-52` a second `DisplayUnitToggle` inside the Plan tab with its own `useBoolean` state (`cutting-plan.tsx:15`), independent of the Parts tab's.

## Current

`app/_components/design/DesignViewer.tsx:51,77,83` one `useState<DisplayUnit>` passed to both tabs; `DesignCuttingPlan.tsx` renders no toggle, so the unit can only be changed from the Parts tab.

## Verdict

plan 3c448a379ad7

## Log

- 2026-09-12: Template.
