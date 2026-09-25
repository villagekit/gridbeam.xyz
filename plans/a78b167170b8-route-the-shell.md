---
title: "Route: the shell"
status: doing
parent: 337e35d86920
blocked_by: e2805adefd47
---

## Goal

The route `shell` is at parity with the legacy site: every difference on it is `fixed` or `sanctioned`, and the operator reviews it at the parity gate `f7a700a3e482`. Decision `ee86d68a`.

## Scope

The differences on `shell` in the ledger, listed here by id when this record is sliced (`kipu list --collection difference --filter route=shell --json`). The port rule of decision `ee86d68a` decides whether each slice re-ports from the legacy source or fixes in place.

## Seams under test

Named when sliced; none pure unless the route carries logic.

## Exit demo

`kipu list --collection difference --filter route=shell --json` shows no `open` or `regression` item, and `/finish-epic` finishes this record; the operator reviews the route at the parity gate `f7a700a3e482`.

## Out of scope

Any single route's own differences; a route difference that a shell change closes is cited from here and fixed here.

## Outcome

## Log

- 2026-09-25: Split into fifteen slices (plan a78b167170b8), reviewed once on two Opus sub-agents. Site-side, against `@villagekit/ui@1.2.0`: `63e9c753ca55` the top nav, header action and 404 heading (Sonnet); `ffe8e5d56f8e` the document head (Opus); `5e4529a6aeac` the site footer in place; `f8c93eaf4922` the header brand by svgr; `4f6f086c5d77` next.config; `39b1a28bb0cc` the site theme; `a7bf623f885c` the layout composition and QueryParamProvider; `93ef1234208c` the footer WebGL cube (Fable). In `../ui`, all Fable, each parking its items in `upstream` and blocking the bump plan `99f2fe62c62f` (decision `28c1a536`): `c14505b76b6a` the palette literals; `45d6f5634a11` the recipes and provider; `1c74a465996d` the framework boundary, which the nav `b0f69896e764`, brand footer `1977c9af920c`, mdx and media `bc0407533650` and LinkCard `1cc03cfabcf2` slices follow. Every `regression` on `shell` is named in exactly one slice's Closes line. Calls made at the split, for the operator to read: the top nav ships decision `c21b7e35f0c7`'s four items exactly, so Suppliers leaves the top nav (the header action `e48df8d1ce98` and the footer carry it) and `191e28561c6d`'s nav clause is overtaken; the footer's link labels stay legacy's (`Tools and resources`, `Newsletter`) where decision `9f344fbfde9a` lists pages without a sanctioned label change, its headings ship as it names them; `0efe45924dbe`'s verdict stands, so the ui media components take legacy's hard-coded cloud name as their default and the site's video swap (`b397b0deb1cc`) lands at the bump; `230ce4ee4848` restores the two build flags with the legacy author's comment, one operator sanction drops them; the OG video's alt applies rule 1 literally (`made from grid beam`). The site edits a published ui API needs (the nav provider's props, the brand footer, `Provider system`, LinkCard's icon type, the video components) are the bump commit's, each ui slice writing them as a note on `99f2fe62c62f`. Expected stop: with legacy's footer values four columns at `minWidth: 3xs` overflow 768 px, so the brand footer slice files one `open` visual item for the operator; the exit demo waits on that verdict. The footer signup box of `ac6579ec16d2` is the subscribe record's. Stale line found by review: CLAUDE.md says the published `@villagekit/ui` ships TypeScript sources at its top-level exports, but the tarball's `publishConfig.exports` point at `dist/`; only the sibling's top-level exports point at `src/`.
