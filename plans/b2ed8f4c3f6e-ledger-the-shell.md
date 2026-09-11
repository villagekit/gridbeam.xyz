---
title: "Ledger: the shell"
status: todo
parent: c6182c6a8609
derived_from: c6182c6a8609
blocked_by: 4465f31eea38
priority: high
---

The parity ledger holds every difference on the shell (the header, footer, nav, theme tokens and page layouts every route shares), cited on both sides and judged by rule, with copy and `added` items left `open` for the operator. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `2032533f`, `ad5363e4`, `ca677697`, `bfa9a416`.

## Work

Run the `parity` skill on: `shell`. Capture first (`shell` is not a route: run `pnpm audit:pages` and `pnpm audit:dom` with a routes file listing `/`, against the live legacy site and a local `pnpm dev`, and read the shell from those captures), then one Sonnet sub-agent per route per family (copy, visual and interaction, accessibility, code), then mint and judge every difference. Decision `bfa9a416` names the shell's files on both sides; note that the legacy site already used `@villagekit/ui` beneath its private `ui-*` packages, so the shell diff is the legacy lockfile's version plus those packages against the current version with them folded in, and the nav is three top items against six plus the footer sections. Include the design tokens (fonts, radii, palette): the May 2026 audit's observation that the site reads greyer than legacy belongs here. Use the `/` captures at the three widths for the shell's screenshots. Check the cross-cutting findings in note `526d5330` (the dead-code sweep, metadata and config drift, `@villagekit/ui`'s Next peer claim, `LinkCard`'s accessible name, and the Cloudinary video and media transforms that the legacy `ui-media` components carried) and file each that still holds, on the `code` or `accessibility` axis, on `shell`.
Interfaces: the `difference` items, by route, for the route records under M2 (`337e35d8`).
Verify first: `audit/_root/dom/` exists (the tooling slice `4465f31e` shipped).
Not this slice: fixing anything; judging copy.

## Seams under test

None pure.

## Done when

- `kipu list --collection difference --filter route=shell --json` has items, or the note below records that the sub-agents found the shell identical on every family
- Every `open` item among them is on the `copy` axis or has `kind: added`
- Every `sanctioned` item's Verdict names a rule or a lock
- A `kipu note` on M1 (`c6182c6a`) records the counts per state, axis and kind for these routes and what the sub-agents found identical
- `kipu verify` is green
- `pnpm check` is green

## Outcome

## Log
