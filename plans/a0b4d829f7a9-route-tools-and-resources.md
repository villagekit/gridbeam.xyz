---
title: "Route: tools and resources"
status: todo
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: 396c9af0cbd1
    strength: soft
    note: route order
---

## Goal

The route `/tools-and-resources` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator has reviewed it on `pnpm dev` against the legacy site. Decision `ee86d68a`.

## Scope

The differences on `/tools-and-resources` in the ledger, listed here by id when this record is sliced (`kipu list --collection difference --filter route=/tools-and-resources --json`). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=/tools-and-resources --json` shows no `open` or `regression` item, and the operator finishes this record after reviewing the route.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log
