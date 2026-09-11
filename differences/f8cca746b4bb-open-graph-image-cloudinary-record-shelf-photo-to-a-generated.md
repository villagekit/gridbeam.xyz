---
title: "Open Graph image: Cloudinary record-shelf photo to a generated ImageResponse"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:50-56`: `images: [{ url: 'https://res.cloudinary.com/villagekit/image/upload/c_limit,dpr_auto,f_auto,fl_alpha,fl_lossy,w_1280,q_75/v1/gridkit.nz/made-with-grid-kit/record-shelf_x6zscs', alt: ... }]`.

## Current

`app/opengraph-image.tsx:1-36`: an `ImageResponse` drawing `CubeLogo` and text; `app/twitter-image.tsx:1` re-exports it. No `openGraph.images` in `app/layout.tsx`.

## Verdict

## Log
