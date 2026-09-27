---
title: "Cut beam drawing: React's missing-key warning from CutGridBeamSvg in the development console"
status: upstream
route: /tools/cutting-planner
axis: code
kind: added
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:32-38` at `fce357d` renders `CutGridBeamSvg` from `@villagekit/part-gridbeam@0.9.0`. The live legacy site is a production build, which strips React's key warnings, so its console prints none after `Plan it!` (the slice's probe, `probe-1280.json`, `legacy.console`: Matomo's blocked script and WebGL driver lines alone).

## Current

`app/tools/cutting-planner/components/CuttingPlan.tsx:49-54` renders `CutGridBeamSvg` from the published `@villagekit/part-gridbeam@0.10.0`, whose `svg` maps its segments without a key; on `pnpm dev` at 1280 the console prints `Each child in a list should have a unique "key" prop. Check the render method of svg. It was passed a child from CutGridBeamSvg.` once a plan is computed (`probe-1280.json`, `current.console`). The twin of [[c2054c78d346]] on `/designs/bed-frame`, filed here since items are per route; the fix is the engine's, committed in `../gridkit` at `915085f`, which keys the segments.

## Verdict

## Log

- 2026-09-28: Parked upstream by plan 9c6e9dd981bd on ../gridkit 915085f (the engine keys the segments of the cut beam drawing), decision 28c1a536: the bump plan 99f2fe62c62f reads the development console on this route after the engine bump with a plan computed, the reading its note from plan 55d567074c71 already names, then moves this item to fixed. Flagged in the slice's Outcome for the operator as the design pages finish flagged its twin.
