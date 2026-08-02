# 04 — Restore missing photo in how-to-cut-grid-beams

**Status:** TODO

## Why

Legacy `how-to-cut-grid-beams` (at `../node-modules` **origin/main** — the story doesn't exist at the stale on-disk checkout, see stream README point 4) has a row "3D printing a custom cut alignment tool" showing a photo: Cloudinary ID `v1/gridkit.nz/stories/how-to-cut-grid-beams/3d-printing-custom-cut-alignment-tool_e5qh92` (4864×3648). That photo was never synced to the new `gridbeam.xyz/...` Cloudinary path, and instead of fixing the sync, the port substituted the *Replicad screenshot* — so the published story now shows **the identical image twice in consecutive rows** (`content/stories/how-to-cut-grid-beams.mdx:324-331` and `:349-356` as of 2026-08-03).

## What

The original photo re-hosted through the media pipeline and restored in row 3 with its original alt text ("3D printing a custom cut alignment tool."); the Replicad screenshot remains only in its own row.

## Steps

- [ ] Confirm the duplicate still exists: open `content/stories/how-to-cut-grid-beams.mdx` and check whether two nearby rows reference the same `cut-alignment-tool-in-replicad` asset.
- [ ] Confirm the legacy asset still resolves: the review verified `https://res.cloudinary.com/villagekit/image/upload/v1/gridkit.nz/stories/how-to-cut-grid-beams/3d-printing-custom-cut-alignment-tool_e5qh92` returned 200 on 2026-08-03. Download the original (highest quality, no transforms).
- [ ] Add it to the media repo at `../media/media/gridbeam.xyz/stories/how-to-cut-grid-beams/` following that directory's existing naming pattern (15 files there as of the review — match their conventions; the media repo is LFS-tracked).
- [ ] Run `pnpm sync-media` from inside `../media` (see `../media` README / `todo/04-content/02-image-hosting.md` for the pipeline).
- [ ] Update the MDX row to reference the new asset ID with the legacy alt text; verify the rendered story shows two *different* images.
- [ ] Commit media repo and this repo separately (they're separate git repos).

## Notes

- Wiggle room: if the legacy Cloudinary asset has since been deleted, check `../media/media/` for a source image under any gridkit-era path, or ask Mikey — they may have the original photo. Don't ship a stock substitute.
- While in the file: this story was one of the three only present at legacy origin/main. A quick prose re-diff against the updated checkout is cheap insurance that nothing else was papered over the same way (the review's media-inventory check found only this one gap, but it compared file *lists*, not every asset reference).

## Depends on

- Updated `../node-modules` checkout (stream README point 4) for the legacy comparison.
- `../media` sibling checkout with Cloudinary credentials for `pnpm sync-media`.

## Files

- `content/stories/how-to-cut-grid-beams.mdx`
- `../media/media/gridbeam.xyz/stories/how-to-cut-grid-beams/`
