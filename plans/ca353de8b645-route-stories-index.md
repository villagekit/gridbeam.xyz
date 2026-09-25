---
title: "Route: stories index"
status: todo
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: 7f0b60d948c5
    strength: soft
    note: route order
---

## Goal

The route `/stories` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on `/stories` in the ledger, listed here by id when this record is sliced (`kipu list --collection difference --filter route=/stories --json`). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=/stories --json` shows no `open` or `regression` item, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log
