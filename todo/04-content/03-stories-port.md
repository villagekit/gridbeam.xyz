# 03 — Port + update MDX stories

**Status:** DONE (port plan ready; placement deferred to Stream 01 task 05)

## Why
The legacy site has 5 MDX stories. They're well-written but need rebrand passes — every "Grid Kit" should be evaluated as either "the company" (rare) or "grid beam, the system" (most uses).

## What
Five updated `.mdx` files in the new site's `content/stories/` directory, with corrected framing and pointing at the new image paths.

## Steps
Per-story port plan with concrete diffs lives at `./03-stories-port/plan.md`. The audit (`01-rebrand-copy/audit.md`) reclassified `building-with-grid-kit.mdx` from REWRITE to KEEP-as-historical, so all 6 stories survive with light edits + editor's banners on the 3 historical pieces.

For each story:

- [x] **`whats-a-grid-unit.mdx`** — defines the 40 mm grid unit. Mostly system-focused already. Light edits. *(2 body tweaks + 1 aria-label.)*
- [x] **`building-with-grid-kit.mdx`** — KEEP as historical with editor's banner; slug stays. *(Reclassified per audit; rename optional.)*
- [x] **`how-to-cut-grid-beams.mdx`** — practical guide, system-focused. *(1 link edit; no /store CTAs in body.)*
- [x] **`how-to-furniture-bolts.mdx`** — practical guide, system-focused. *(3 "Grid Kit" → "grid beam" tweaks + 1 link edit.)*
- [x] **`2021-winter-newsletter.mdx`** — historical archive with editor's banner. *(No body rewrites; voice preserved.)*
- [x] **`2022-newsletter.mdx`** — same.

For each file:
- [-] Update `image` / `description` metadata to point at new image paths (after Stream 04 task 02). *(Cross-cutting find-and-replace plan included in port plan; deferred to placement.)*
- [-] Replace `<StoryImage>` `src` attributes. *(Same — deferred to placement.)*
- [x] Update internal links (`/store/...` → `/suppliers` or `/designs/...`). *(Verified — no /store links in any story body; only forum + landing-page links, both handled.)*
- [x] Re-read in full and check tone — does it sound like the community speaking, or the company? *(Two newsletters + building-with-grid-kit unmistakably 2021-Village-Kit voice; keeping them historical instead of laundering preserves the project's honest history.)*
- [-] Run prose through a spell-check / Grammarly pass. *(Deferred to placement.)*

## Notes
- The stories source: `node-modules/apps/gridkit/pages/stories/*.mdx`.
- Custom MDX components (`<StorySection>`, `<StoryRow>`, `<StoryColumn>`, `<StoryImage>`) need to exist in the new website (Stream 01 task 05). Plan also asks for a new `<StoryEditorialNote>` component for the historical banners.
- Consider adding an "Originally published" date and "Last updated" date for evergreen stories. *(Plan recommends an `originallyPublishedOn: 'gridkit.nz'` field on the 3 historical pieces.)*
- Four open items in the plan for Mikey (slug rename, forum HEAD-check, play.gridbeam.xyz status, editor-note styling).

## Depends on
- [./01-rebrand-copy.md](./01-rebrand-copy.md) (audit produces the change list)
- [./02-image-hosting.md](./02-image-hosting.md) (image paths)
