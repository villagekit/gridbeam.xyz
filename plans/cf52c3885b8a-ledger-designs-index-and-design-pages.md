---
title: "Ledger: designs index and design pages"
status: todo
parent: c6182c6a8609
derived_from: c6182c6a8609
blocked_by:
  - 4465f31eea38
  - b2ed8f4c3f6e
priority: medium
---

The parity ledger holds every difference on the designs index and the design pages, cited on both sides and judged by rule, with copy and `added` items left `open` for the operator. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `2032533f`, `ad5363e4`, `ca677697`, `bfa9a416`.

## Work

Run the `parity` skill on: `/designs`, `/designs/bed-frame`, `/designs/shelf-tower`, `/designs/5-12-13-triangle-desk`. Capture first (`pnpm audit:pages` and `pnpm audit:dom` with a routes file listing exactly these routes, each carrying its side marker from `scripts/audit-routes.txt`, against the live legacy site and a local `pnpm dev`), then one Sonnet sub-agent per route per family (copy, visual and interaction, accessibility, code), then mint and judge every difference. The 3D viewer and its controls are read from the code and the screenshots at 1280 (the `networkidle` fallback applies). Check the sibling-repo findings on the viewer in note `526d5330` (`detect-gpu`'s unpkg request, the sandbox's Chakra v3 CSS, `utility-workbench`'s 0 gu beams) and file each that still holds, on `/designs/bed-frame` (the sampled slug that stands for every design page); the catalogue empty-state copy rewrite in that note is a copy item on `/designs`.
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
