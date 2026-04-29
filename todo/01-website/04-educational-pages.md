# 04 — Educational pages: about, FAQ, tools-and-resources

**Status:** TODO

## Why
The "explain the system" pages are the heart of an educational site. The legacy site has well-thought-out About and FAQ pages — they need adaptation, not invention from scratch.

## What
Three pages:
- `app/about/page.tsx` — what is grid beam, the 40 mm grid, parts (beams, panels, fasteners), how it goes together
- `app/faq/page.tsx` — accordion-driven Q&A
- `app/tools-and-resources/page.tsx` — index card of the tools (cutting planner, designs catalog) and external resources (suppliers, references, history)

## Steps

### About
- [ ] Port `node-modules/apps/gridkit/pages/about.tsx` as a starting point. Strip `ui-brand` imports, swap to `@villagekit/ui` page primitives.
- [ ] Rewrite copy from "Grid Kit's product" framing to "the grid-beam system" framing. The Stream 04 rebrand audit produces the copy for this.
- [ ] Update diagrams / Cloudinary images per Stream 04 task 02.
- [ ] Mention the historical roots (Phil Jergenson, 1970s open construction systems) — adds credibility and reinforces it's not a single company's product.

### FAQ
- [ ] Port `node-modules/apps/gridkit/pages/faq.tsx`. Categories: Product, Sustainability, Orders → **Suppliers**, Returns → **drop or replace**, Other.
- [ ] Replace order/return-specific Q&As with supplier-related ones (e.g. "How do I find a supplier?", "Can I make my own?").
- [ ] Use the `Accordion` component from `@villagekit/ui` (Chakra v3 form).

### Tools & resources
- [ ] Port `node-modules/apps/gridkit/pages/tools-and-resources.tsx` — Cards layout linking to /tools/cutting-planner, /designs, /suppliers, plus external resources (e.g. Open Structures).

## Notes
- The legacy About page uses static Cloudinary images at `cloudinary.com/villagekit/v1/gridkit.nz/...` — those need re-hosting (Stream 04 task 02).
- Ideal flow: Stream 04 task 04 (grid-beam explainer rewrite) produces the new About copy; this task does the React/JSX wiring.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../02-ui-library/02-chakra-v3-migration.md](../02-ui-library/02-chakra-v3-migration.md) — for `Accordion` v3
- [../04-content/04-grid-beam-explainer.md](../04-content/04-grid-beam-explainer.md) — for About copy
