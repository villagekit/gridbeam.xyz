---
title: Route records close unattended; the operator reviews at the parity gate
status: accepted
date: 2026-09-25
---
## Decision

A route record (an epic under M2) is finished by `/finish-epic`, unattended, when its slices have shipped and its exit demo holds: no `open` or `regression` difference on its route. The operator reviews every route on `pnpm dev` beside the legacy site once, at the parity gate `f7a700a3e482`, which is tagged `attended`. The route records and M2 no longer name a per-route operator review.

## Reasons

- The shared agentic set finishes an epic unattended unless it carries `attended`; a per-route review would either tag every record `attended` or leave fourteen records waiting on the operator between runs.
- The ledger already defines parity mechanically, and the parity gate is where the operator's eyes were always going to land; one review of the whole site is the same work in one sitting.
- The operator's call of 2026-09-25, at the adoption of the shared set.

## Consequences

- An orchestrator runs M2 to the parity gate without stopping for a record's finish.
- A route the operator rejects at the gate reopens as a new difference or a new plan, never by editing a finished record.
