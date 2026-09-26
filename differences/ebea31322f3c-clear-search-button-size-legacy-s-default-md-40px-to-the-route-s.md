---
title: "Clear search button size: legacy's default md 40px to the route's sm"
status: regression
route: /designs
axis: visual
kind: changed
---

## Legacy

`apps/gridkit/components/catalogue/search-bar.tsx:35-40` at `fce357d`: the `Clear search` `IconButton` (variant `toolbar`) passes no `size`, so Chakra v2's default `md` renders it 40px square at font size 16px. Measured on the live legacy site, `/designs` at 1280 with a search typed: 40 by 40, `font-size: 16px` (the scratchpad's `recipes-probe.mjs`, 2026-09-26).

## Current

`app/_components/catalogue/Catalogue.tsx:408` `<IconButton title="Clear search" variant="toolbar" size="sm" ...>`: a `size="sm"` legacy did not pass. On `pnpm dev` with `@villagekit/ui@1.2.0` it renders 36 by 36 at 14px (Chakra v3's `sm`); with Chakra v2's button sizes in the ui recipe (slice [[2bd0169a6dda]], `upstream` until the bump) it renders 32 by 32 at 14px (v2's `sm`). Found beside the button-size item [[ebdb3183c0dd]], whose fix makes every `size` render what Chakra v2 rendered; the route's own prop is what differs.

## Verdict

## Log
