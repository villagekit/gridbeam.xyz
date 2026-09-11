---
title: "Length bounds: 2 to 60 clamped on blur, to 1 with no ceiling"
status: regression
route: /tools/cutting-planner
axis: interaction
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/components/beam-row.tsx:78-79` `min={2} max={60}` on the size input (count `min={1} max={50}`, `:97-98`); Chakra v2 clamps on blur: live, typing 80 and blurring gives 60, typing 1 gives 2.

## Current

`app/tools/cutting-planner/url-codec.ts:27-29` `MIN_SIZE = 1`, `MIN_COUNT = 1`, `MAX_COUNT = 50`, no size ceiling (`CuttingPlanner.tsx:369` `min={MIN_SIZE}` only): live, 80 stays 80, 0 becomes 1. The comment at `url-codec.ts:16-26` gives the author's reasons (`sign-board` wants an 80 gu cut, `utility-workbench` emits 1 gu); the operator has not judged them.

## Verdict

## Log
