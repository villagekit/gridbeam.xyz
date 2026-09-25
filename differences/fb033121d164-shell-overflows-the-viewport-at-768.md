---
title: Shell overflows the viewport at 768
status: upstream
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

- 2026-09-26: Current is stale since plans 63e9c753 (four top items) and f8c93eaf (the brand re-ported, no `Heading`, no `whiteSpace: nowrap`): at 768 the header no longer runs past the viewport but the wordmark wraps onto two lines and the row grows to 108px, filed as its own item `1d2562d6b3bc`; the footer's overflow is the brand footer slice's expected stop (the shell record's Log).

- 2026-09-26: The footer half is fixed in ../ui by the ui brand footer slice [[1977c9af920c]], commit ae593d0: at 768 the document is 768px wide with the four columns in one 704px row, by the narrower column minimum between md and lg that [[c9ea22823a23]] records as open for the operator. The header half is [[1d2562d6b3bc]]. Waits on the operator's publish.
