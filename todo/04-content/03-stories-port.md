# 03 — Port + update MDX stories

**Status:** TODO

## Why
The legacy site has 5 MDX stories. They're well-written but need rebrand passes — every "Grid Kit" should be evaluated as either "the company" (rare) or "grid beam, the system" (most uses).

## What
Five updated `.mdx` files in the new site's `content/stories/` directory, with corrected framing and pointing at the new image paths.

## Steps
For each story:

- [ ] **`whats-a-grid-unit.mdx`** — defines the 40 mm grid unit. Mostly system-focused already. Light edits.
- [ ] **`building-with-grid-kit.mdx`** → rename to `building-with-grid-beam.mdx`. Heavier edits — the title, copy, examples all reference the company.
- [ ] **`how-to-cut-grid-beams.mdx`** — practical guide, system-focused. Update CTAs that point to "/store" → "/suppliers" or "/designs".
- [ ] **`how-to-furniture-bolts.mdx`** — practical guide, system-focused. Light edits.
- [ ] **`2021-winter-newsletter.mdx`** — historical. Decide: keep as a "company history" archive, or drop. If keeping, frame as "From the archives".
- [ ] **`2022-newsletter.mdx`** — same.

For each file:
- [ ] Update `image` / `description` metadata to point at new image paths (after Stream 04 task 02).
- [ ] Replace `<StoryImage>` `src` attributes.
- [ ] Update internal links (`/store/...` → `/suppliers` or `/designs/...`).
- [ ] Re-read in full and check tone — does it sound like the community speaking, or the company?
- [ ] Run prose through a spell-check / Grammarly pass.

## Notes
- The stories source: `node-modules/apps/gridkit/pages/stories/*.mdx`.
- Custom MDX components (`<StorySection>`, `<StoryRow>`, `<StoryColumn>`, `<StoryImage>`) need to exist in the new website (Stream 01 task 05).
- Consider adding an "Originally published" date and "Last updated" date for evergreen stories.

## Depends on
- [./01-rebrand-copy.md](./01-rebrand-copy.md) (audit produces the change list)
- [./02-image-hosting.md](./02-image-hosting.md) (image paths)
