# First-pass parity findings

**Audit run:** 2026-05-04. Tooling: `pnpm audit:pages` (Stream 06 task 01). Routes captured at 375, 768, 1280 px against the legacy site (`https://gridkit-landing-villagekit.vercel.app`) and the local current site.

**Captures:** 24 routes × 3 widths × 2 sides = 144 PNGs in `audit/`. Index at `audit/index.html`. Done in three runs (initial sweep stopped on `/designs` networkidle timeout; design routes re-captured after script patch; `/suppliers` + `/store` captured separately when discovered missing).

**Method:** the per-page sections below were filled in cold from the side-by-side artifacts plus a code read of the relevant files. The five axes are scored at one of:

- ✅ **at parity or better** — nothing the legacy did better has been silently dropped
- ➖ **minor** — small issues worth listing but not load-bearing
- ⚠️ **regression** — clearly worse than legacy on this axis
- 🆕 **new and intentional** — added since legacy, evaluated on its own merits

Two changes show up on almost every page; they're called out in the [cross-cutting findings](#cross-cutting) section rather than repeated under each page.

**2026-08-03 correction:** the `/about` rows below originally praised the "Phelps/Isaacs history". "Phelps" was a fabricated name with no source in either legacy repo or externally; the real lineage is Ken Isaacs → Phil and Richard Jergenson. Mentions rewritten in place — see [`../../07-code-review/01-phelps-history.md`](../../07-code-review/01-phelps-history.md).

---

## Per-page audit

### `/` — Home

| Axis | Score | Notes |
|---|---|---|
| Visual | ⚠️ | Lost the pink hero panel + the alternating image-left/image-right rhythm. Current is uniform white→gray→white sections. Hero photo is a single static image vs legacy's 4-image carousel. |
| Interaction | ⚠️ | Lost the typing-effect "Build a [design name]" carousel — that was a major brand moment. Lost the autoplay image carousel. Lost the autoplaying coffee-table assembly video. |
| Accessibility | ➖ | Both fine on first pass; no axe runs done yet. The typing carousel had `aria-live="polite"` for SR users; that affordance is gone. |
| Copy | ⚠️ | Legacy headline "**Anyone can be a maker.**" + "Eco-friendly, adaptable, and fun for the whole family." was warmer. Current "Modular furniture, on a 40 mm grid." is descriptive but cold. The 6-step icon list "How to get started" has been replaced with a 3-card "For makers" grid — different shape, less inviting. The "A future without waste" sustainability message is gone. The "A place to share ideas" community CTA is gone. |
| Code | ⚠️ | Legacy has named section components (`LandingSection`, `LandingRow`, `LandingColumn`) that enforce alternating direction and uniform spacing. Current inlines `Stack direction={{ base, lg: 'row' }}` per section — works, but loses the rhythm guarantee and is harder to keep consistent. |
| **Recommended mode** | **Restore close to legacy.** Bring back: hero carousel, testimonials, typing-design carousel, "How to get started" icon-list, sustainability section, community section. Keep the new "For makers" cards (good fit for non-commercial framing) and "Open and free to remix" section. |
| Files | `app/page.tsx` (current) ↔ `node-modules/apps/gridkit/pages/index.tsx` (legacy) |
| Screenshots | `audit/_root/{375,768,1280}/` |

### `/about`

