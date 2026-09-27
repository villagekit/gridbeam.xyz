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

Every page of this record's route family is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on the sampled design routes: `/designs/bed-frame`, `/designs/shelf-tower`, `/designs/5-12-13-triangle-desk` (they stand for every design page, which shares one component), listed here by id when this record is sliced (`kipu list --collection difference --filter route=<route> --json` for each). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=<route> --not-status sanctioned --not-status fixed --not-status dismissed` prints nothing for each of the three sampled design routes, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log

- 2026-09-27: From the designs index record's split (plan f901cf9f724d): the catalog re-port [[8417428fd88a]] mounts legacy's CatalogueLayout in app/designs/layout.tsx, the getLayout legacy attached to both designs pages ([[f323b5834590]], filed once for both), so the design page carries legacy's margins from then on, stacking on Section index 0's padding (app/designs/[id]/page.tsx:49) and insetting the gray suppliers band from md (:53, [[7e28a0685fba]]) until this record re-ports it; that slice files an item on /designs/bed-frame for the Section wrapper if none records it. The library slice [[79cec2c9c850]] makes getDesign return legacy's { code, meta } and generateStaticParams read getDesignIndexes(); the swc compile ([[9d4e2e43543e]]) lands in that function. CatalogueItem.tsx stays in app/_components/catalogue/ with its barrel export until this record moves it; DesignViewer.tsx keeps app/_lib/url-state.ts.
