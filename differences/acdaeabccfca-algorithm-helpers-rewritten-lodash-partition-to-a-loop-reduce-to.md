---
title: "Algorithm helpers rewritten: lodash partition to a loop, reduce to Map and sort"
status: regression
route: /tools/cutting-planner
axis: code
kind: changed
---
## Legacy

`packages/applet-cutting-planner/src/algorithms/first-fit-decreasing.ts:1` `import { partition } from 'lodash-es'`, `:50` `const [usedBeams, unusedBeams] = partition(cutBeams, (beam: CutBeam) => beam.cuts.length > 0)`; `shared.ts:35-50` `beamsToBeamQuotas` via `Object.values(beams.reduce(...))`.

## Current

`app/tools/cutting-planner/algorithm.ts:61-66` a `for` loop into two arrays; `:84-91` a `Map<number, BeamQuota>` then `Array.from(grouped.values()).sort((a, b) => a.size - b.size)`, with a comment (`:79-83`) on why the explicit sort. Same outputs; no `lodash-es` dependency.

## Verdict

## Log