| Axis | Score | Notes |
|---|---|---|
| Visual | ➖ | Legacy was a tight vertical essay: large centered text + image, repeating. Current is a 6-section "marketing page" layout with `Title → Container → SimpleGrid` — competent but less coherent. The 3-card parts breakdown breaks the legacy's text-image-text-image rhythm. |
| Interaction | ✅ | Both static; no interactive content was lost. |
| Accessibility | ✅ | Both have appropriate heading order. Current's `Section` adds a `<section>` landmark; better than legacy. |
| Copy | 🆕 | Current adds Jergenson/Isaacs history ("Where it came from") and a "Start building" navigation block — both strong additions for a non-commercial educational site. Legacy's centered emphatic statements ("Grid Kit is a **modular system based on a 40mm grid**") have been absorbed into longer paragraphs; some of that punch is gone. |
| Code | ➖ | Current builds local `AboutPhoto`, `PartCard`, `NextStepCard` components inline in the file — fine, but each new section card pattern is essentially the same shape as the home page's `MakerCard`, `DesignThumb`, etc. Worth extracting a single shared `LinkCard` / `NavCard` later. |
| **Recommended mode** | **First-principles rethink** — partial. Keep the new content (Jergenson/Isaacs history, navigation cards) but restore some of the legacy's tight image-text-image visual rhythm in the middle sections. The legacy "essay" feel is the bit worth recovering. |
| Files | `app/about/page.tsx` ↔ `node-modules/apps/gridkit/pages/about.tsx` |
| Screenshots | `audit/about/{375,768,1280}/` |

### `/faq`

| Axis | Score | Notes |
|---|---|---|
| Visual | ➖ | Generous spacing — accordions have a lot of vertical air between items vs legacy's tighter rhythm. Section headings ("The system", "Lifespan and reuse") are smaller than the questions and read as labels rather than dividers. |
| Interaction | ✅ | Accordion behaviour matches (multiple open, collapsible). Both use the same Chakra accordion pattern. |
| Accessibility | ✅ | Categories are wrapped in `<section aria-labelledby="faq-…">`; the indicator is iconic. |
| Copy | 🆕 | Categories rewritten: legacy was Product / Sustainability / Orders / Returns & Support / Other; current is The system / Lifespan and reuse / Suppliers / Other. Appropriate for non-commercial — Orders/Returns gone, Suppliers added. Content is updated to match. |
| Code | ✅ | Clean: a `categories` array of `{ heading, slug, entries }`, mapped to `Accordion.Root multiple collapsible`. Direct port of the legacy structure. |
| **Recommended mode** | **Restore close to legacy on visual.** Tighten the accordion spacing to match legacy. Bump section heading weight/size so they read as dividers, not labels. Otherwise leave as-is. |
| Files | `app/faq/page.tsx` ↔ `node-modules/apps/gridkit/pages/faq.tsx` |
| Screenshots | `audit/faq/{375,768,1280}/` |

### `/contact`

| Axis | Score | Notes |
|---|---|---|
| Visual | 🆕 | Legacy had a single email card (CardsLayout). Current has Title + intro paragraph + 2-card grid (Email / GitHub Issues). The card chrome (rounded white box on gray section) is consistent with the rest of the site. |
| Interaction | ✅ | Both are static link cards. |
| Accessibility | ✅ | Both fine. |
| Copy | 🆕 | Significantly better: tells the user *which channel* to use (private vs public). Includes obfuscated email (current uses `ObfuscatedEmail` to defeat scrapers — legacy used a plain mailto). |
| Code | ✅ | Clean, reads top-down. `ObfuscatedEmail` is a good extraction. |
| **Verdict** | **At parity (improved).** No task. |
| Files | `app/contact/page.tsx` ↔ `node-modules/apps/gridkit/pages/contact.ts` (+ `node-modules/packages/applet-contact/src/pages/contact.tsx`) |
| Screenshots | `audit/contact/{375,768,1280}/` |

### `/subscribe`

| Axis | Score | Notes |
|---|---|---|
| Visual | 🆕 | Placeholder page — no signup form yet. Legacy had a fully wired Buttondown form (Preferred name, Email, Location, two open-ended questions, Subscribe button). |
| Interaction | ⚠️ | No form submission is wired up. Two link cards (Email the maintainer / Watch the repo) replace the form. |
| Accessibility | ✅ | Both fine. |
| Copy | 🆕 | Frames the missing form as deliberate ("No signup is wired up yet, and there's no audience pressure to rush one.") |
| Code | ✅ | Trivial placeholder with two cards. |
| **Verdict** | **Intentional placeholder, not a regression.** Tracked elsewhere — Buttondown integration is in-scope ("In scope but worth flagging" in CLAUDE.md). When the form ships, restore parity with legacy's field set (or a slimmer version). No Stream 06 task. |
| Files | `app/subscribe/page.tsx` ↔ `node-modules/apps/gridkit/pages/subscribe.tsx` (+ `node-modules/packages/applet-subscribe/src/page.tsx`) |
| Screenshots | `audit/subscribe/{375,768,1280}/` |

