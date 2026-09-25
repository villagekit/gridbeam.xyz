---
title: "Cutting plan infeasible message added: All required cuts are longer than the N gu stock length — needs custom-length stock."
status: regression
route: /designs/bed-frame
axis: copy
kind: added
---
## Legacy

Nothing like it in the legacy plan tab: `apps/gridkit/pages/designs/[id].tsx:181-246` renders the kit sentence, the photo and `CuttingPlannerResult`, and `packages/applet-cutting-planner/src/components/cutting-plan.tsx:12-55` the heading, the beams and the unit toggle.

## Current

`app/_components/design/DesignCuttingPlan.tsx:76-80` `All required cuts are longer than the {stockSize} gu stock length — needs custom-length stock. Try the <Link href="/tools/cutting-planner">cutting planner</Link> for full control.` (not rendered on this route).

## Verdict

## Log

- 2026-09-12: Template.

- 2026-09-25: Regression (design page grilling T3). Removed; legacy's Plan tab shows the heading, the sentence, the engine drawings, the unit toggle and the footnote. Template.
