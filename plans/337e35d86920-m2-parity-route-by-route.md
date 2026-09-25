---
title: "M2: parity, route by route"
status: doing
parent: 1783931160f2
blocked_by: e2805adefd47
---

## Goal

Every route is at parity: no `difference` on it is `open` or `regression`, and the operator reviews it at the parity gate `f7a700a3e482`. Decisions `ee86d68a`, `2032533f`, `ad5363e4`, `8b5e51fc`.

## Scope

One route record per child of this milestone, the shell first since every route inherits it, then the routes in the order the soft edges give: home, about, faq, stories index, story pages, designs index, design pages, cutting planner, tools and resources, contact, legal, suppliers (with the map), subscribe (with the Buttondown form). Each route record lists the differences it will close and is sliced with `/to-slices` once the ledger and the copy verdicts exist, attended or by an orchestrator's worker.

Work in `../ui` and `../gridkit` is its own slice under the route that needs it, on Fable, and the publishes are deferred to the end of the milestone (decision `28c1a536`): the slice commits in the sibling by pathspec, verifies there, moves each item it closes to `upstream` with a note citing the sibling commit, and writes `kipu relate 99f2fe62c62f blocked_by <itself>`; no slice consumes a publish or carries a Wants line for one, and a route record finishes with `upstream` items on it. Every slice is minted with its `worker:<model>` tag (decision `8eed053a`). A route slice is `blocked_by` the shell slice whose deliverable it consumes, since a slice does not inherit its record's edges.

## Seams under test

Per route record. Most have none pure.

## Exit demo

Every child record is `done`, each finished by `/finish-epic` when its ledger is clean; the operator reviews every route at the parity gate `f7a700a3e482`.

## Out of scope

Dependency upgrades (M3) and the release (M4).

## Outcome

## Log

- 2026-09-25: The unattended run starts (plan e0d02ccdfb3f). Standing instructions for every worker: the publishes are deferred, so a sibling fix parks its items in `upstream` and blocks the bump plan `99f2fe62c62f` (decision `28c1a536`); every slice is tagged `worker:<model>` (decision `8eed053a`); the subscribe form's key is an attended slice; a copy item is closed by the verbatim legacy text or the item's verdict and nothing else; a `\"` in a heredoc note lands literally, so notes are single-quoted; the gate is `timeout 900 just check`.

- 2026-09-26: The shell record's slices have all shipped; fourteen items on shell wait on the operator. From here a record finishes with its operator items on an attended verdicts plan beside it and its agent-fixable leftovers on slices beside it (decision 40abdb2f222a), so the route records are not held on the operator's time.
