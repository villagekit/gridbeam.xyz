---
title: MediaProvider context added to ui, not mounted by the site
status: open
route: shell
axis: code
kind: added
---
## Legacy

`packages/ui-media/src/image.tsx:211-222`: `getCloudinaryUrl(src, width, quality)` takes the cloud name from a constant; no context.

## Current

`@villagekit/ui@1.2.0 src/components/media/context.tsx:1-42`: `MediaProvider`, `useMediaContext`, `useCloudinaryName`, `assertCloudinaryName` (throws when unset); nothing in `app/` mounts it, and `app/_lib/cloudinary.ts:11` threads its own `CLOUDINARY_NAME`.

## Verdict

## Log
