---
title: "Route: design pages"
status: todo
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: f901cf9f724d
    strength: soft
    note: route order
---

## Goal

Every page of this record's route family is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator has reviewed it on `pnpm dev` against the legacy site. Decision `ee86d68a`.

## Scope

The differences on the sampled design routes: `/designs/bed-frame`, `/designs/shelf-tower`, `/designs/5-12-13-triangle-desk` (they stand for every design page, which shares one component), listed here by id when this record is sliced (`kipu list --collection difference --filter route=<route> --json` for each). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=<route> --not-status sanctioned --not-status fixed --not-status dismissed` prints nothing for each of the three sampled design routes, and the operator finishes this record after reviewing the route.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log
