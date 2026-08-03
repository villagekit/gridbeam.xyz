# 04 — Restore missing photo in how-to-cut-grid-beams

**Status:** DONE

## Why

Legacy `how-to-cut-grid-beams` (at `../node-modules` **origin/main** — the story doesn't exist at the stale on-disk checkout, see stream README point 4) has a row "3D printing a custom cut alignment tool" showing a photo: Cloudinary ID `v1/gridkit.nz/stories/how-to-cut-grid-beams/3d-printing-custom-cut-alignment-tool_e5qh92` (4864×3648). That photo was never synced to the new `gridbeam.xyz/...` Cloudinary path, and instead of fixing the sync, the port substituted the *Replicad screenshot* — so the published story now shows **the identical image twice in consecutive rows** (`content/stories/how-to-cut-grid-beams.mdx:324-331` and `:349-356` as of 2026-08-03).

## What

The original photo re-hosted through the media pipeline and restored in row 3 with its original alt text ("3D printing a custom cut alignment tool."); the Replicad screenshot remains only in its own row.

## Steps

- [x] Confirm the duplicate still exists: open `content/stories/how-to-cut-grid-beams.mdx` and check whether two nearby rows reference the same `cut-alignment-tool-in-replicad` asset.
- [x] Confirm the legacy asset still resolves: the review verified `https://res.cloudinary.com/villagekit/image/upload/v1/gridkit.nz/stories/how-to-cut-grid-beams/3d-printing-custom-cut-alignment-tool_e5qh92` returned 200 on 2026-08-03. Download the original (highest quality, no transforms).
- [x] Add it to the media repo at `../villagekit-media/media/gridbeam.xyz/stories/how-to-cut-grid-beams/` following that directory's existing naming pattern (15 files there as of the review — match their conventions; the media repo is LFS-tracked).
- [x] Run `pnpm sync-media` from inside `../villagekit-media` (see its README / `todo/04-content/02-image-hosting.md` for the pipeline).
- [x] Update the MDX row to reference the new asset ID with the legacy alt text; verify the rendered story shows two *different* images.
- [x] Commit media repo and this repo separately (they're separate git repos).

## Notes

- Finding reproduced exactly as filed: rows 3 and 4 both pointed at `cut-alignment-tool-in-replicad`.
- The legacy Cloudinary asset was still live. The download is **byte-identical to the original master** — local `md5sum` equals Cloudinary's etag `78a5346596b60ea0f31fbdab95828e37` — so no re-encode was involved. 4864×3648 JPEG, 5.9 MB, EXIF intact (Sony ZV-1, 2024-11-25).
- Restored row 3 matches legacy exactly: original alt text, `width={4864} height={3648}`, and **no** `aspectRatio` prop (legacy row 3 omitted it; only row 4 sets `aspectRatio={null}`).
- Media-inventory cross-check went beyond file lists this time: every `gridbeam.xyz/...` asset ID referenced anywhere in `content/` + `app/` (129 refs) now has a master in the media repo, and every master is referenced. Clean bijection, no other gaps.
- Prose re-diff of this story vs legacy `origin/main` is clean — only the sanctioned rebrand edits. One wording change worth noting for task 11: legacy "visit the Grid Kit [discussion board]" → current "visit the [community forum]" (same URL). Reads as intentional de-branding, not a regression.
- The legacy checkout was already at `origin/main` (`fce357d2`), so stream README point 4's "checked out at 917daacb" note is stale.

### Sync-script bug found and fixed (`../villagekit-media`)

`sync-media.ts` probed each asset with a `HEAD` request. Cloudinary's CDN **negatively caches the HEAD variant**, so the 404 the script gets while probing a not-yet-uploaded asset is served back on the next run — meaning every newly added asset reported `(new)` and re-uploaded on every sync, forever. Confirmed against this asset: Node `fetch` HEAD → 404 (`server-timing: desc=hit`) while GET → 200 with the correct etag. (`curl -I` returned 200, which is why the quirk went unnoticed — its cache key differs.)

Fixed by probing with a single-byte ranged GET (`Range: bytes=0-0`) instead, which shares a cache key with real traffic and still returns the etag: real assets give `206` + etag, genuine misses still `404`. Sync now converges to `uploaded=0 skipped=114 failed=0`.

### Doc drift spotted (for task 14)

The media repo is checked out at `../villagekit-media`, not `../media` as CLAUDE.md and several task files claim. Same shape for `../gridkit-products` vs the documented `../products`. Left for task 14's doc-drift sweep rather than fixed piecemeal here.

## Depends on

- Updated `../node-modules` checkout (stream README point 4) for the legacy comparison.
- `../villagekit-media` sibling checkout with Cloudinary credentials for `pnpm sync-media`.

## Files

- `content/stories/how-to-cut-grid-beams.mdx`
- `../villagekit-media/media/gridbeam.xyz/stories/how-to-cut-grid-beams/`
- `../villagekit-media/scripts/sync-media.ts`
