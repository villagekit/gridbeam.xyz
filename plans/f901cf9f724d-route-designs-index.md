---
title: "Route: designs index"
status: todo
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: 56e6eb197e6c
    strength: soft
    note: route order
---

## Goal

The route `/designs` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on `/designs` in the ledger, listed here by id when this record is sliced (`kipu list --collection difference --filter route=/designs --json`). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=/designs --json` shows no `open` or `regression` item, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log

- 2026-09-26: From the stories index record's finish (plan [[ca353de8b645]], its Log's call 9): the page re-port [[278fb531e229]] put legacy's option.tsx at app/_components/Option.tsx as a shared component, since legacy's catalog selector renders it too, and legacy's context/stories.tsx at app/_lib/context/stories.tsx, where context/catalogue.ts is to be ported beside it. The split of this record consumes both rather than porting a second Option; the catalog's url-state consumer (app/_components/catalogue/Catalogue.tsx) is one of the three the re-port left app/_lib/url-state.ts for.
