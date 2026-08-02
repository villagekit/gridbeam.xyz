# 04 — Educational pages: about, FAQ, tools-and-resources

**Status:** DONE

## Why
The "explain the system" pages are the heart of an educational site. The legacy site has well-thought-out About and FAQ pages — they need adaptation, not invention from scratch.

## What
Three pages:
- `app/about/page.tsx` — six `<Section>` blocks: hero/intro, the 40 mm grid, parts (beams + panels + fasteners), how it goes together, where it came from, start building. Dashed-border placeholders for imagery until Stream 04.
- `app/faq/page.tsx` — Title h1 over four `<Accordion.Root>` collapsibles (The system, Lifespan and reuse, Suppliers, Other) with 20 entries total. Server-rendered, all `<Link>`s server-rendered with `target="_blank"` + `rel="noopener noreferrer"` on externals.
- `app/tools-and-resources/page.tsx` — three sections: hero, "Tools" (3 internal cards), "Resources" (5 cards: 3 internal + GitHub + forum). Uses a shared `ResourceCard` component.

Also: `app/_lib/nav.ts` updated — top-nav "Tools" now points at `/tools-and-resources` (was a stale `/tools` URL with no page).

## Steps

### About
- [x] Port `node-modules/apps/gridkit/pages/about.tsx` as a starting point. Strip `ui-brand` imports, swap to `@villagekit/ui` page primitives.
- [x] Rewrite copy from "Grid Kit's product" framing to "the grid-beam system" framing. Done inline rather than waiting for Stream 04 task 04 — copy is editable later.
- [ ] Update diagrams / Cloudinary images per Stream 04 task 02 — currently dashed-border placeholders.
- [x] Mention the historical roots (Phil Jergenson, 1970s open construction systems, Ken Isaacs lineage) — Section 4 "Where it came from" + repeated in hero subhead.

### FAQ
- [x] Port `node-modules/apps/gridkit/pages/faq.tsx`. Categories rewritten: **The system** (was Product), **Lifespan and reuse** (sustainability + recycle/repurpose), **Suppliers** (was Orders, fully rewritten), **Other**. Returns category dropped entirely (no e-commerce).
- [x] Replace order/return-specific Q&As with supplier-related ones: "How do I find a supplier?", "Why doesn't gridbeam.xyz sell parts?", "Can I make my own beams and panels?", "A supplier near me isn't listed. Can I add them?"
- [x] Use the `Accordion` component from `@villagekit/ui` v3 namespace API (`.Root` / `.Item` / `.ItemTrigger` / `.ItemContent` / `.ItemBody` / `.ItemIndicator`).

### Tools & resources
- [x] Port `node-modules/apps/gridkit/pages/tools-and-resources.tsx`. Replaced the legacy single-card `LinkCard`+`CardsLayout` with three `<Section>` blocks: hero intro + Tools (3 cards) + Resources (5 cards). No icons (kept the home-page card style for visual consistency).

## Notes
- **Categories on the FAQ.** First draft had two-question Sustainability and overlong Product. Renamed Product → "The system" (now 11 entries — what grid beam is, materials, durability, panels, add-ons, scope, modularity); Sustainability → "Lifespan and reuse" (2 focused entries on recycle/repurpose + waste-reduction argument). Suppliers + Other keep their counts.
- **Isaacs attribution.** Reviewer flagged that the explainer-draft TODO list still has "Confirm Ken Isaacs as co-developer vs. Phil's solo invention" open. Wording was softened on both pages: grid beam is "developed by Phil Jergenson in the 1970s, building on the open-construction work of Ken Isaacs" — defensible from Isaacs' *How to Build Your Own Living Structures* (1974, Harmony Books) plus Jergenson's later *Box Beam* / *How to Build with Grid Beam*, without overclaiming co-authorship.
- **Imagery.** Five dashed-border placeholders on /about (hero hidden via `aria-hidden`, the four explanatory ones use the same `accentB.50` style as the home-page hero). Cloudinary URLs from the legacy site (`cloudinary.com/villagekit/v1/gridkit.nz/...`) deliberately not ported — Stream 04 task 02 will re-host imagery under the gridbeam.xyz brand.
- **Server components throughout.** Accordion, Link, LinkButton are all `'use client'` in the lib, but FAQ entries (with embedded `<Link>` JSX) work fine being defined inside the server-component file because Next 15 handles the boundary.
- **External links.** EPA stats URL, github.com/villagekit/replicad-models, github.com/villagekit/gridkit-products, github.com/villagekit, discuss.villagekit.com — `discuss.villagekit.com` TLS is currently expired (tracked in `todo/04-content/01-rebrand-copy/url-status.md`); browsers will warn until renewed. Worth fixing before any of these pages get marketed.

## Verification
- `pnpm -w run typecheck` — clean.
- `pnpm -w run lint` — clean (Biome reformatted some long lines on first pass; re-checked clean).
- `pnpm -w run build` — `/about`, `/faq`, `/tools-and-resources` all generate as `○` (static prerender), alongside `/`.
- Dev server `pnpm dev` + curl per page:
  - `/about` HTTP 200, h1 "What is grid beam?" + 5 × h2 (sections) + 6 × h3 (cards) + 4 × h2 (footer columns). Metadata + OG/Twitter present.
  - `/faq` HTTP 200, h1 "Frequently asked questions" + 4 × h2 (categories with `id="faq-{slug}"` + `aria-labelledby` matching) + 4 × h2 (footer). 20 server-rendered Accordion items, all with `data-state="closed"`.
  - `/tools-and-resources` HTTP 200, h1 "Tools & resources" + 2 × h2 (Tools, Resources) + 8 × h3 (3 + 5 cards) + 4 × h2 (footer). External links to github.com + discuss.villagekit.com carry `target="_blank"` + `rel="noopener noreferrer"`.

## Follow-ups
- **Imagery (Stream 04 task 02).** Replace the five dashed-border placeholders on `/about` (hero hidden, grid-diagram, beams photo, panels photo, fasteners photo, tri-joint diagram).
- ~~**Home page Phelps detail.**~~ Stale as of 2026-08-03: the home page no longer carries that sentence at all (`app/page.tsx` was reworked in Stream 06), and the "Phelps" name was fabricated — see [../07-code-review/01-phelps-history.md](../07-code-review/01-phelps-history.md).
- **Real-browser visual QA at base/md/lg widths** — currently verified via SSR markup only, same as tasks 02 + 03. Roll into the Stream 05 pre-launch QA pass.
- **External-resources catalogue (deferred).** /tools-and-resources currently links to internal pages + GitHub + forum only. External resources worth adding once verified: Open Structures, *How to Build with Grid Beam* by Phil Jergenson, Richard Jergenson, and Wilma Keppel (book), Open Source Ecology references. Held back to avoid hallucinated URLs.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../02-ui-library/02-chakra-v3-migration.md](../02-ui-library/02-chakra-v3-migration.md) — for `Accordion` v3
- [../04-content/04-grid-beam-explainer.md](../04-content/04-grid-beam-explainer.md) — for About copy
