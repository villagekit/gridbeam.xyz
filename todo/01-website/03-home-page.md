# 03 — Home page

**Status:** TODO

## Why
The home page is the introduction to grid beam for someone arriving cold. The legacy gridkit.nz home page has a strong structure (hero → what is it → carousel of designs → testimonials → stories → CTA) — we want the same skeleton with non-startup framing.

## What
An `app/page.tsx` that:
1. Hooks the visitor with a clear hero ("a 40 mm grid system for building furniture")
2. Shows examples of what people have built (designs carousel)
3. Links into the deeper content (about, stories, designs catalog)
4. Replaces the old "Buy a Grid Kit" CTA with "Find a supplier" or "Build your own"

## Steps
- [ ] Hero section: tagline + subhead + a striking image. Replace "Buy Grid Kit" CTA with "Find suppliers" or "Browse designs".
- [ ] "What is grid beam?" preview block linking to /about.
- [ ] Designs carousel — pulls from the engine's design catalog (Stream 03 task 07). Until that's ready, stub with static images.
- [ ] Stories preview — show 3 most recent MDX stories with hero image + title.
- [ ] Tools preview — link to /tools/cutting-planner.
- [ ] Suppliers strip — "Where to get parts" section linking to /suppliers.
- [ ] Footer testimonials — port from legacy or replace with community quotes (decide in Stream 04 content audit).
- [ ] Open Graph + Twitter card for the home page (custom image, ideally featuring grid beam).

## Notes
- Legacy reference: `node-modules/apps/gridkit/pages/index.tsx`. Look at its component composition (`<Section>`, `<Row>`, `<Column>` from `ui-page`) — those primitives are coming into `@villagekit/ui` via Stream 02 task 03.
- The legacy hero has a Framer Motion animation ("Build a [bed/desk/shelf]" cycling word). Copy the effect if it still feels right; or simplify.
- Don't link to gridkit.nz anywhere in the copy.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../04-content/01-rebrand-copy.md](../04-content/01-rebrand-copy.md) — for hero copy direction
