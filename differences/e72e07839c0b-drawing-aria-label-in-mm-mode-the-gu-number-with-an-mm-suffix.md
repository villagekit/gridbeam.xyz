---
title: "Drawing aria-label in mm mode: the gu number with an mm suffix"
status: regression
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

The engine's `CutGridBeamSvg` title counts in grid units whatever the display unit (sibling `../gridkit` `parts/gridbeam/src/svg/cut-grid-beam-svg.tsx:52-65` at `e58d700`): "... made from a 60 unit grid beam ...", never a wrong number.

## Current

`app/_components/cutting-plan/CutBeamSvg.tsx:33` `${beam.size} ${displayUnit === 'mm' ? 'mm' : 'gu'} stock beam` uses the raw grid count with the display suffix, so in mm mode a 60 gu beam is announced "60 mm stock beam" while the visible header (`:42-43`, via `formatLength`) reads "2,400 mm stock beam". Goes with the drawing swap [[7f2556a9ec9d]].

## Verdict

## Log
