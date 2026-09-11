---
title: "Cutting plan drawing: CutGridBeamSvg planks with rulers to CutBeamSvg colour bars with 16 px labels in a 6-unit viewBox"
status: regression
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/cutting-plan.tsx:38-43` renders `CutGridBeamSvg` per beam: a wood plank with hole dots, the remainder greyed, an orange ruler with the cut positions beneath (Plan tab capture, plan cf52c388 probe).

## Current

`app/_components/cutting-plan/CutBeamSvg.tsx:49-106` `viewBox="0 0 {size} 6"`, `preserveAspectRatio="none"`, 40 px tall, cyan segments; its `<text fontSize="1.4">` computes to `16px` (a stylesheet rule beats the presentation attribute), so every label draws taller than the bar and the row reads as garbled glyphs (Cutting plan tab capture).

## Verdict

## Log

- 2026-09-12: Template. The component swap is [[7f2556a9ec9d]] on the planner; this is the design page's drawing and the label defect, which the planner shares.
