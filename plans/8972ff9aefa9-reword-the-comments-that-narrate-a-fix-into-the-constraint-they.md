---
title: Reword the comments that narrate a fix into the constraint they guard
status: done
worker: opus
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

Comments only; no code line changed, so no Parity review and no visual gate ran (no route's output changes).

Reworded to the constraint each guards, with no fix history and no commit SHA:

- `app/tools/cutting-planner/url-codec.test.ts` header: the bounded decode (an unbounded decode would freeze the tab in one click); the SHA is gone.
- `app/tools/cutting-planner/url-codec.ts`, the whole-pair match: integer-only pairs, `1.9999999-8` named as a length with float drift rather than as drift that used to reach the links.
- `app/tools/cutting-planner/algorithm.ts` header: the infeasible-cut divergence stated as a standing fact against legacy, not as "Now those cuts go to".
- `app/tools/cutting-planner/algorithm.ts`, above `beamsToBeamQuotas`: the ascending key order, with a Map's encounter order named as what the sort guards against, not as what the port did.
- `app/tools/cutting-planner/CuttingPlanner.tsx`, the unit switch's label: the control carries legacy's explicit name, not "the port dropped it".

No longer exists: `app/_components/design/required-beams.test.ts` was deleted by the design page re-port (plan `3c448a379ad7`); `getRequiredBeamsFromParts` now lives in `app/designs/[id]/DesignPage.tsx` with no comment, so nothing moved with it.

Found beyond the audit, by a grep of `app/` and `scripts/` for "used to", "now", "the port", "fixed in", "no longer", "previously" and hex SHAs: two narrating comments in `app/tools/cutting-planner/algorithm.test.ts` (the header's "the port changed the infeasible-cut path" and the describe's "The port's one deliberate divergence"), reworded to the divergence from legacy; the header's "New behaviour is tested separately below" became "The divergence is tested separately below" (Standards nit: history word and British spelling).

Deviation beyond the plan: the Spec review found `algorithm.ts`'s "Ported from" URL cited `packages/applet-cutting-planner/src/lib.ts`, which does not exist at `fce357d`; it now cites the two files the code comes from, `src/algorithms/first-fit-decreasing.ts` and `src/shared.ts`, checked with `git ls-tree` in `../node-modules`.

Reviews (Standards, Spec) ran on fresh Opus sub-agents; no critical finding. Fixed: the unreflowed line in the `beamsToBeamQuotas` comment, the test header nit, the wrong source citation. Dropped: the em dashes and "materialises" in untouched `url-codec.ts` comments (lines 86, 91, 97), outside this plan's narration scope; "one divergence" being incomplete for non-integer sizes, which the URL codec never admits; `app/_components/story/media.tsx`'s "at 1c3e3e8", which pins where an upstream fix stands and narrates nothing; `app/_lib/open-graph.ts`'s "no longer guards", which states why the key is declared apart.

Proof: the six places read as constraints, checked by reading them; `timeout 900 just check` green (89 tests), `kipu verify --warnings-as-errors` green.

## Log
