---
title: Reword the comments that narrate a fix into the constraint they guard
status: todo
---
The audit at the adoption of the shared agentic set (plan `0448bc2d`) found six comments that describe the change just made.

## Work

Rule: `CLAUDE.md, Working style`, "Comments describe intent or a non-obvious constraint, never the change just made."

Places: `app/tools/cutting-planner/url-codec.test.ts:2` ("fixed in dc93b74"), `app/tools/cutting-planner/url-codec.ts:106` ("the float drift that used to reach these links"), `app/_components/design/required-beams.test.ts:38` (the drifted lengths the port printed), `app/tools/cutting-planner/algorithm.ts:5` ("Now those cuts go to") and `:80` ("The port's Map preserved encounter"), `app/tools/cutting-planner/CuttingPlanner.tsx:448` ("the port dropped it").

Fix: reword each to the constraint it guards (a bounded decode, integer-only pairs, grouping of drifted lengths, infeasible cuts, ascending key order, the control's name) and drop the fix history and the commit SHA.

## Seams under test

None.

## Done when

- The six lines read as constraints, with no commit SHA and no "used to", "now", "the port" narrative, checked by reading them
- `timeout 900 just check` is green

## Outcome

## Log
