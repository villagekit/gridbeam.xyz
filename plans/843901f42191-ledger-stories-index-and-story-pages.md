---
title: "Ledger: stories index and story pages"
status: done
parent: c6182c6a8609
derived_from: c6182c6a8609
blocked_by:
  - 4465f31eea38
  - b2ed8f4c3f6e
priority: medium
---

The parity ledger holds every difference on the stories index and the six story pages, cited on both sides and judged by rule, with copy and `added` items left `open` for the operator. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `2032533f`, `ad5363e4`, `ca677697`, `bfa9a416`.

## Work

Run the `parity` skill on: `/stories`, `/stories/whats-a-grid-unit`, `/stories/how-to-cut-grid-beams`, `/stories/how-to-furniture-bolts`, `/stories/building-with-grid-kit`, `/stories/2021-winter-newsletter`, `/stories/2022-newsletter`. Capture first (`pnpm audit:pages` and `pnpm audit:dom` with a routes file listing exactly these routes, each carrying its side marker from `scripts/audit-routes.txt`, against the live legacy site and a local `pnpm dev`), then one Sonnet sub-agent per route per family (copy, visual and interaction, accessibility, code), then mint and judge every difference. The MDX prose was verified word-for-word faithful in August 2026 (note `48c33db3`); diff it anyway, mechanically, and expect few copy items beyond the rebrand rule, the editorial note device and the heading levels named in note `526d5330`; the legacy `story-image-carousel` on the two newsletters is that note's `ImageCarousel` finding on those two routes.
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

Shipped: the parity ledger for `/stories` and the six story pages, 88 `difference` items on the seven routes (open 29, all copy or `added`; regression 53; sanctioned 6, each naming a rule), plus one on `/` (the StoryCard focus-within selector Chakra v3 rejects, 150c408aba5a) and two on `shell` the shell pass missed (`@villagekit/ui` `Link` dropping `isExternal`, ecfa31cea5a0; the MDX blockquote, f9b9ec72d771). The counts per state, axis and kind and what was found identical are noted on M1 (c6182c6a8609). Captured fresh with `pnpm audit:pages` and `pnpm audit:dom` for exactly the seven routes; 28 Sonnet diffs (one per route per family), the lists deduped and judged by rule; the eight StoryCard items on `/` cited, three of the home items annotated (2a6f442cbd7f, 342f8aa75017, 081bb0ea7651). The MDX prose held word for word (note 48c33db3); note 526d5330's byline, editorial note and h4-to-h3 findings hold and are filed as copy; its ImageCarousel finding on the two newsletters is filed there (d090ce55d1bc, 2bb459b9f5db).

Filing convention (flag for the operator): the story page template is shared by six routes and is neither `shell` nor one route. Its differences (TOC, nested main, article scope, byline, h2 alignment, section width, row alignment, grid tiles, component rewrites) are filed once on `/stories/whats-a-grid-unit` with a log line naming the six routes, following the home worker's StoryCard precedent, so `kipu list --filter route=/stories/how-to-cut-grid-beams` does not show them. The Standards and Spec reviews both flagged that the other five routes look nearer parity than they are; the fix is a convention (a `route` value for the story template, or duplicating the items per route) and is the operator's call before the M2 route records are cut.

Review round one (Standards, Spec, Parity on Opus), applied: a dismissed item re-judged regression (8a6daf7fad72), a rebrand sanction re-judged open (40e89fd36d02, the rule lowercases "Grid Kit", not "Grid Beam"), a false call-site claim removed (ecfa31cea5a0), two combined items split into five, seven template items given the six-routes log line, an unversioned ui citation pinned, the mdx readme citation widened, and three missed differences minted (Back no longer undoing a filter, 10bea19307bb; the card date format on /stories, 81fe5de78974; two tables of contents on three routes, aece63987800). Rejected: (1) ef21d53da4cd (h4 to h3) on the copy axis, because the plan names "the heading levels named in note 526d5330" among the copy items; (2) cc70e66936f8 and ff07afa4ea2b kept apart from 73dd61e26135 because they are `added` facets the operator judges; (3) c983ec56248e keeps the component and its field together as one device, and b5aa272c70e7 keeps the unnamed nav and the h2-before-h1 together as one placement; (4) 40e89fd36d02's stale Verdict text stays, per the ledger README ("Nobody edits a Verdict"), superseded by its log and state; (5) 150c408aba5a stays on `/` with the other StoryCard items. Round two checked the fixes and corrected one route (8df7a085e421) and one citation. The building-with-grid-kit code diff agent had not reported by the close; its scope (the MDX metadata shape, the StoryImage props, two removed comments) is covered by that route's copy agent and the template items.

Verify: `pnpm check` green (exit 0) and `kipu verify` green (495 items). The change touches no route, so no screenshots were re-taken after filing; the captures under `audit/stories*` are today's. Caveats recorded on M1: lazy-loaded images render blank in the full-page current screenshots (present in the DOM and on Cloudinary); the Next dev badge appears in current captures.

Not this slice, left alone: fixing anything; judging copy. Two route-ledger plans remain under M1 (faq/contact/legal/tools/subscribe, and designs), then the copy grilling gate e2805adefd47.

## Log