### `/tools-and-resources`

| Axis | Score | Notes |
|---|---|---|
| Visual | 🆕 | Legacy had a single card (cutting planner with scissors icon). Current has Tools (3 cards) + Resources (5 cards) properly sectioned. |
| Interaction | ➖ | Cards lost icons (legacy used `FaCut`); pure-text cards feel less inviting than icon+title combos. |
| Accessibility | ✅ | Both fine. |
| Copy | 🆕 | Significantly more content — appropriate hub for the site. |
| Code | ✅ | Clean: arrays of `CardEntry` rendered through `ResourceCard`. |
| **Verdict** | **At parity (improved).** Consider restoring per-card icons for visual richness. Folded into a small follow-up rather than a full uplift task. |
| Files | `app/tools-and-resources/page.tsx` ↔ `node-modules/apps/gridkit/pages/tools-and-resources.tsx` |
| Screenshots | `audit/tools-and-resources/{375,768,1280}/` |

### `/tools/cutting-planner`

| Axis | Score | Notes |
|---|---|---|
| Visual | ➖ | Layout shape is the same (Beams you want / Beams you have / Plan it). Current is slightly more spacious. |
| Interaction | 🆕 | Adds gu/mm unit toggle, URL-state encoding (share-by-link), explicit "top up with full-length beams" length picker. All improvements over legacy. |
| Accessibility | ✅ | Both fine on first pass; no axe run yet. |
| Copy | 🆕 | Adds an explanatory paragraph at top describing what the planner does. Better onboarding than legacy's terse "Use this tool to plan how to cut your beams into desired lengths." |
| Code | n/a | Internals not visually compared in this pass — trust the existing tests. |
| **Verdict** | **At parity (improved).** No Stream 06 task. |
| Files | `app/tools/cutting-planner/page.tsx` (+ `app/tools/cutting-planner/CuttingPlanner.tsx`) ↔ `node-modules/apps/gridkit/pages/tools/cutting-planner.tsx` |
| Screenshots | `audit/tools__cutting-planner/{375,768,1280}/` |

### `/legal`

| Axis | Score | Notes |
|---|---|---|
| Visual | ➖ | Cards lost icons (legacy had `FaUndo`/`FaLock`/`FaCookie` glyphs above each card title). |
| Interaction | ✅ | Static link cards on both. |
| Accessibility | ✅ | Both fine. |
| Copy | 🆕 | Legacy had Return policy / Privacy policy / Cookie policy. Current has Privacy policy / Site licence — appropriate (no e-commerce, no tracking). Adds a Questions section with email + GitHub link (good). |
| Code | ✅ | Clean. |
| **Verdict** | **At parity (improved on copy).** Restore card icons as a small follow-up. |
| Files | `app/legal/page.tsx` ↔ `node-modules/apps/gridkit/pages/legal.tsx` (+ applet) |
| Screenshots | `audit/legal/{375,768,1280}/` |

### `/legal/privacy-policy`

| Axis | Score | Notes |
|---|---|---|
| Visual | ✅ | Both are long-form text policies. |
| Interaction | ✅ | Static. |
| Accessibility | ✅ | Both fine. |
| Copy | 🆕 | Legacy was a long policy listing Google Analytics, Plausible, Mailchimp, Stripe, Buttondown. Current is shorter and accurate ("we collect almost nothing") — appropriate for non-tracking, non-commercial site. |
| Code | ✅ | Server-side `app/legal/privacy-policy/page.tsx`, content inline. |
| **Verdict** | **At parity (appropriate rewrite).** No task. |
| Files | `app/legal/privacy-policy/page.tsx` |
| Screenshots | `audit/legal__privacy-policy/{375,768,1280}/` |

