# 03 — Uplift: Home (`/`)

**Status:** TODO

## Why

The home page lost the elements that made the legacy landing memorable: the hero image carousel, the testimonials, the typing-effect "Build a [design name]" carousel, the coffee-table assembly video, the icon-led "How to get started" list, and the sustainability + community sections. The current page is a competent marketing layout, but it's missing the dynamic visual elements and the warmth that made the legacy landing distinctive.

## Concrete regressions

From `audit/_root/{375,768,1280}/{legacy,current}.png` and a code read of `app/page.tsx` ↔ `node-modules/apps/gridkit/pages/index.tsx`:

### Visual
- Hero is a single static photo (`HeroPhoto`) instead of legacy's 4-image autoplaying `ImageCarousel` (record shelf, standing desk, cat castle, kitchen island).
- Lost the legacy's pink hero panel — current is a white section, less warm.
- Lost the alternating image-left / image-right rhythm enforced by `LandingRow`. Current sections are all stacked the same direction.

### Interaction
- `TypingDesignSection` (typing-effect "Build a [design]" with cycling DesignCarousel images) is gone. This was a major brand moment + an accessible `aria-live="polite"` announcement.
- `LandingVideo` (autoplaying coffee-table assembly) is gone — replaced with a static grid-overlay diagram.
- Hero CTAs: legacy had one prominent "Buy a Grid Kit" button on a pink panel. Current has two equal-weight buttons ("Browse designs" + "What is grid beam?") — visual hierarchy is flatter.

### Copy
- Legacy headline "**Anyone can be a maker.**" + the "no experience needed" pull-out is warmer and more inviting than current's "Modular furniture, on a 40 mm grid."
- The 6-step "How to get started" icon-list (Browse → Plan → Buy → Cut → Assemble → Share) is gone. Replaced with a 3-card "For makers" grid that lists tools, not steps.
- Three testimonials (Rhona, Mix, Alexander) in pink boxes — gone.
- "A future without waste" sustainability messaging — gone.
- "A place to share ideas" section pointing at the community forum — gone.

### Code patterns
- Legacy has named layout primitives (`LandingSection`, `LandingRow`, `LandingColumn`) that enforce alternating row direction (`isEven ? 'row' : 'row-reverse'`) and uniform spacing across sections. Current inlines `Stack direction={{ base: 'column', lg: 'row' }}` per section — easier to drift out of consistency, no rhythm guarantee.

## Recommended mode

**Restore close to legacy.** This isn't a case where the legacy approach is broken — the legacy landing is a well-designed marketing page. The rebuild stripped it down to something simpler; we want it back.

Specifics:

1. Restore the hero `ImageCarousel` (4 images, autoplay). Use the same images via Cloudinary, now under the `gridbeam.xyz/...` path.
2. Restore the testimonials section (3 quotes). Wording can be re-verified with the user, but the structural element should return.
3. Restore the `TypingDesignSection` — the typing-effect "Build a [design]" with cycling carousel and `aria-live` announcement. The hook lives at `node-modules/apps/gridkit/hooks/useDesignTypingEffect.tsx`; port it.
4. Restore the coffee-table assembly video as `LandingVideo`. Source asset already in Cloudinary (`gridkit.nz/gridkit-coffee-table-website_bqmjpv`); needs to be re-hosted under `gridbeam.xyz/...`.
5. Restore the "How to get started" icon list (6 items, with `react-icons` glyphs). Adapt steps for non-commercial framing: drop "Buy a Grid Kit", add a step about finding a supplier instead.
6. Restore "A future without waste" sustainability section + image.
7. Restore "A place to share ideas" with the community forum CTA.
8. Keep the new "For makers" 3-card grid (cutting planner / suppliers / tools-and-resources) — appropriate replacement for the legacy's "Buy a Grid Kit" path.
9. Keep the new "Open and free to remix" section — fits the new framing and is worth preserving.
10. Re-introduce `LandingSection` / `LandingRow` / `LandingColumn` primitives (or equivalent) so the alternating row direction is enforced.

## Steps

- [ ] Port `useDesignTypingEffect` hook and `DesignCarousel` component from `node-modules/apps/gridkit/`. Cite source SHA in the new file's header comment per the [CLAUDE.md "Citing copied code" convention](../../CLAUDE.md#conventions).
- [ ] Build the `LandingSection` / `LandingRow` / `LandingColumn` primitives (or wire equivalents into `@villagekit/ui`).
- [ ] Re-host the four hero carousel images to `gridbeam.xyz/home/...` paths (via the `villagekit-media` workflow).
- [ ] Re-host the coffee-table assembly video (poster + mp4) to `gridbeam.xyz/home/...`.
- [ ] Rewrite `app/page.tsx` to follow the legacy section sequence, with the new "For makers" + "Open and free to remix" sections inserted in place of the e-commerce-specific ones.
- [ ] Verify visually at 375 / 768 / 1280 with `pnpm audit:pages` against the new home page.
- [ ] Re-test typing-effect's `aria-live` announcement with a screen reader (VoiceOver / NVDA).

## Notes
- The hero copy ("Anyone can be a maker." vs "Modular furniture, on a 40 mm grid.") is a brand-voice question. Worth confirming with the user before rewriting — both have merit, but the legacy is warmer and the current is more descriptive. Lean toward warmer.
- Testimonial wording is a content question; ask the user if the legacy quotes (from Rhona / Mix / Alexander) should be re-used as-is, lightly edited, or replaced with new quotes from the gridbeam.xyz era.
- "A future without waste" copy mentions "untreated New Zealand old pine" — that's a legacy-era detail. Generalise for the multi-supplier, international site (e.g. "untreated wood beams, intended to be reused again and again").

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/page.tsx`
- Legacy: `node-modules/apps/gridkit/pages/index.tsx` (551 lines — read end-to-end)
- Hook to port: `node-modules/apps/gridkit/hooks/useDesignTypingEffect.tsx`
- Components to port: `node-modules/apps/gridkit/components/{DesignCarousel,ImageCarousel,Testimonial,LandingSection,...}.tsx`
