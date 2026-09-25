---
title: Record how a record finishes with the operator's verdicts pending
status: done
---
The shell record's fifteen slices have shipped and fourteen items on `shell` are still `open` or `regression`, most of them the operator's verdicts (rule 4 candidates, rebranded copy, a layout call). `/finish-epic` as written keeps the record `doing` on a failing clause, and thirteen route records are `blocked_by` it, so the run would stop on the operator's queue, against the operator's instruction of 2026-09-25 to do what can be done and mint an attended plan for the rest. This plan records that instruction as the finishing rule.

## Work

- A decision: a record finishes when every remaining `open` or `regression` item on its route is `upstream`, named by one attended verdicts plan minted beside the record, or named by a slice minted beside it for a fix an agent can make; the parity gate is `blocked_by` every such attended plan.
- `plans/README.md`: the gate paragraph reads with it; a Log note on the M2 record.

## Seams under test

None.

## Done when

- The decision is accepted and cited from `plans/README.md`
- `kipu verify --warnings-as-errors` is green

## Outcome

Decision 40abdb2f222a accepted and cited from plans/README.md; a Log note on the M2 record. The finish of the shell record is the next iteration's, under this rule.
