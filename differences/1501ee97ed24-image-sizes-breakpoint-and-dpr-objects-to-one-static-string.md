---
title: "Image sizes: breakpoint and DPR objects to one static string, unoptimized design image"
status: fixed
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:109,334,365,444` `sizes={{ base: 'full', md: ['1500px', 2] }}` resolved per breakpoint by `packages/ui-media/src/hooks.ts:106-133`.

## Current

`app/_components/landing/ImageCarousel.tsx:36`, `LandingPhoto.tsx:26` and `TypingDesignSection.tsx:138` each hardcode `'(min-width: 1024px) 50vw, 100vw'`; `TypingDesignSection.tsx:137` passes `unoptimized` on the design image.

## Verdict

plan 159c621d8a1a

## Log

- 2026-09-12: The Cloudinary loader mechanism is the shell item [[6c566c2715e0]]; the ui `Image` still resolves a sizes object (`node_modules/@villagekit/ui/src/components/media/hooks.ts`).

- 2026-09-26: The unoptimized half moved to [[a704be5b8765]] (plan [[60cca8519469]]): the design carousel and the hidden next-design image now write legacy's sizes object, base 100% for full ([[152511f71ef4]]), at app/_components/landing/TypingDesignSection.tsx:72,87 (legacy pages/index.tsx:444,454). The static string remains at app/_components/landing/LandingPhoto.tsx:26, the page re-port's ([[159c621d8a1a]]), which closes this item.
