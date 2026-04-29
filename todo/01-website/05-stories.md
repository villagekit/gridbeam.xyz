# 05 — MDX stories / guides

**Status:** TODO

## Why
The legacy site has 5 well-written MDX stories that explain how to use the system: cutting beams, using furniture bolts, what a grid unit is, building with grid kit, plus two newsletters. These are exactly the kind of educational content the new site exists for.

## What
- `app/stories/page.tsx` — listing of all stories with hero image + title + date
- `app/stories/[slug]/page.tsx` — individual story page rendered from MDX, with table of contents, prev/next, share links
- A `content/stories/` (or similar) directory with `*.mdx` files, each exporting metadata (title, description, publishedAt, image)

## Steps
- [ ] Decide MDX strategy for app router: `@next/mdx` with file-based pages (simpler) vs. `contentlayer` / `next-mdx-remote` for explicit metadata + frontmatter (more flexible). Recommend `@next/mdx` + an exported `metadata` const in each `.mdx` (matches the legacy pattern).
- [ ] Set up MDX components map at `mdx-components.tsx` using the overrides folded in from `ui-mdx` (Stream 02 task 06): `a`, `h1-5`, `p`, `ul`, `ol`, `li`, `blockquote`.
- [ ] Add custom MDX components: `<StorySection>`, `<StoryRow>`, `<StoryColumn>`, `<StoryImage>` (legacy versions live in `node-modules/apps/gridkit/components/story/`).
- [ ] Port the 5 stories from `node-modules/apps/gridkit/pages/stories/*.mdx`:
  - `whats-a-grid-unit.mdx`
  - `building-with-grid-kit.mdx`
  - `how-to-cut-grid-beams.mdx`
  - `how-to-furniture-bolts.mdx`
  - `2021-winter-newsletter.mdx`, `2022-newsletter.mdx`
- [ ] Rebrand each story per Stream 04 task 03 — references to "Grid Kit" become "grid beam" where the system is meant; references to the company stay as-is.
- [ ] `app/stories/page.tsx` — auto-discover stories from disk (glob `content/stories/*.mdx`), sort by `publishedAt` desc.
- [ ] Story page: render with table-of-contents (use `usePageHeadingsTree` hook from `ui-page`).
- [ ] OG image per story (use the `image` metadata or a generated one).

## Notes
- Two of the five stories are newsletters tied to specific years — decide whether to keep them as historical or roll their content into evergreen pages. Suggest: keep as historical, label clearly.
- The "building-with-grid-kit" story name itself references the company; rename the slug to `building-with-grid-beam.mdx`.
- Story images currently live on Cloudinary — Stream 04 task 02 governs re-hosting.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../02-ui-library/06-fold-ui-mdx.md](../02-ui-library/06-fold-ui-mdx.md)
- [../04-content/03-stories-port.md](../04-content/03-stories-port.md)
