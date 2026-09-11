---
title: landingMediaSx removed; LandingPhoto and LandingVideo duplicate their styles
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:528-551` one `landingMediaSx(isMobile)` spread into `LandingImage` and `LandingVideo`.

## Current

`app/_components/landing/LandingPhoto.tsx:18-25` and `LandingVideo.tsx:24-30` each declare `borderRadius="xl" boxShadow="md" overflow="hidden"` and an `aspectRatio` box.

## Verdict

## Log

- 2026-09-12: The height change is the visual item; the video's sources and transforms are the shell item [[b397b0deb1cc]].