### `/legal/cookie-policy` and `/legal/return-policy`

Removed. Site doesn't track and doesn't sell. Routes return 404 (correct). No task; no per-page section.

### `/stories`

| Axis | Score | Notes |
|---|---|---|
| Visual | ⚠️ | Filter chips at the top of the legacy index ("All / Guides / Inspiration / Newsletters") are gone. Card layout is similar (image, title, description, badge, date) but cards themselves lack the legacy's `HoverCardContainer` hover-shadow effect. |
| Interaction | ⚠️ | No category filtering. Legacy filter chips were a `radiogroup` with keyboard support. |
| Accessibility | ➖ | The legacy explicitly built a `menubar` with `aria-owns` for the filter chips; that whole interaction surface is gone. Current is just a plain grid. |
| Copy | ✅ | Both have "Build logs, field reports, and explainers from people working with grid beam." (current) vs "Discover all things Grid Kit in our collection of articles, guides, and newsletters." (legacy). Functionally equivalent. |
| Content | ⚠️ | Legacy index showed **12 stories** including external ones (Ken Isaacs interview, Modular Living build, Order the Metro, plus the Village Kit newsletters). Current shows only the **6 in-repo stories**. The external/inspiration stories are gone. |
| Code | ⚠️ | Current's `app/stories/page.tsx` is just a `SimpleGrid` of `StoryCard`. Legacy had `StoriesContextProvider`, `Filters`, `List` components, and a `category` filter via a `useStoriesContext` hook. The whole composition pattern is collapsed. |
| **Recommended mode** | **Restore close to legacy.** Add filter chips back (the data already supports `category`). Add external-story support back to the `StoryMetadata` type so we can re-add the inspiration links from the legacy site. The hover-card effect is a small bonus. |
| Files | `app/stories/page.tsx` + `app/_components/StoryCard.tsx` ↔ `node-modules/apps/gridkit/pages/stories.tsx` (+ `node-modules/apps/gridkit/components/stories/{filters,list,item}.tsx`) |
| Screenshots | `audit/stories/{375,768,1280}/` |

### `/stories/<slug>` (per-story pages)

| Axis | Score | Notes |
|---|---|---|
| Visual | ✅ | Same MDX content rendered with similar typography and image treatment. Title at top, date under, hero image, then body. Current uses `ContentMainTocLayout` (table of contents on the right) — a nice addition for long stories. |
| Interaction | 🆕 | TOC sidebar in current is new and helpful for the longer guides. |
| Accessibility | ✅ | `<article>` semantics on both. |
| Copy | ✅ | MDX is verbatim from `node-modules/apps/gridkit/pages/stories/*.mdx` (per repo notes). |
| Code | ✅ | Clean: `app/stories/[slug]/page.tsx` + per-slug MDX in `content/stories/`. |
| **Verdict** | **At parity (TOC is a nice bonus).** No per-story task. |
| Screenshots | `audit/stories__*/{375,768,1280}/` |

### `/designs`

