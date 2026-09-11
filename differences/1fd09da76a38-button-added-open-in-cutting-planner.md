---
title: "Button added: Open in cutting planner"
status: open
route: /designs/bed-frame
axis: copy
kind: added
---
## Legacy

Nothing like it in the legacy plan tab: `apps/gridkit/pages/designs/[id].tsx:181-246` renders the kit sentence, the photo and `CuttingPlannerResult`, and `packages/applet-cutting-planner/src/components/cutting-plan.tsx:12-55` the heading, the beams and the unit toggle.

## Current

`app/_components/design/DesignCuttingPlan.tsx:114-116` `Open in cutting planner`, linking to `/tools/cutting-planner?r=47-6~23-6~8-6&u=60`.

## Verdict

## Log

- 2026-09-12: Template.
