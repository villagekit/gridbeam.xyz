---
title: "Cut beam drawing: engine grid beam to a flat cyan bar in a white card"
status: regression
route: /tools/cutting-planner
axis: visual
kind: changed
---
## Legacy

The engine's `CutGridBeamSvg` (sibling `../gridkit` `parts/gridbeam/src/svg/cut-grid-beam-svg.tsx` at `e58d700`, the pinned 0.9.0 not installed): wood-toned beam segments with the hole pattern and a drop shadow, dashed cut markers, a greyscale remainder, a total-length label at the right end, no box around it (`packages/applet-cutting-planner/src/components/cutting-plan.tsx:30-45`). Live result state: the sub-agent's `legacy-1280-result.png` under the scratchpad.

## Current

`app/_components/cutting-plan/CutBeamSvg.tsx:31-39` a white bordered card (`bg="white" p="3" borderRadius="md" borderWidth="1px" borderColor="gray.200"`) around `:49-105` a flat bar: cyan fills (`:10`), red dashed dividers (`:85`), an amber remainder (`:76`), labels inside each segment, stretched by `preserveAspectRatio="none"` at 40px (`:53-54`). The code item is [[7f2556a9ec9d]]; the text is [[6064de3eb9b6]].

## Verdict

## Log
