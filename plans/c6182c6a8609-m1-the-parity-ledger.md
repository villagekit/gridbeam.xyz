---
title: "M1: the parity ledger"
status: doing
parent: 1783931160f2
---

## Goal

Every difference between the legacy site and this one is an item in the `difference` collection, cited on both sides and judged by rule, so that the copy grilling can start from a complete list and M2 can be planned from facts. Decision `ee86d68a`.

## Scope

- The audit tooling gains DOM extraction: for every route in `scripts/audit-routes.txt`, on both sides, the visible text in document order and the accessibility tree, written under `audit/<slug>/dom/` beside the screenshot pairs `pnpm audit:pages` already writes. `pnpm audit:dom` runs it with the same flags.
- The ledger for `shell` first (decision `bfa9a416` names the files on both sides), then for every route in `scripts/audit-routes.txt`, filled by the `parity` skill: Sonnet sub-agents per route per family, items minted and judged by the worker under decisions `2032533f` and `ad5363e4`, copy and `added` items left `open` (decision `ca677697`). `/suppliers` is an `added` route and is run in full, its copy one `open` item per visible text block; `/store`, `/legal/cookie-policy` and `/legal/return-policy` are legacy-only and get one `removed` item each, sanctioned under the matching rule, not a diff.
- The carried-forward findings in note `526d5330` are checked by the slice whose route they touch, and each one that still holds is a filed difference. The cross-cutting findings there (the dead-code sweep, metadata and config drift, `@villagekit/ui`'s Next peer claim, `LinkCard`'s accessible name, the media transforms) belong to the shell slice; `ImageCarousel` to the home slice for `/` and to the stories slice for the newsletters; the catalogue empty state and the sibling-repo findings on the 3D viewer (`detect-gpu`'s unpkg request, the sandbox's Chakra v3 CSS, `utility-workbench`'s 0 gu beams) to the designs slice; the `CutBeamSvg` swap and the planner copy to the cutting-planner slice. The note's "small visual and a11y nits" names no route and is superseded by the ledger.

## Seams under test

The DOM extraction's pure part: the function that turns a captured page's visible text into the normalized, line-per-block `.txt` form, tested with a fixture string. Nothing else here is pure.

## Exit demo

`pnpm audit:dom --routes scripts/audit-routes.txt` exits 0 against the legacy site and a local `pnpm dev`, writing both sides for every route that exists on both; `kipu list --collection difference --json` has items on `shell` and on every route the parity notes on this record do not report as identical; every `open` item is on the `copy` axis or is `kind: added`.

## Out of scope

Fixing anything. Judging copy.

## Outcome

## Log
