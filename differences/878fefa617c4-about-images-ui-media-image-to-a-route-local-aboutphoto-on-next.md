---
title: "About images: ui-media Image to a route-local AboutPhoto on next/image fill"
status: regression
route: /about
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:26-33` `<Image type="cloudinary" src=... alt=... sizes={{ base: 'container.md' }} width={1188} height={841} />` (`packages/ui-media/src/image.tsx:162-203`, intrinsic size).

## Current

`app/about/page.tsx:18,229-243` `AboutPhoto`: `<Box aspectRatio=...><NextImage src alt fill sizes="(min-width: 768px) 48rem, 100vw" /></Box>`, bypassing the ui `Image` (`node_modules/@villagekit/ui/src/components/media/Image.tsx`).

## Verdict

## Log

- 2026-09-12: The loader is the shell item [[6c566c2715e0]].
