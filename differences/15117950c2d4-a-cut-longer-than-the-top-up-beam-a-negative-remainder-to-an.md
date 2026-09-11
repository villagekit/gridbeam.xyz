---
title: "A cut longer than the top-up beam: a negative remainder to an infeasible cut"
status: regression
route: /tools/cutting-planner
axis: interaction
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/algorithms/first-fit-decreasing.ts:38-43` `else if (hasUnlimitedStock) { cutBeams.push({ cuts: [size], size: hasUnlimitedStock }) }` with no size check: a 70 gu cut on 60 gu top-up draws a 60 gu beam with a 70 gu cut and a remainder of -10 gu.

## Current

`app/tools/cutting-planner/algorithm.ts:54-58` `else if (hasUnlimitedStock !== false && size <= hasUnlimitedStock) { ... } else { infeasibleBeams.push({ size }) }`: the same cut lands in the "Infeasible cuts" table (tested in `algorithm.test.ts`, the fix named in the header at `:3-6`). A behaviour change no rule covers; the operator may sanction it as a bug fix under rule 5.

## Verdict

## Log
