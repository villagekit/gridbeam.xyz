---
title: "Ledger: cutting planner and suppliers"
status: todo
parent: c6182c6a8609
derived_from: c6182c6a8609
blocked_by:
  - 4465f31eea38
  - b2ed8f4c3f6e
priority: medium
---

The parity ledger holds every difference on the cutting planner and the suppliers page, cited on both sides and judged by rule, with copy and `added` items left `open` for the operator. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `2032533f`, `ad5363e4`, `ca677697`, `bfa9a416`.

## Work

Run the `parity` skill on: `/tools/cutting-planner`, `/suppliers`. Capture first (`pnpm audit:pages` and `pnpm audit:dom` with a routes file listing exactly these routes, each carrying its side marker from `scripts/audit-routes.txt`, against the live legacy site and a local `pnpm dev`), then one Sonnet sub-agent per route per family (copy, visual and interaction, accessibility, code), then mint and judge every difference. `/suppliers` has no legacy route: one `added` item for the route itself, sanctioned under rule 5 by decision `8b5e51fc` (rule 2 covers the store's removal, not this addition), then a full run whose copy is one `open` item per visible text block (a heading, a paragraph, a label, an empty state). The legacy `/store` is one `removed` item under rule 2, not diffed. The cutting planner's rewritten labels and changed defaults from note `526d5330` are copy items, left `open`; the `CutBeamSvg` swap there is a `code` item if it still holds.
Interfaces: the `difference` items, by route, for the route records under M2 (`337e35d8`).
Verify first: `audit/<slug>/dom/` exists for each route (the tooling slice `4465f31e` shipped) and the shell ledger (`b2ed8f4c`) is filed.
Not this slice: fixing anything; judging copy.

## Seams under test

None pure.

## Done when

- For each of these routes, `kipu list --collection difference --filter route=<route> --json` has items, or the note below records that the sub-agents found the route identical on every family
- Every `open` item among them is on the `copy` axis or has `kind: added`
- Every `sanctioned` item's Verdict names a rule or a lock
- A `kipu note` on M1 (`c6182c6a`) records the counts per state, axis and kind for these routes and what the sub-agents found identical
- `kipu verify` is green
- `pnpm check` is green

## Outcome

## Log
