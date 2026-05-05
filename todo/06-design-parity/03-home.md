# 03 — Uplift: Home (`/`)

**Status:** DONE

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

- [x] Ported `useDesignTypingEffect` hook to `app/_components/landing/useDesignTypingEffect.ts`, citing the legacy source pinned to SHA `fce357d`. Dropped the lodash dep (inline Fisher–Yates) and narrowed the input type to the local `DesignIndexEntry` shape.
- [x] Built the `LandingSection` / `LandingRow` / `LandingColumn` primitives in `app/_components/landing/LandingSection.tsx`. Even sections render untinted, odd sections get the `gray` palette tint (matches legacy `colorScheme={isEven ? undefined : 'gray'}`). `LandingRow` enforces `column-reverse` at base (image-above-copy on mobile) and alternates `row` / `row-reverse` at lg by section index.
- [ ] **Deferred to follow-up:** re-host the 3 remaining hero-carousel images, the coffee-table video (poster + mp4), the sustainability forest image, and the community camp-kitchen image to `gridbeam.xyz/home/...` paths via the `villagekit-media` workflow. Currently referenced via the legacy `v1/gridkit.nz/...` paths on the same Cloudinary cloud (`villagekit`) — works in production today; the path rewrite lands once the masters are in `villagekit-media` and synced.
- [x] Built `ImageCarousel`, `LandingVideo`, `Testimonial`, and `TypingDesignSection` under `app/_components/landing/` (the carousel uses Framer Motion's `AnimatePresence` for slide cross-fades; the typing section uses Motion's `useInView` to pause the timer offscreen).
- [x] Rewrote `app/page.tsx` to follow the legacy section sequence (hero+testimonials → typing → modular kit + video → how-to-get-started → stories → sustainability → community), with the new "For makers" + "Open and free to remix" sections inserted at the end.
- [x] Verified visually at 375 / 768 / 1280 with snapshots in `/tmp/home-shots/`. Layout collapses to single column with image-above-copy at base, alternating row direction at lg, with gray-tinted odd sections.
- [ ] **Deferred to follow-up:** re-test typing-effect's `aria-live` announcement with a screen reader (VoiceOver / NVDA). Manually verified the markup contains a `<VisuallyHidden aria-live="polite" aria-atomic="true">` region naming the current design.

## User decisions (locked in)
- **Hero copy:** "Anyone can be a maker." (the legacy line). Warmer beats descriptive.
- **Testimonials:** restore the legacy Rhona / Mix / Alexander quotes, lightly edited — replace "Grid Kit" with "Grid Beam" inside each quote so the quote text fits the rebranded site.
- **Sustainability copy:** replace the legacy "untreated New Zealand old pine" with "Locally-sourced untreated wood, intended to be reused" — keeps the locality framing without naming a country.
- **"How to get started" 6th step:** "Find a supplier, or make your own." (links to /suppliers; covers the DIY-fabrication path too.)
- **Restore everything from the legacy home:** Hero `ImageCarousel` (4 rotating images), `TypingDesignSection` (typing-effect "Build a [design]" + cycling carousel + `aria-live`), `LandingVideo` (coffee-table assembly), and the "A place to share ideas" community section pointing at discuss.villagekit.com. All four are confirmed in scope.

## Notes
- The legacy `Carousel` was based on `react-responsive-carousel`; rebuilt locally on Framer Motion's `AnimatePresence` so we don't pull in a maintenance burden for one component.
- The legacy `useDesignTypingEffect` depended on `framer-motion` (`useInView`) and `lodash-es` (`shuffle`) and `pluralize-esm`. We already use Motion in the bundle, so kept `useInView`. Replaced `shuffle` with an inline Fisher–Yates and the `pluralize` lookup with a regex-based check (`/(s|x|ch|sh|ss)$/i` minus `(us|is|sis)$/i` exceptions) — sufficient for our ~36-design label set.
- `Testimonial` is `'use client'` because `BlockSection` from `@villagekit/ui` takes the icon as a function reference (`Icon: ComponentType`); RSC can't pass function refs across the boundary, so the wrapping component has to render on the client.
- Hero uses a plain `Stack` (text-then-carousel at base) rather than `LandingRow` (image-then-copy at base). The brand promise — "Anyone can be a maker." — should be the first thing a mobile reader sees; visual context follows.
- Image assets for 3 of the 4 hero-carousel slides, the coffee-table video, the forest, and the camp-kitchen are still referenced at the legacy `v1/gridkit.nz/...` Cloudinary paths. Re-hosting them under `gridbeam.xyz/home/...` is left as a follow-up task — see Steps. The paths work today on the same Cloudinary cloud (`villagekit`), so the page renders correctly without the re-host.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/page.tsx`, `app/_components/landing/{ImageCarousel,LandingSection,LandingVideo,Testimonial,TypingDesignSection,useDesignTypingEffect,index}.{tsx,ts}`
- Legacy reference: `node-modules/apps/gridkit/pages/index.tsx`, `node-modules/apps/gridkit/hooks/useDesignTypingEffect.tsx`, `node-modules/apps/gridkit/components/{carousel,image-carousel,testimonial}.tsx` (pinned to SHA `fce357d`)
