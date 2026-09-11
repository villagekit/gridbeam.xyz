---
title: "Cutting plan empty state added: This design has no grid-beam parts to cut."
status: open
route: /designs/bed-frame
axis: copy
kind: added
---
## Legacy

Nothing like it in the legacy plan tab: `apps/gridkit/pages/designs/[id].tsx:181-246` renders the kit sentence, the photo and `CuttingPlannerResult`, and `packages/applet-cutting-planner/src/components/cutting-plan.tsx:12-55` the heading, the beams and the unit toggle.

## Current

`app/_components/design/DesignCuttingPlan.tsx:73` `This design has no grid-beam parts to cut.` (not rendered on this route).

## Verdict

## Log

- 2026-09-12: Template.
