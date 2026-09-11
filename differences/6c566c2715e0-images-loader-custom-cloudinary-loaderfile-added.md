---
title: "images.loader: custom Cloudinary loaderFile added"
status: open
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/next.config.mjs` sets no `images`; `packages/ui-media/src/image.tsx:162-203` passes a Cloudinary `loader` to each `next/image`.

## Current

`next.config.ts:23-26`: `images: { loader: 'custom', loaderFile: './app/_lib/cloudinary-loader.ts' }`; `app/_lib/cloudinary-loader.ts:1-19`.

## Verdict

## Log
