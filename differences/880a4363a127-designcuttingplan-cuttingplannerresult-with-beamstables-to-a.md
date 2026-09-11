---
title: "DesignCuttingPlan: CuttingPlannerResult with BeamsTables to a bespoke render that never shows unused beams and adds a planner deep link"
status: regression
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:244` `<CuttingPlannerResult result={planResult} />` (`packages/applet-cutting-planner/src/components/cutting-planner.tsx:161-200`: `Section "Cut beams"` > `CuttingPlan`, then `BeamsTable`s for `infeasibleBeams` and `unusedBeams`), shared with the planner page.

## Current

`app/_components/design/DesignCuttingPlan.tsx:15-19,61-124` its own JSX: three branches (empty, all infeasible, normal), `summariseRequired`, placed/waste/stock totals, `CutBeamSvg` per beam, a `plannerHref` `/tools/cutting-planner?r=...&u=...[&d=mm]`; `unusedBeams` is never read; nothing is shared with `app/tools/cutting-planner/CuttingPlanner.tsx` but `algorithm.ts` and `CutBeamSvg`.

## Verdict

## Log

- 2026-09-12: Template. The algorithm's own changes are [[acdaeabccfca]] and [[15117950c2d4]]; the SVG swap is [[7f2556a9ec9d]].
