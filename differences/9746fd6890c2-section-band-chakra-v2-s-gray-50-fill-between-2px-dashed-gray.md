---
title: "Section band: Chakra v2's gray.50 fill between 2px dashed gray.200 rules to 1.2.0's colorPalette.50 fill with no rules"
status: upstream
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

- 2026-09-26: At the home record's finish (plan [[fd9a92bd8abd]]): the fix in ../ui is the slice [[2de775cb197b]], minted beside the shell record (decision 40abdb2f222a, worker:fable, blocking the bump plan [[99f2fe62c62f]]); the slice moves this item to upstream with the sibling commit (decision 28c1a536).

- 2026-09-26: Fixed in ../ui at commit 16bb376 (plan [[2de775cb197b]], decision 28c1a536), waiting on the publish: src/components/layouts/Section.tsx writes the legacy ui-page Section's yborder-bg branch, backgroundColor colorPalette.50, borderTopWidth 2, borderBottomWidth 2, borderStyle dashed, borderColor colorPalette.200, with the yborder and roundborder branches re-ported beside it. Measured on pnpm dev under the file:../ui override against the live legacy site: every tinted section on / at 1280 and 375 reads background-color rgb(247, 250, 252), border-top and border-bottom 2px dashed rgb(226, 232, 240), 0px left and right, and every untinted section 0px on both sides, the legacy readings; before, the published 1.2.0 read rgb(250, 250, 250) with 0px solid borders. The bump plan [[99f2fe62c62f]] moves this item to fixed.
