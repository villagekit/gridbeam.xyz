---
title: "Route: the shell"
status: todo
parent: 337e35d86920
blocked_by: e2805adefd47
---

## Goal

The route `shell` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on `shell` in the ledger, listed here by id when this record is sliced (`kipu list --collection difference --filter route=shell --json`). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=shell --json` shows no `open` or `regression` item, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Any single route's own differences; a route difference that a shell change closes is cited from here and fixed here.

## Outcome

## Log
