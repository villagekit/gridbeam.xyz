---
title: "Cutting plan drawing: CutGridBeamSvg from @villagekit/part-gridbeam to a hand-rolled CutBeamSvg"
status: regression
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:1` `import { CutGridBeamSvg } from '@villagekit/part-gridbeam'`; `:38-43` `<CutGridBeamSvg sizeInGrids={size} cuts={cuts} remainder={remainder} displayUnit={showInMillimeters ? 'mm' : 'gu'} />`, one per cut beam inside a `role="list"` of `role="listitem"` boxes (`:24-46`), no per-beam text header. The engine drawing carries the holes, the cut markers, the greyed remainder, theme tokens and its own aria-label.

## Current

`app/_components/cutting-plan/CutBeamSvg.tsx` (117 lines): a hand-rolled `figure` with a text header (`:40-48`), a `preserveAspectRatio="none"` SVG at a fixed 40px height (`:52-54`), hex fills (`:10`, `:65`, `:76`, `:85`, `:96`), `role="presentation"` beside a `<title>` (`:55-57`), and `formatLength`/`DisplayUnit` living in the drawing file (`:5`, `:110-113`); used at `app/tools/cutting-planner/CuttingPlanner.tsx:24-28` and `:204-208`. Carried forward from note [[526d5330ef4e]]: the swap back to the engine's `CutGridBeamSvg` is done on the unmerged branch `stream-07/09-cutgridbeamsvg` (`aafadc1`, `6cdc54d`) and blocked on a `@villagekit/part-gridbeam` publish. Checked 2026-09-12: the registry still has `0.10.0` with no `./svg` export (`npm view @villagekit/part-gridbeam exports`), and the sibling `../gridkit` holds the three fixes the swap needs (`915085f`, `d4b3e7e`, `e58d700`) unpublished. The plan that closes this waits on the operator's publish, bumps the dependency and merges the branch.

## Verdict

## Log
