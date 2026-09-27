---
title: "Route: cutting planner"
status: todo
parent: 337e35d86920
blocked_by:
  - a78b167170b8
  - target: 0bc88eaf5493
    strength: soft
    note: route order
---

## Goal

The route `/tools/cutting-planner` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on `/tools/cutting-planner` in the ledger, listed here by id when this record is sliced (`kipu list --collection difference --filter route=/tools/cutting-planner --json`). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=/tools/cutting-planner --json` shows no `open` or `regression` item, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Other routes; the shell, except where a difference on this route is closed by a shell change, which then belongs to the shell record.

## Outcome

## Log

- 2026-09-27: From the ui Select slice [[ad2f5e52f9d8]]: the live legacy site renders a select on /tools/cutting-planner, id unlimited-beams, 40px tall and white, from packages/applet-cutting-planner/src/components/cutting-planner.tsx:133-147 at fce357d (a FormLabel and a Select inside the applet the page file imports at :1), where this record's earlier notes and the designs finish read the page file alone and said legacy renders none. The current planner's select (app/tools/cutting-planner/CuttingPlanner.tsx:158-170) writes bg white as its own prop, id unlimited-stock and size sm (32px under the sibling, 36px on the published 1.2.0): the re-port takes the applet's lines, and the prop goes, since the ui native select's outline field is white by the recipe from ui commit 6e4f482. The route's select also carries the five shell readings the ui slice [[6bc0d3ba08dc]] fixes (hover border, transition, 1px bottom padding, the chevron's glyph and aria-hidden); the route's own [[c6792d6e6ec8]] closes with that fix at the bump.

- 2026-09-27: From the design pages record's split (plan 0bc88eaf5493): the applet's result components (DisplayUnitToggle, CuttingPlan, BeamRow, BeamsTable, CuttingPlannerResult, with legacy's barrel) are re-ported by [[55d567074c71]] into app/tools/cutting-planner/components/ in legacy's file shape under the sanctioned fede2033572a, for the design pages' Plan tab first; this record's split consumes them (blocked_by that slice) and re-ports CuttingPlanner and CuttingPlannerControls beside CuttingPlannerResult from cutting-planner.tsx, the monolith CuttingPlanner.tsx, algorithm.ts's shape (1da20b256e35, acdaeabccfca) and CutBeamSvg.tsx staying this record's. The design pages' drawing takes CutGridBeamSvg from the published 0.10.0's root export; the planner's custom stock still waits on the sibling's three commits and the publish (7f2556a9ec9d). The design page's translation of the applet's toggle wiring under Chakra v3 (Ark's field-context label ids) is read by that slice and recorded in its Outcome, a reading this record's split can take.
