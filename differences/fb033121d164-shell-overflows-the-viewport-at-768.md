---
title: Shell overflows the viewport at 768
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`audit/_root/768/legacy.png` is 768 px wide: three nav items, the cart icon and the three centered footer columns fit the viewport.

## Current

`audit/_root/768/current.png` is 1018 px wide (full-page capture of a 768 px viewport): the Subscribe pill overlaps `Contact` and runs past the right edge, and the footer's `accentB.50` ground stops at 768 px with `Learn` clipped off the left. Causes read from the code: six top items (`app/_lib/nav.ts:3-10`) beside a `Heading size="xl"` wordmark (`app/_components/SiteBrand.tsx:23`) and the button (`app/_components/SiteHeaderAction.tsx:10`); four footer columns at `minW="3xs"` with `gap={{ md: '16' }}` (`@villagekit/ui@1.2.0 src/components/layouts/Footer.tsx:46,72`).

## Verdict

## Log

- 2026-09-12: The nav count, the wordmark size, the column gap and the sections have their own items; this one records the breakage they add up to.
