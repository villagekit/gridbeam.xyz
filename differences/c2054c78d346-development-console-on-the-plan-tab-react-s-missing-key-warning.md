---
title: "Development console on the Plan tab: React's missing-key warning from the engine's CutGridBeamSvg"
status: upstream
route: /designs/bed-frame
axis: code
kind: added
---
## Legacy

On the live `/designs/bed-frame` at 1280 with the Plan tab open, the console logs no React warning (the re-port's `console-plan-legacy.mjs`): the live site is a production build, where React strips the key check, and its drawings come from the engine at the 0.9.0 tag.

## Current

On `pnpm dev` at 1280, opening the Plan tab logs `Each child in a list should have a unique "key" prop. ... Check the render method of svg. It was passed a child from CutGridBeamSvg.` (the re-port's `console-plan.mjs`), the engine's `CutGridBeamSvg` at `@villagekit/part-gridbeam@0.10.0` rendering its list of ruler and plank children without keys; development only, since the production build strips the check, so nothing reaches a visitor and the drawing is right. Recorded until now only in the Log of `7f2556a9ec9d`, an item on `/tools/cutting-planner`, and on the bump plan `99f2fe62c62f`; the page re-port (plan 3c448a379ad7) renders `CuttingPlannerResult` on every design page, so it shows here too. The engine's, for the design pages record's finish to hand to a `../gridkit` slice, never fixed here.

## Verdict

## Log

- 2026-09-28: Moved to upstream at the design pages record's finish (plan [[0bc88eaf5493]], decision 28c1a536): the fix is in ../gridkit already, the operator's own commit 915085f (parts/gridbeam/src/svg/cut-grid-beam-svg.tsx, the mapped BeamSvg given key={index}, the position in the beam being its identity), which predates M2 and is unpublished; the published @villagekit/part-gridbeam@0.10.0 maps the cuts without a key, the warning's one source. The bump plan [[99f2fe62c62f]] carries the applet components slice's check: after the engine bump the development console on /designs/bed-frame with the Plan tab open prints no missing-key line from CutGridBeamSvg; then it moves this to fixed. The publish must carry @villagekit/part-gridbeam.
