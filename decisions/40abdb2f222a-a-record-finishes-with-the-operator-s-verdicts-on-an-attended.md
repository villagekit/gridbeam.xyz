---
title: A record finishes with the operator's verdicts on an attended plan beside it
status: accepted
date: 2026-09-26
relates: b9af27e0df50
---
## Context

`b9af27e0df50` closes a route record unattended when its ledger is clean and sends the operator's review to the parity gate. The unattended run's reviews file new items on every route as they go: rebranded copy under rule 1, rule 4 candidates where an upgrade changed a shape, layout calls with more than one fitting answer. Each is the operator's verdict, and a record held on them holds every record after it, since the route records are `blocked_by` the shell record and soft-ordered among themselves. On 2026-09-25 the operator instructed the run to do what can be done without them and to mint an attended plan for what waits on them, handled later.

## Decision

- At `/finish-epic`, a route record's exit clause that no item on its route is `open` or `regression` is met when every remaining such item is one of: `upstream` (`28c1a536`); named by the one attended verdicts plan minted beside the record (`--parent` the record's parent, `derived_from` the record, tagged `attended`, its Wants line naming the operator's verdicts, its body listing each item's id and the question it asks); or named by a slice minted beside the record for a fix an agent can make (tagged `worker:<model>`, and where the fix lands in `../ui` or `../gridkit`, blocking the bump plan `99f2fe62c62f`). The record then finishes, its Outcome naming the items handed on.
- The parity gate `f7a700a3e482` is `blocked_by` every attended verdicts plan, written by the finisher, so the operator's review of the site comes after their verdicts; `kipu ready --tag attended` remains the operator's queue.
- An item on a verdicts plan keeps its state until the operator judges it: `sanctioned` or `dismissed` with the verdict, or `regression` with a slice minted for the fix.

## Consequences

`plans/README.md` reads with this; the record bodies' Exit demo is read by its spirit as the `finish-epic` skill says. A route record no longer holds the next one on the operator's time, and the operator's work gathers in a few attended plans rather than across the ledger.
