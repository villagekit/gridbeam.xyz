---
title: "Hero heading: size 2xl to responsive 4xl/5xl with lineHeight 1.05"
status: regression
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:87` `<Heading size="2xl">Anyone can be a maker.</Heading>` at every width.

## Current

`app/page.tsx:116-118` `<Heading as="h1" size={{ base: '4xl', md: '5xl' }} lineHeight="1.05">`; visibly larger in `audit/_root/1280/current.png` than `legacy.png`.

## Verdict

## Log

- 2026-09-12: The `h1` level is the accessibility item.
