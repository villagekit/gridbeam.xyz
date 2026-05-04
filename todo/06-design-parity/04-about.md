# 04 — Uplift: About (`/about`)

**Status:** TODO

## Why

The legacy `/about` was a tight visual essay: large centered text statements, alternating with single full-width images. It read like one coherent argument. The current rebuild reorganised it into a six-section "marketing page" with `Title → Container → SimpleGrid` per section. Some of the new content (the Phelps/Isaacs history, the navigation cards) is a real improvement; the loss of the legacy's tight image-text rhythm in the middle is the regression.

## Concrete regressions

From `audit/about/{375,768,1280}/{legacy,current}.png` and `app/about/page.tsx` ↔ `node-modules/apps/gridkit/pages/about.tsx`:

### Visual
- Legacy uses big centered emphatic typography (`AboutText` is `fontSize={['xl', null, '2xl']}`, `textAlign: 'center'`). Current uses normal-weight body text in a 3xl container, mostly left-aligned. Legacy's emphasis-statements (e.g. "**Hex-nut fasteners** bolt together beams and panels quickly…") had visual weight; current absorbs them into longer paragraphs.
- Legacy's parts breakdown (Beam → Panel → Fastener) was a vertical sequence of full-width images interleaved with statements. Current uses a 3-card horizontal `SimpleGrid` that's good for scanability but loses the "look at this image, read this one sentence" rhythm.
- Legacy has no `Section` chrome (no alternating gray/white backgrounds) — it's a single flowing essay. Current has 6 sections with alternating `colorPalette="gray"`, breaking the flow into distinct chunks.

### Interaction
At parity (both static).

### Accessibility
At parity. Current's `<Section>` adds `<section>` landmarks, slightly better.

### Copy
- ➕ New "Where it came from" history section (Ken Isaacs / Phil Jergenson) — strong addition for an educational site. Keep.
- ➕ New "Start building" 3-card navigation block — appropriate. Keep.
- ➖ Legacy emphasis-statements ("**Hex-nut fasteners** bolt together beams and panels quickly (and disassembly!)") have been absorbed into longer paragraphs ("Hex-key furniture bolts and nuts that pass through the holes. One tool, one fastener type — assembly is fast, and disassembly is just as fast."). The new copy is more informative but less punchy.

### Code patterns
- Current's `AboutPhoto`, `PartCard`, `NextStepCard` are local components defined in `app/about/page.tsx`. The shape of `NextStepCard` is identical to the home page's `MakerCard`, the `LegalCard` on `/legal`, the `ResourceCard` on `/tools-and-resources`, and the `SubscribeCard` on `/subscribe`. Five copies of the same card. Worth a single shared `LinkCard` / `NavCard`.

## Recommended mode

**First-principles rethink (partial).** Don't just go back to the legacy structure; the new content additions (history, navigation cards) are real improvements. But restore the *visual rhythm* of the middle sections — the parts breakdown specifically should have the legacy's "image, then one big statement, image, then one big statement" cadence, not a 3-card SimpleGrid.

Specifically:

1. Keep the new top section (intro paragraphs + Phelps history call-out).
2. Keep the new "Where it came from" section (Phelps/Isaacs history is good content for a non-commercial site).
3. Keep the new "Start building" navigation cards at the bottom.
4. **Restore the legacy parts breakdown:** for Beam, Panel, Fastener, use the legacy pattern of one full-width image + one centered emphatic sentence (instead of 3-card grid). Same for "How it goes together" (tri-joint).
5. Drop alternating section background colours in the parts area so it feels like a single essay, not 6 separate marketing sections.
6. Use larger centered text for the emphasis statements — port the `AboutText` size system (`fontSize={['xl', null, '2xl']}`).

## Steps

- [ ] Re-architect `app/about/page.tsx`:
  - Section 1: intro (keep current, slight copy lift)
  - Section 2: parts essay (legacy rhythm) — Beam → Panel → Fastener → tri-joint, each as image+statement
  - Section 3: "Where it came from" (keep current)
  - Section 4: "Start building" navigation cards (keep current)
- [ ] Decide whether to extract the 5 near-identical card components into a single shared `LinkCard` in `@villagekit/ui` (defer if controversial; the about-page rewrite is the priority).
- [ ] Verify visually at 375 / 768 / 1280 and confirm the parts essay reads more like the legacy.
- [ ] Re-check that the heading order is sensible (`h1` for "What is grid beam?", `h2` for sections).

## Notes
- Don't be tempted to make this a one-to-one legacy port. The Phelps history is a worthwhile addition. The goal is "parts essay rhythm restored, history kept".
- The legacy text for the parts ("Beam profiles are 40mm x 40mm and have a repeating pattern of 8mm holes drilled 40mm apart.") is good — port it verbatim or close.
- Image assets used: `v1/gridkit.nz/grid_yvn1om`, `grid-example_vezsvx`, `beams_czf9hb`, `panels_rs1ea1`, `fasteners_ctuejz`, `tri-joint_lqtzvf`. Already re-hosted under `gridbeam.xyz/about/...` per recent stream-04 work.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/about/page.tsx`
- Legacy: `node-modules/apps/gridkit/pages/about.tsx`
