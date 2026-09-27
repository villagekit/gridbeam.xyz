---
title: "Plan tab order: sentence and footnote before the Cut beams heading and drawings to the heading and sentence first, drawings, footnote last"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:181-245` (`fce357d`): the sentence (and, on a
30gu design, the footnote) render first inside their own `VStack`, then
`<CuttingPlannerResult result={planResult} />` (`:245`), which renders
`packages/applet-cutting-planner/src/components/cutting-plan.tsx:18-21`'s
`Heading` and the drawings after it.

## Current

`app/_components/design/DesignCuttingPlan.tsx:47-72`: the `Heading` renders
first, then the sentence, then the drawings, then the footnote.

## Verdict

## Log

- 2026-09-28: Found by the Parity review of plan f64fd2900fb3 (this slice writes only the ten copy strings; the Cutting plan heading is the first VStack child per the plan Work, and the sentence/footnote/drawings order was not part of its brief). No rule covers a different order than legacy, so regression, for the page re-port [[3c448a379ad7]] to close alongside 880a4363a127 and eff8650308bc, which already track the DesignCuttingPlan/CuttingPlannerResult component swap.
