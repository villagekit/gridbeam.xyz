---
title: "Route: story pages"
status: todo
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: ca353de8b645
    strength: soft
    note: route order
---

## Goal

Every page of this record's route family is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator has reviewed it on `pnpm dev` against the legacy site. Decision `ee86d68a`.

## Scope

The differences on the six story routes: `/stories/whats-a-grid-unit`, `/stories/how-to-cut-grid-beams`, `/stories/how-to-furniture-bolts`, `/stories/building-with-grid-kit`, `/stories/2021-winter-newsletter`, `/stories/2022-newsletter`, listed here by id when this record is sliced (`kipu list --collection difference --filter route=<route> --json` for each). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=<route> --not-status sanctioned --not-status fixed --not-status dismissed` prints nothing for each of the six story routes, and the operator finishes this record after reviewing the route.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log
