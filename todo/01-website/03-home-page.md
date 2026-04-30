# 03 — Home page

**Status:** DONE

## Why
The home page is the introduction to grid beam for someone arriving cold. The legacy gridkit.nz home page has a strong structure (hero → what is it → carousel of designs → testimonials → stories → CTA) — we want the same skeleton with non-startup framing.

## What
`app/page.tsx` is six `<Section>` blocks composed from `@villagekit/ui` primitives (`Main`, `Section`, `Title`, `LinkButton`, `SimpleGrid`, etc.) — hero with non-buy CTAs, "What is grid beam?" with accurate framing (not just "40 mm"), designs preview (3 dashed-border placeholder cards until Stream 03 ships), tools+suppliers cards, stories preview (3 dashed-border placeholders until Stream 04), and a closing "Open and free to remix" section linking to GitHub + the newsletter.

## Steps
- [x] Hero section — tagline ("Modular furniture, on a 40 mm grid"), subhead, two CTAs ("Browse designs", "What is grid beam?"). No "Buy Grid Kit". Hero image is a dashed `accentB.50` placeholder until Stream 04 provides imagery.
- [x] "What is grid beam?" preview block — accurate framing (acknowledges the broader Phelps grid beam and that this site focuses on the 40 mm flavour). Links to `/about`.
- [x] Designs preview — three dashed-border placeholder cards labelled "A bed / A desk / A shelf" + "See the catalogue" CTA. Replaced when Stream 03 task 07 ships.
- [x] Stories preview — three dashed-border placeholder cards labelled "Story one / two / three" + "Read all stories" CTA. Replaced when Stream 01 task 05 ships real MDX stories.
- [x] Tools preview — folded into a "For makers" `SimpleGrid` with two `MakerCard`s: cutting planner + suppliers. Tools card links to `/tools/cutting-planner`.
- [x] Suppliers strip — folded into the same "For makers" grid as a card. Links to `/suppliers`.
- [ ] Footer testimonials — deferred. Decide in Stream 04 content audit; legacy quotes were startup-flavoured and need rewriting if kept.
- [x] Open Graph + Twitter card metadata via `export const metadata`. No custom OG image yet — Stream 04 follow-up.

## Notes
- **Section structure.** Each `<Section index={N}>` directly contains the section's content (Title + body). The lib's `Section` accepts free children — it asserts only on `.vk-row` descendants, so wrapping in an explicit `<Row index={0}>` is unnecessary unless you actually need a multi-column row layout (the hero and "For makers" sections use `<Stack>` / `<SimpleGrid>` instead, which is simpler).
- **No `chakra.span` highlight.** The hero's "40 mm grid" highlight uses `<Span color="primary.500" fontWeight="bold">` rather than `chakra.span` — the chakra factory Proxy fails the Server Component prerender step (returns undefined), but the explicit `Span` export works.
- **No Framer Motion typing animation.** Skipped — the legacy effect drove a designs carousel from the engine, and we don't have either yet. Re-evaluate after Stream 03 lands the catalog.
- **Accuracy on grid beam.** Don't claim "grid beam IS 40 mm" — that's the Grid Kit / villagekit choice. Original Phelps grid beam was 1.5″ on a four-bolt cycle. Hero and "What is grid beam?" both make that distinction explicit.
- **External links.** GitHub link uses `LinkButton isExternal`; the lib was patched to set `rel="noopener noreferrer"` automatically on external `LinkButton`s.
- **No imagery yet.** All photo/3D-render slots are dashed-border placeholders so a Stream 04 author can't miss them.

## Verification
- `pnpm -w run typecheck` — clean.
- `pnpm -w run lint` (top + lib) — clean.
- `pnpm -w run build` — generates `/` as a static page (`○ /`); SSR markup includes hero, all five Title h2s, OG/Twitter meta, skip-nav target.
- Dev server `pnpm dev` + `curl http://localhost:3000/` — HTTP 200, all expected headings/CTAs/links present, GitHub link has `target="_blank"` + `rel="noopener noreferrer"`. Heading order: 1 × h1, 5 × h2 (sections), 2 × h3 (MakerCards), 4 × h2 (footer columns).

## Follow-ups
- **Hero image** — replace placeholder with a real photo or 3D render (Stream 04).
- **OG image** — add a 1200×630 `og.png` featuring grid beam; reference from `metadata.openGraph.images` (Stream 04).
- **Designs carousel** — once Stream 03 task 07 (catalog) ships, swap the three placeholder cards for live design previews; consider porting the legacy typing animation.
- **Stories preview cards** — once Stream 01 task 05 lands real MDX stories, swap the three placeholders for the most recent three.
- **Footer testimonials / community quotes** — decide in Stream 04 content audit.
- **Visual QA in a real browser** at base/md/lg widths — paired with the same QA pass mentioned in task 02. Currently verified only via SSR markup inspection.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../04-content/01-rebrand-copy.md](../04-content/01-rebrand-copy.md) — for hero copy direction
