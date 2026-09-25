---
title: Site-local Cloudinary video URL builder and bespoke video components replace ui-media Video
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-media/src/video.tsx:22-67`: `Video` with `autoPlay loop muted playsInline`, a `poster`, `webm`, `mp4` and `ogv` sources and click-to-toggle; `:73-88` `getCloudinaryVideoUrls` (`c_limit,dpr_auto,f_auto,w_${width},q_60`, poster `...fl_alpha,fl_lossy,w_${width},q_60`).

## Current

`@villagekit/ui@1.2.0 src/components/media/Video.tsx:24-65` and `url.ts:36-53` carry the same component and builder, but nothing in `app/` uses them. `app/_lib/cloudinary.ts:9,19-31`: a different `getCloudinaryVideoUrl` (no transform string, no poster); `app/_components/story/StoryVideo.tsx:20-43`: `controls preload="metadata" playsInline`, `mp4` only; `app/_components/landing/LandingVideo.tsx:8,21,40-41`: `webm` and `mp4`, bypassing `MediaProvider`.

## Verdict

## Log

- 2026-09-12: The image transform string is identical on both sides (`url.ts:15-22`); only the video path drifted.

- 2026-09-26: Package half fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): the media context's cloud name defaults to villagekit (defaultCloudinaryName in src/components/media/context.tsx), so the ui Video and the mdx Video work with no MediaProvider mounted, as [[0efe45924dbe]] sanctions. The site half is the bump plan's ([[99f2fe62c62f]], its note from this slice): StoryVideo and LandingVideo onto the ui Video, getCloudinaryVideoUrl out of app/_lib/cloudinary.ts; probed here through the override, every rendered webm, mp4, ogv and poster URL returning 200 from Cloudinary.

- 2026-09-26: The landing video's site half is done by the page re-port (plan [[159c621d8a1a]]): app/_components/landing/LandingVideo.tsx is deleted and the home renders the ui Video from the published 1.2.0 through the mounted MediaProvider, app/HomePage.tsx:201-210 with legacy's sizes and :544-548 with the shared landingMediaCss (legacy pages/index.tsx:199-209,545-551); a probe on 2026-09-26 reads the video 200px tall at 375 and 350px at 768 and 1280, object-fit cover, radius 16px, as legacy's. What remains site-side is StoryVideo and the getCloudinaryVideoUrl it reads (the bump note's clauses 1 and 3).
