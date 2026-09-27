---
title: Applet's nine source files collapsed into three, Controls and Result inlined
status: regression
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/`: `shared.ts` (the types and `beamQuotasToBeams`, `beamsToBeamQuotas`, `lengthRemaining`), `algorithms/first-fit-decreasing.ts`, `components/cutting-planner.tsx` (`CuttingPlanner` `:23`, `CuttingPlannerControls` `:41`, `CuttingPlannerResult` `:165`, each result part in its own `Section`), `components/beam-table.tsx` (`BeamsTable`), `components/beam-row.tsx` (`BeamRow`), `components/display-unit-toggle.tsx` (`DisplayUnitToggle`), `components/cutting-plan.tsx` (`CuttingPlan`), plus two `index.ts` barrels.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx` (518 lines) holds `CuttingPlanner` `:68`, `BeamsTable` `:257`, `BeamSizeInput` `:363`, `BeamCountInput` `:397`, `DisplayUnitToggle` `:428`, `ResultSummary` `:468`, `MinusIcon` `:497`, `PlusIcon` `:506` and `plural` `:516`; the controls and the result are inlined in `CuttingPlanner` (`:105-247`) with no `CuttingPlannerControls`, `CuttingPlannerResult` or `CuttingPlan` component. `algorithm.ts` holds the types (`:8-36`) and the algorithm together. Its header (`algorithm.ts:3`) cites `packages/applet-cutting-planner/src/lib.ts`, a path that does not exist at fce357d (the sources are `shared.ts` and `algorithms/first-fit-decreasing.ts`).

## Verdict

## Log

- 2026-09-28: The algorithm half of legacy's shape is in place since plan 40179a428ba3: shared.ts, algorithms/first-fit-decreasing.ts, algorithms/index.ts and the module barrel index.ts under app/tools/cutting-planner/, each legacy's file verbatim under its ported-from line, and algorithm.ts is gone with its stale citation. The components half (CuttingPlanner and CuttingPlannerControls beside CuttingPlannerResult, the monolith retired) is the page re-port's, plan 9c6e9dd981bd, which closes this item.
