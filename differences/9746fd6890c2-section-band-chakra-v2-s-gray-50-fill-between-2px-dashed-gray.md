---
title: "Section band: Chakra v2's gray.50 fill between 2px dashed gray.200 rules to 1.2.0's colorPalette.50 fill with no rules"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/Section.tsx:53-84` at `fce357d` (the `yborder-bg` branch at `:65-73`): a `Section` with `colorScheme` in the default `yborder-bg` mode sets `backgroundColor: colors[colorScheme][50]`, `borderTopWidth: 2`, `borderBottomWidth: 2`, `borderStyle: 'dashed'` and `borderColor: colors[colorScheme][200]`; on the live site every odd home section reads `rgb(247, 250, 252)` between `2px dashed` top and bottom rules (a probe on 2026-09-26; `audit/_root/1280/legacy.png`).

## Current

`node_modules/@villagekit/ui/dist/components/layouts/Section.js:31-33` at `1.2.0`: the `yborder-bg` mode sets `backgroundColor: 'colorPalette.50'` and no border (the `yborder` and `roundborder` modes keep a 1px solid rule); the same sections on `pnpm dev` read `rgb(250, 250, 250)` with `0px solid` borders (`audit/_root/1280/current.png`). Every route that renders a tinted `Section` shows it: the home's sections 1, 3 and 5 (`app/HomePage.tsx:464-477`, `colorPalette="gray"` on the odd indexes, as legacy's `colorScheme`).

## Verdict

## Log

- 2026-09-26: Found at the page re-port of / (plan [[159c621d8a1a]]) in the published 1.2.0 Section the re-port consumes, not in the page: the M1 ledger has no item on it, and the current page used the same component before the re-port. The fill's token value is the palette's ([[72b776cb0d3f]]); the dashed rules are the Section recipe's, restored in ../ui by a ui slice and closed at the bump.
