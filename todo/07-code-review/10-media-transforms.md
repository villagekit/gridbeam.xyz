# 10 — Cloudinary video/media transforms + ui media components

**Status:** TODO

## Why

The site serves **untransformed full-resolution video** in two places, and locally reimplements media components `@villagekit/ui` already ships:

1. `app/_components/landing/LandingVideo.tsx:21,40-41` + `app/_lib/cloudinary.ts:28-31` (2026-08-03) — the video URL has no transformations (`.../video/upload/<src>.mp4`) and the poster is requested at width 2276. Legacy's `Video` (now upstream in ui — see `ui/src/components/media/url.ts:43-46`) applied `c_limit,dpr_auto,f_auto,w_640,q_60`; the legacy page displayed it at 356/622 px. Straight bandwidth regression on the landing page.
2. `app/_components/story/StoryVideo.tsx` (~line 39) — same untransformed-mp4 problem, worse sources (newsletter videos have ~6000 px originals), and no poster.
3. `app/_components/story/StoryImage.tsx` requires a manual `isInColumn` prop threaded through ~40 MDX call sites; legacy read it from context, and ui exports `useIsInColumn` (`ui/src/components/layouts/index.ts:4`). Per-call-site error surface the hook eliminates.

The comment in `app/_lib/cloudinary.ts` acknowledges the divergence ("different URL shape") — but the different shape is the regression, not a reason for it.

## What

Videos served with width/quality transforms appropriate to their rendered size (posters too); story media using ui's `Video`/`useIsInColumn` where they fit, or the local components fixed with a stated reason for staying local.

## Steps

- [ ] Verify the current state: load the landing page and a newsletter story with the network tab open; record actual video/poster transfer sizes. (This is also the before/after evidence for the fix.)
- [ ] Read what ui ships now: `Video`, `getCloudinaryVideoUrls`, `MediaProvider`, `useIsInColumn` (`../ui/src/components/media/`, `.../layouts/`). Check whether `MediaProvider` needs wiring in `app/layout.tsx` — the review noted the layout never mounts it.
- [ ] Preferred path: use ui's `Video` for both `LandingVideo` and `StoryVideo` (it already does poster + width-scaled transform). If the local wrappers stay (e.g. StoryVideo's MDX-facing props are genuinely different), add `w_<sensible>,q_60`-class transforms (`f_auto` where applicable) to `getCloudinaryVideoUrl` in `app/_lib/cloudinary.ts` — match the widths at which each video actually renders, not a guess.
- [ ] Add posters to story videos (ui's `Video` derives one; otherwise a `so_0` frame transform works).
- [ ] `StoryImage`: switch `isInColumn` to ui's `useIsInColumn` context and drop the prop from all MDX call sites (mechanical sweep across `content/stories/*.mdx`), IF the context provider fits the current MDX component tree — verify `StoryColumn`/`StoryRow` (or their ui equivalents) actually provide it. If not, record why and keep the prop.
- [ ] Re-measure transfer sizes; note before/after here.

## Notes

- Wiggle room: ui's media suite may have drifted since the fold-in; the *requirement* is transforms + posters, the *preference* is ui components. Either resolution is acceptable with a stated reason.
- Related finding for the same files: `app/_components/landing/LandingPhoto.tsx:26` uses `fill` with no `objectFit` — safe only while box ratio equals image ratio; add `objectFit: 'cover'` while in there (also listed in `./15-parity-nits.md`; do it wherever it's convenient, tick it in both).
- The custom next/image Cloudinary loader (`app/_lib/cloudinary-loader.ts`) handles *images* correctly — this task is about video URLs and the media component duplication.

## Depends on

- Nothing hard. If ui component changes are needed, same publish-coordination caveat as `./06-linkbutton-nextlink.md`.

## Files

- `app/_components/landing/LandingVideo.tsx`, `app/_components/story/StoryVideo.tsx`, `app/_components/story/StoryImage.tsx`, `app/_lib/cloudinary.ts`, `content/stories/*.mdx`
- ui reference: `../ui/src/components/media/`, `../ui/src/components/layouts/`
