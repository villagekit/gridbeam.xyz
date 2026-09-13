---
title: "images.loader: custom Cloudinary loaderFile added"
status: sanctioned
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/next.config.mjs` sets no `images`; `packages/ui-media/src/image.tsx:162-203` passes a Cloudinary `loader` to each `next/image`.

## Current

`next.config.ts:23-26`: `images: { loader: 'custom', loaderFile: './app/_lib/cloudinary-loader.ts' }`; `app/_lib/cloudinary-loader.ts:1-19`.

## Verdict

rule: upgrade (4).

## Log

- 2026-09-13: 2026-09-13: Reviewed `app/_lib/cloudinary-loader.ts` and `app/_lib/cloudinary.ts` for complexity per the operator's request: both are small, single-purpose, and well-commented (the loader's header explains why it can't be a client component or use context). No changes needed.
