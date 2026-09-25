---
title: MediaProvider context added to ui, not mounted by the site
status: sanctioned
route: shell
axis: code
kind: added
---
## Legacy

`packages/ui-media/src/image.tsx:211-222`: `getCloudinaryUrl(src, width, quality)` takes the cloud name from a constant; no context.

## Current

`@villagekit/ui@1.2.0 src/components/media/context.tsx:1-42`: `MediaProvider`, `useMediaContext`, `useCloudinaryName`, `assertCloudinaryName` (throws when unset); nothing in `app/` mounts it, and `app/_lib/cloudinary.ts:11` threads its own `CLOUDINARY_NAME`.

## Verdict

rule: upgrade (4). @villagekit/ui ships MediaProvider/useCloudinaryName, but this site's one real per-image call site (`app/_lib/cloudinary-loader.ts`, the Next `images.loaderFile`) runs outside the React tree and can't use context: its own header comment says so. Mounting the provider would add a second mechanism alongside the plain `CLOUDINARY_NAME` constant, not replace it, for no benefit on a single-tenant site. Confirmed 2026-09-13 after review.

## Log
