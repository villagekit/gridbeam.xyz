---
title: "Hero carousel: unnamed list to a named region with aria-roledescription carousel"
status: fixed
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/image-carousel.tsx:44-72` the library's `carousel-root` div and `ul.slider`; `ariaLabel` does not reach a named node: a bare `list:` in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/landing/ImageCarousel.tsx:86-91` `<Box as="section" aria-roledescription="carousel" aria-label={ariaLabel}>`; `region "Things made with grid beam"` in `audit/_root/dom/current.aria.yaml`.

## Verdict

plan c92c235205f5

## Log

- 2026-09-12: Regression by rule absence. Note `526d5330`'s ImageCarousel accessibility finding: the legacy markup and the rewrite differ throughout; the dead half is the code item.
