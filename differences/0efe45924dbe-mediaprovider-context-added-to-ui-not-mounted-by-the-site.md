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

rule: upgrade (4). @villagekit/ui ships MediaProvider/useCloudinaryName, but this site's one real per-image call site (`app/_lib/cloudinary-loader.ts`, the Next `images.loaderFile`) runs outside the React tree and can't use context: its own header comment says so. Mounting the provider would add a second mechanism alongside the plain `CLOUDINARY_NAME` constant, not replace it, for no benefit on a single-tenant site. Confirmed 2026-09-13 after review.

## Log

- 2026-09-26: Verdict overtaken by plan [[6f90e7e24ca6]]: the home's re-ports (the story card, the image carousel and the design carousel, then the page) render the ui Image and Video, whose 1.2.0 media context throws without a cloud name, so the site now mounts MediaProvider in SiteProvider. The loader file being the one call site no longer holds. Superseded by [[afe50ab5c7aa]]; moved to open for the operator on the shell's verdicts plan [[77cf83a1285a]].
