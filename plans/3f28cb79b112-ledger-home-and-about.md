---
title: "Ledger: home and about"
status: done
parent: c6182c6a8609
derived_from: c6182c6a8609
blocked_by:
  - 4465f31eea38
  - b2ed8f4c3f6e
priority: medium
---

The parity ledger holds every difference on the home and about routes, cited on both sides and judged by rule, with copy and `added` items left `open` for the operator. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `2032533f`, `ad5363e4`, `ca677697`, `bfa9a416`.

## Work

Run the `parity` skill on: `/`, `/about`. Capture first (`pnpm audit:pages` and `pnpm audit:dom` with a routes file listing exactly these routes, each carrying its side marker from `scripts/audit-routes.txt`, against the live legacy site and a local `pnpm dev`), then one Sonnet sub-agent per route per family (copy, visual and interaction, accessibility, code), then mint and judge every difference. The editorial locks (`ad5363e4`) cover part of `/`; sanction those items with `lock: home` and judge the rest. Check note `526d5330` for the home copy rewrites and for `ImageCarousel`'s accessibility and dead half (the hero carousel on `/`), and file each that still holds.
Interfaces: the `difference` items, by route, for the route records under M2 (`337e35d8`).
Verify first: `audit/<slug>/dom/` exists for each route (the tooling slice `4465f31e` shipped) and the shell ledger (`b2ed8f4c`) is filed, so a shell difference is not repeated here.
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

Shipped: the parity ledger for `/` (115 items) and `/about` (42 items), each cited on both sides and judged by the sanctioned-deviation rules and the home lock; copy and additions left `open` for the operator; counts and what was found identical noted on M1 ([[c6182c6a8609]]). No route was found identical on any family. Captures regenerated (`pnpm audit:pages`, `pnpm audit:dom`, both routes); the screenshot pairs were read at 375, 768 and 1280 (the 768 pairs show only the shell overflow, [[fb033121d164]]). Decision [[6b7a97f83ce7]] records the media layout from CLAUDE.md so the re-hosted Cloudinary IDs cite rule 5.

Deviations from the plan: none in scope. Judgement calls recorded on the items: the step-4 footnote and the replacement CTA labels are left `open` rather than sanctioned under rule 2, which names the store surfaces and not those lines; `StoryCard` and `StoryImage` differences are filed here (first route to meet them), eight items logged for the stories ledger to cite; the per-route `Main` and `SkipNavContent`, the video builder, the metadata override mechanism and the loader are not re-filed (shell items cited in the M1 note).

Review (`/code-review` against `ba24bc1`, three Opus axes). Acted on: five visual differences on `/` the first pass missed (typing heading size, testimonial row gap, landing row gap, body lineHeight, bold spans) filed as regressions; the `Box as span` to `Span` swap filed on `/` as on `/about`; the forced `getStaticProps` move split out of [[272613135119]] and sanctioned under rule 4; the two Cloudinary ID items re-minted under decision [[6b7a97f83ce7]] with the hero picture verified byte-identical; a paraphrased `SimpleGrid` quote ([[01bf9692dcea]]), a "byte-identical" claim about the Mix quote ([[d99375b1df60]]) and three line numbers ([[32323d12049b]]) corrected; item ids cited as `[[id]]`; the `/about` interaction family, the 768 caveat and note 526d5330's absent line recorded on M1. Rejected, with the reason on the item: `Span` is not forced by Chakra v3 ([[01ae1e943907]], [[8eca60c60e82]]): Chakra v3 exports `Span` as its inline typography primitive and it renders what `Box as="span"` did, the v3 idiom for the v2 one, within rule 4; the list verdict cites `List.Indicator` the code does not use ([[3d21d3543886]]): the verdict states what v3 forces, and the `Step` helper is its own item; Divergent Change on [[2c82682942d8]], [[1501ee97ed24]] and [[1bbb3def5d97]]: one item per component change is the granularity a fix plan closes, and the `alignSelf` on the testimonial name is not visible (a `VStack` centers by default).

No code changed: no tests, no docs updates; `pnpm check` and `kipu verify` green.

## Log
