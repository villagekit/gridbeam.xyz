---
title: "Switch root: Chakra v2's inline-block root with the track at its top to Chakra v3's inline-flex root with the track aligned to its start by the ui recipe"
status: open
route: shell
axis: code
kind: changed
---
## Legacy

Chakra v2's `Switch` renders its root as an `inline-block` label at `vertical-align: middle` and `line-height: 0`, with the track an `inline-flex` span flowing from the root's top (`~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/switch/dist/chunk-VTV6N5LE.mjs:24-45`), so a root taller than its track keeps the track flush with its top: on the live `/designs/bed-frame` with the Parts tab open, the `Group same size parts` switch root is 34 by 29 and its 20px track sits at the row's top at 1280 and 375 (`audit/_probeb8c6e/legacy.json`, `parts1280` and `parts375`).

## Current

Chakra v3's switch root is an `inline-flex` that centers its items (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/switch.js`, the `root` base), so the ui `switchRecipe` (`../ui/src/components/Switch.recipe.ts`) writes `alignSelf: 'flex-start'` on the `solid` variant's control to keep the track at the root's top as v2's rendering did; the same readings as legacy on `pnpm dev` under the `file:../ui` override at `../ui` 1c6a07b (`audit/_probeb8c6e/after.json`). The visitor sees no difference; the code shape differs from the legacy author's: a flex root with a hand-written track alignment in place of v2's inline-block root. The `raised` variant, which v2 had not, keeps v3's centering, and a visible `Switch.Label` taller than the track would now sit beside a top-aligned track where v3 centers the two; no consumer renders one. Filed by plan `b8c6df9b44e8`, whose field root stretch made the root taller than its track.

## Verdict

## Log
