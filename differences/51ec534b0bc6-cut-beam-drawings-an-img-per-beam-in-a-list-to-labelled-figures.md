---
title: "Cut beam drawings: an img per beam in a list to labelled figures with leaked text and no list"
status: regression
route: /tools/cutting-planner
axis: accessibility
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:24-37` `role="list"` > `role="listitem"` per beam; the engine svg is `role="img"` named by its title (sibling `../gridkit` `parts/gridbeam/src/svg/cut-grid-beam-svg.tsx:74-80` at `e58d700`): live after planning, `img "15 and 15 unit grid beams made from a 30 unit grid beam cut at 15 grid unit markers."`, once per beam.

## Current

`app/tools/cutting-planner/CuttingPlanner.tsx:203-208` a roleless `VStack` of `CutBeamSvg`s; `app/_components/cutting-plan/CutBeamSvg.tsx:31-33` `Box as="figure" aria-label=...` around `:55` an `svg role="presentation"` whose `<text>` labels still reach the tree: live, `figure "60 gu stock beam, cuts: 15 gu, 15 gu, 15 gu, 15 gu, remainder 0 gu"`, two paragraphs and a bare `text: 15 gu 15 gu 15 gu 15 gu` per beam. Goes with the drawing swap [[7f2556a9ec9d]].

## Verdict

## Log
