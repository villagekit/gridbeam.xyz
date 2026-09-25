---
title: "ui mdx and media: the BlockSection blockquote, MediaContainer, the mdx Image and Video, legacy's default cloud name"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by: 1c74a465996d
tags:
  - "worker:fable"
priority: medium
---
The package's mdx module renders blockquotes as legacy's `BlockSection` stack (the shadow, padding 4 by 2, `Text variant="secondary"`) and exports `MediaContainer`, `Image` and `Video` for story MDX as `ui-mdx` did; the media components take legacy's cloud name as their default so a site need not mount `MediaProvider`, and the site's video components move onto the ui `Video` at the bump. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `28c1a536`.

## Work

- Legacy source: `../node-modules/packages/ui-mdx/src/{blockquote,MediaContainer,Image,Video,index}.tsx`, `packages/ui-page/src/components/BlockSection.tsx` and `packages/ui-media/src/video.tsx:73-88` (the cloud name `villagekit` hard-coded) at `fce357d`. Current: `../ui/src/mdx/{blockquote,index}.tsx`, `src/components/layouts/BlockSection.tsx` (already ported), `src/components/media/{Image,Video,context}.tsx`; on the site `app/_lib/cloudinary.ts:9,19-31`, `app/_components/story/StoryVideo.tsx`, `app/_components/landing/LandingVideo.tsx`.
- `f9b9ec72d771`: `MdxBlockquote` renders `<BlockSection Icon={FaQuoteRight}>`, an `HStack` exposed as a paragraph, with legacy's `boxShadow: sm`, padding and secondary text; the current `<blockquote>` element and its own padding go.
- `d750c0a47839`: `MediaContainer` (a `Center` at `maxW` md and lg by breakpoint), `Image` and `Video` wrapping the media components with the container's breakpoints as `sizes`, exported from `@villagekit/ui/mdx` beside `mdxComponents`, on the framework boundary slice's image mechanism; the stories' consumption is the story pages record's.
- Sibling steps (decision `28c1a536`): the change lands in `../ui` (`src/...`, and `stories/` where a story renders the component), verified there by `pnpm lint`, `pnpm types` and `pnpm build:pkg`, committed there by pathspec (`git -C ../ui add <paths>` then `git -C ../ui commit -- <paths>`, the message citing the legacy source by its SHA-pinned URL where code is ported) and not pushed; seen on this site through an uncommitted override (`pnpm.overrides` `"@villagekit/ui": "link:../ui"` in `package.json`, then `pnpm install`; the sibling's top-level `exports` point at `src/`, so no build is needed for the override), reverted by path before the commit here (`git restore -- package.json pnpm-lock.yaml`, then `pnpm install --frozen-lockfile`) so the commit never carries it; each item this slice closes moves to `upstream` (`kipu move <id> upstream --from regression`) with a note citing the sibling commit; then `kipu relate 99f2fe62c62f blocked_by <this slice>`. The package version stays: the publish is the operator's.
- `b397b0deb1cc` and `0efe45924dbe`: the media context's default cloud name becomes `villagekit`, legacy's hard-coded value, `MediaProvider` staying as the override for another cloud, so the site's sanctioned choice not to mount it (`0efe45924dbe`, the operator's confirmed verdict) holds while `Video` and `Image` work. The site's swap is the bump's: `kipu note 99f2fe62c62f` with the edits: `StoryVideo` and `LandingVideo` render the ui `Video` (`autoPlay loop muted playsInline`, the poster, webm, mp4 and ogv sources, click to toggle) with the props legacy's call sites passed (`title`, `sizes`, `aspectRatio`, `orientation`), and `getCloudinaryVideoUrl` with its header comment leaves `app/_lib/cloudinary.ts`; the wrapping boxes are the home and stories records' items. Probe the swap here through the override (the site edits made, verified, reverted with the override): every resulting webm, mp4, ogv and poster URL for the site's public ids (`gridbeam.xyz/...`, the builder prepending `v1/`) returns 200 from Cloudinary; a format Cloudinary does not serve for a re-hosted asset goes in the note, not around.
- Verify on this site through the override on `/stories/how-to-cut-grid-beams` (a tip blockquote) at 1280 against `audit/stories__how-to-cut-grid-beams/1280/legacy.png`, and the two probed video pages.
- Closes (to `upstream`) `f9b9ec72d771`, `d750c0a47839`, `b397b0deb1cc` (its site half at the bump; the note says so).
- Not this slice: the stories' own media call sites (the story pages record); the video boxes' radius, shadow and the stories' `controls` (the home and stories records' items).

## Seams under test

None pure.

## Done when

- with the override in place: the tip on `/stories/how-to-cut-grid-beams` is exposed as a paragraph (no `blockquote` node in the extracted tree) inside a shadowed dashed box matching the legacy capture; `grep -c "MediaContainer\|Image\|Video" ../ui/src/mdx/index.ts` is at least 3; with the video swap probed, `curl -s localhost:3000/ | grep -o '<video[^>]*>'` shows `autoplay`, `loop`, `muted`, `playsinline` and a `poster` with three `<source>` children whose URLs return 200, and no `MediaProvider` is mounted (`grep -rn MediaProvider app` empty); the probe and the override then reverted
- in `../ui`: `pnpm lint`, `pnpm types` and `pnpm build:pkg` are green and the commit there is by pathspec, its hash in each item's note
- the three items are `upstream`, `99f2fe62c62f` is `blocked_by` this slice and carries the bump note, checked after the moves
- `timeout 900 just check` is green on this site, without the override

## Outcome

## Log
