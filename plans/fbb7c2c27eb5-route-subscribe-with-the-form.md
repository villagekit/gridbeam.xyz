---
title: "Route: subscribe, with the form"
status: todo
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: 872ab70e2ff9
    strength: soft
    note: route order
---

## Goal

The route `/subscribe` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator has reviewed it on `pnpm dev` against the legacy site. Decision `ee86d68a`.

## Scope

The differences on `/subscribe` in the ledger, listed here by id when this record is sliced (`kipu list --collection difference --filter route=/subscribe --json`). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=/subscribe --json` shows no `open` or `regression` item, and the operator finishes this record after reviewing the route.

wants: the Buttondown API key, for the form.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log