| Axis | Score | Notes |
|---|---|---|
| Visual | ✅ | Almost a direct port: left sidebar (Categories), main column (search + grid), right sidebar (Sort by). Same 3-column card grid, same card chrome (image + name centered). |
| Interaction | 🆕 | Adds a search box (legacy had one too — at parity), debounced URL sync, layout-animated filtering via `motion/react`. URL state encoding (`?f=…&q=…&s=…`) is new and good. |
| Accessibility | ✅ | Filter and sort options are styled `radiogroup`s with keyboard support. The mobile breakpoint switches to native `<select>` for both — appropriate. |
| Copy | ✅ | Same category labels (Bedroom, Cats, Desk, Dining, Garage, Kids, …). |
| Code | ✅ | The `Catalogue<Tag extends string>` component is generic over the tag type and is well-factored. The split between `Catalogue` (client, with URL state) and `CatalogueStatic` (SSR fallback) is a nice pattern. |
| **Verdict** | **At parity (improved on URL state and animation).** No task. |
| Files | `app/designs/page.tsx` + `app/_components/catalogue/Catalogue.tsx` ↔ `node-modules/apps/gridkit/pages/designs/index.tsx` |
| Screenshots | `audit/designs/{375,768,1280}/` |

### `/designs/<slug>` (per-design pages)

Sampled `/designs/bed-frame`, `/designs/shelf-tower`, `/designs/5-12-13-triangle-desk`.

| Axis | Score | Notes |
|---|---|---|
| Visual | ✅ | 3D preview left, info panel right (title, description, preset selector, controls toggle, dimensions). Tabs below: Overview / Parts / Cutting plan. Same shape as legacy. Description placement is *better* in current (next to title rather than below tabs). |
| Interaction | ✅ | 3D viewer with rotate/zoom, parameter controls, tab navigation, cutting plan generation. Cuttings planner state encoded in URL. |
| Accessibility | ➖ | 3D content is inherently hard for SR; both rely on the description. |
| Copy | ✅ | Per-design `meta.label` and `meta.description` from `gridkit-products`. Same as legacy. |
| Code | ✅ | `DesignViewer` cleanly wraps `ProductProvider` + `CatalogueItem`. |
| **Verdict** | **At parity (improved description placement).** No task. |
| Files | `app/designs/[id]/page.tsx` + `app/_components/design/DesignViewer.tsx` ↔ `node-modules/apps/gridkit/pages/designs/[id].tsx` |
| Screenshots | `audit/designs__bed-frame/{375,768,1280}/`, `audit/designs__shelf-tower/...`, `audit/designs__5-12-13-triangle-desk/...` |

### `/suppliers` ↔ legacy `/store`

These compare structurally, not as direct route mirrors. Legacy `/store` was a product catalogue (3 SKUs: Grid Beams / Grid Fasteners / Starter Kit) wrapped in the same `Catalogue` chrome as `/designs` (filter sidebar Categories: All / Add-ons / Core / Tools, Sort sidebar, search, results count). Current `/suppliers` is a directory of supplier cards (Grid Kit NZ, Gridbeam Supply US) plus a "How to be listed" panel, with no cart and no filter UI.

| Axis | Score | Notes |
|---|---|---|
| Visual | n/a | Fundamentally different. Legacy ran the `Catalogue` 3-column shape (filter / grid / sort sidebars). Current is a 2-column SimpleGrid of supplier cards + a separate "How to be listed" section. |
| Interaction | n/a | Legacy had filter chips + add-to-cart on each product. Current has external links to each supplier site. |
| Accessibility | ✅ | Standard cards, semantic links. |
| Copy | n/a | Legacy was product copy (price, in-stock, etc.). Current copy explains the 40 mm vs Imperial split, what "compatible" means, and how a supplier can be listed. Appropriate for the non-commercial framing — the e-commerce surface was deliberately removed from this site. |
| Code | ✅ | `Supplier` data lives in `content/suppliers.ts`. Render is `SimpleGrid` of `SupplierCard`. Clean. |
| **Verdict** | **No parity baseline.** Replaces e-commerce with a directory — a deliberate, in-scope change per CLAUDE.md ("No e-commerce. The old store is replaced by a 'Suppliers' page that links out to any suppliers selling compatible hardware. Same browse mechanic as the old store, no cart / Stripe / checkout."). The legacy "browse mechanic" (filter + grid) is not reproduced because the supplier count is small enough that filtering would be premature. Revisit if the supplier directory grows past ~15 entries. No Stream 06 task. |
| Files | `app/suppliers/page.tsx`, `content/suppliers.ts` |
| Screenshots | `audit/suppliers/{375,768,1280}/{legacy,current}.png` (legacy returns 404 — current site only); `audit/store/{375,768,1280}/{legacy,current}.png` (current returns 404 — legacy site only) |

