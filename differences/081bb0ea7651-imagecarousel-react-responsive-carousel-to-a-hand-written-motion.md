---
title: "ImageCarousel: react-responsive-carousel to a hand-written motion carousel with a dead interactive half"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:1-146` wraps `react-responsive-carousel` (`apps/gridkit/package.json:74`); `isInteractive = !autoPlayEnabled && slides.length > 1` gates arrows and `Icon` indicators, live for `pages/store/[id].tsx:230-236` and `components/story/story-image-carousel.tsx:11-23`.

## Current

`app/_components/landing/ImageCarousel.tsx:1-192` `'use client'`, `AnimatePresence`, `useState` and an interval; `isInteractive = !autoPlay && slideCount > 1` gates `IconButton` arrows, `IconButton` dots, `tabIndex` and an arrow-key handler (`:67-79,131-187`), and `app/page.tsx:137-142` is the only caller and always passes `autoPlay`. `index.ts:1` also exports `CarouselSlide` and `ImageCarouselProps`, which nothing imports.

## Verdict

## Log

- 2026-09-12: Note `526d5330`'s ImageCarousel dead half: checked and holds.
