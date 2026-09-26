---
title: "Linked story covers: the .jpg suffix on the four Cloudinary public IDs dropped"
status: fixed
route: /stories
axis: code
kind: changed
---

## Legacy

`apps/gridkit/stories.ts:41,57,73,89` write each linked cover's `src` with its `.jpg` suffix: `v1/gridkit.nz/stories/linked-articles/grid-beam-modular-system-builds-anything-furniture-to-bikes_dlfnrf.jpg` and the three others; `packages/ui-media/src/image.tsx:211-221` appends the public ID to the transformations unchanged.

## Current

`app/_lib/stories.ts:111,130,149,168` at `b3f8e98` write the same four public IDs without the suffix; `@villagekit/ui@1.2.0`'s `getCloudinaryImageUrl` (`dist/components/media/url.js:1-6`) appends the ID unchanged, so the served `img` URL differs from legacy's by the extension. The four are not re-hosted, so `01a2acd9e8af` (the `gridbeam.xyz` public IDs, sanctioned) does not cover them, and the note on `82762f6b27de` names `image.type`, not the suffix.

## Verdict

plan 48c8cbdb: the four src strings are legacy's stories.ts:41,57,73,89 verbatim, .jpg included; Cloudinary serves the same bytes either way, so nothing visible changed.

## Log

- 2026-09-26: Filed by the Parity review of the catalog slice 48c8cbdb206a, a gap present since the first port and unrecorded. Cloudinary serves the same bytes for the ID with or without the suffix (both 200, 33351 bytes, image/jpeg at w_448), so nothing visible changes; the fix writes legacy's strings back in the same commit.