---

## Cross-cutting

These regressions show up on every page; they belong in their own task rather than being repeated under each page above.

### Footer

Legacy footer: 3 columns of links (Product / Policies / Company) + a social-media icon row + "Created with ♥ by Village Kit" slogan + © year. Current footer: 4 columns of links (Learn / Browse / Connect / Legal) + a single line of plain text ("gridbeam.xyz — open-source educational site about grid beam construction.").

- ⚠️ **Lost: social-media icon row** (Mastodon, Bluesky, Instagram, X, Facebook, Threads, YouTube, TikTok, GitHub, email).
- ⚠️ **Lost: "Created with ♥ by Village Kit" slogan**, with the heart-icon flourish.
- ⚠️ **Lost: copyright year**.
- 🆕 Added 4th column ("Legal") — fine.

Some of the lost social links may be intentional (e.g., the site doesn't have its own social presence yet), but the heart-slogan + copyright are pure visual/voice loss. Restore both. Make the social row optional / conditional on whether `socialLinks` are set in nav config.

### Header brand

Legacy header: cube logo + "Grid Kit" wordmark, with the cube as the brand mark on every page. Current header: just plain text "gridbeam.xyz" — no logo mark. Brand identity is significantly weaker.

- ⚠️ **Lost: brand mark** (the cube glyph).
- ⚠️ **Lost: typographic warmth of the "Grid Kit" wordmark** — "gridbeam.xyz" reads as a URL, not a name.

Two paths:
1. Build a new gridbeam.xyz cube/glyph mark (one-time design task).
2. Use the wordmark style only — "gridbeam" / ".xyz" with the .xyz in a different weight or colour to give it a typographic identity.

### Visual rhythm and palette

Cross-page observation: legacy uses pink and accent colours prominently (hero panel, badge backgrounds, button fills); current is dominated by alternating white / `colorPalette="gray"` sections with everything inside the cards or sections in white. The result is calmer but flatter.

Not necessarily a regression on a single page, but the *aggregate* feel of the site is greyer than the legacy. Worth flagging when picking a per-page palette.

---

## Likely follow-ups not yet captured by audit tooling

- **Hover/interaction states**: screenshots can't show hover, focus rings, transitions. Stories cards' hover-shadow, designs `transform: scale(1.05)` on filter chips, etc. — manual review needed.
- **Mobile menu (hamburger)**: not captured because the audit doesn't simulate the click. Both sides have one.
- **3D viewer interaction** on `/designs/<slug>`: not captured.
- **axe DevTools**: no automated a11y run; would need to add to the audit script as a follow-up.
- **Dark mode**: not captured — neither site appears to ship dark mode at present.
- **External-story comparison**: legacy `/stories` linked out to ~6 inspiration stories on third-party sites. Current does not. Need a decision on whether to bring those back (probably yes, with `external: true` flag in StoryMetadata).

---

## Per-page tasks created from this audit

See sibling files in `todo/06-design-parity/`:

- [03-home.md](../03-home.md) — restore hero richness and lost sections
- [04-about.md](../04-about.md) — restore visual rhythm in the middle sections
- [05-faq.md](../05-faq.md) — tighten spacing, strengthen section headings
- [06-stories-index.md](../06-stories-index.md) — restore filters and external stories
- [07-footer.md](../07-footer.md) — restore social row, slogan, copyright (cross-cutting)
- [08-header-brand.md](../08-header-brand.md) — restore brand mark / strengthen wordmark (cross-cutting)
- [09-icons-and-cards.md](../09-icons-and-cards.md) — small touchups (icons on Tools/Legal/Contact cards) (cross-cutting)
