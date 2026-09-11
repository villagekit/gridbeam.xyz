---
title: "Ledger: the shell"
status: done
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

Shipped: the shell ledger, 104 `difference` items on `route: shell` (open 42, regression 45, sanctioned 17, dismissed 0), each with Legacy and Current cited on both sides; the counts, the identical findings and the evidence provenance are in the note on M1 (`[[c6182c6a8609]]`). Captured `/` at 375, 768 and 1280 with `pnpm audit:pages` and `pnpm audit:dom` against the live legacy site and a local `pnpm dev`; four Sonnet sub-agents (copy; visual and interaction; accessibility; code) diffed the shell from the captures, `../node-modules` at `fce357d`, `@villagekit/ui@0.9.0` (fetched with `npm pack`, its `src/` ships in the tarball) and `@villagekit/ui@1.2.0`. Three Opus review rounds (Standards, Spec, Parity) followed; each round's findings were verified against the files before acting.

Recorded: decision `[[91cbeac8a3fd]]` (hosting on Cloudflare Workers via OpenNext), carried forward from CLAUDE.md so the OpenNext sanction cites a decision under rule 5; CLAUDE.md's key decisions list it.

Deviations from the plan: none in scope. Decision `bfa9a416` names `ui-{page,nav,media,mdx}` as the legacy shell; `ui-brand` (the footer with its social row and slogan) and `ui-cookies` were read too, since the legacy shell imports them.

Findings acted on: two copy items first judged `regression` moved to `open` (copy is the operator's whatever the lock says about its neighbours); the footer-sections umbrella split into one item per heading and link (`ca677697`: item by item); nine, then two, then two more shell differences the sub-agents missed, filed (the 768 overflow, the credit link and text tokens, the social icon naming, the toast regions, the viewport meta, the brand gap, the mobile list padding, `LinkCard`'s dropped `aria-label`, the OpenNext hook, `suppressHydrationWarning`, the Suppliers item's position in the nav); a false dismissal (`a05e17fde479`, the lens paths end in `z` in `CubeLogo`) superseded by note and moved to `regression`; fifteen citations corrected; the M1 note's tallies corrected.

Findings rejected, with reasons: (1) the free-shipping banner sanction under rule 2 (three reviewers): a store promotion shown on the store and cart routes is a store surface as the rule means it; a Log note on `e53f7966fde8` records the doubt for the operator to overrule. (2) `230ce4ee4848` (build-error suppression removed) and `0bde795aa7ae` (social icon names moved to the link) "are better than legacy, so not regressions": the skill judges by the rule's absence, never by which side is better (`ee86d68a`); both carry Log notes so one operator sanction closes them. (3) The 404 items belong to a route, not the shell: no route plan owns the not-found page and it is served by the root layout for every path; they stay on `shell`. (4) `b397b0deb1cc`, `d750c0a47839`, `5b4ef6aaa80c` and `2cbb4f4b8497` are route or packaging matters: the plan asked for the note's cross-cutting findings (media transforms, the Next peer claim, `LinkCard`) on `shell` on the code or accessibility axis; they stay. (5) `6b2180907f41` (og:locale) folds into `f46533a8ae54`: the declared value differs on its own and will render once the override is fixed; kept. (6) Non-copy items that bundle several values (`5070227f4411`, `362c648bf846`, `54c8b8390c40`, `e0824769af3d`): the rules judge each as one shape; kept. (7) `audit/` is gitignored and `0.9.0` is on no sibling checkout: by the repo's design; the M1 note says how both are regenerated.

Not this slice, left to the route ledgers: the `CatalogueLayout` and `StoriesLayout` removals, story images bypassing Cloudinary, each route's own metadata override, the subscribe form's feedback without toasts.

Gate: `pnpm check` green (lint, typecheck, 78 tests, build); `kipu verify` green. No route was touched, so no fresh screenshots beyond the captures the ledger cites.

## Log
