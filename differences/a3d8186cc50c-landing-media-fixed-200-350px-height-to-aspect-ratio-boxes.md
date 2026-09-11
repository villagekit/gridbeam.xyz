---
title: "Landing media: fixed 200/350px height to aspect-ratio boxes"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:528-551` `landingMediaSx`: `height: isMobile ? 200 : 350, objectFit: 'cover'` on the video and both photos; `:204-208` the video's `356px`/`622px` sizes chosen for those heights.

## Current

`app/_components/landing/LandingVideo.tsx:24-29` and `LandingPhoto.tsx:18-27` `aspectRatio={width / height}` boxes that grow with the column; taller media in `audit/_root/1280/current.png`.

## Verdict

## Log
