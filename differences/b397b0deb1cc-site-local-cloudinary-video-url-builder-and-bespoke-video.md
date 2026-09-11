---
title: Site-local Cloudinary video URL builder and bespoke video components replace ui-media Video
status: regression
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
