---
title: "Image sizes: breakpoint and DPR objects to one static string, unoptimized design image"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:109,334,365,444` `sizes={{ base: 'full', md: ['1500px', 2] }}` resolved per breakpoint by `packages/ui-media/src/hooks.ts:106-133`.

## Current

`app/_components/landing/ImageCarousel.tsx:36`, `LandingPhoto.tsx:26` and `TypingDesignSection.tsx:138` each hardcode `'(min-width: 1024px) 50vw, 100vw'`; `TypingDesignSection.tsx:137` passes `unoptimized` on the design image.

## Verdict

## Log

- 2026-09-12: The Cloudinary loader mechanism is the shell item [[6c566c2715e0]]; the ui `Image` still resolves a sizes object (`node_modules/@villagekit/ui/src/components/media/hooks.ts`).
