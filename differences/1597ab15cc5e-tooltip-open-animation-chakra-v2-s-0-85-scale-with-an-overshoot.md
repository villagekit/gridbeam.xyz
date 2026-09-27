---
title: "Tooltip open animation: Chakra v2's 0.85 scale with an overshoot over 0.2s to Chakra v3's 0.95 scale and fade over 150ms"
status: open
route: /designs/bed-frame
axis: interaction
kind: changed
---
## Legacy

Chakra v2's `Tooltip` opens through framer-motion's `scale` variants (the packed `@chakra-ui/tooltip` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/tooltip/dist/chunk-XRZH7COS.mjs:4-21`): on enter the scale runs 0.85 to 1 over 0.2s on the ease `[0.175, 0.885, 0.4, 1.1]` (an overshoot) and the opacity to 1 over 0.2s ease-out; on exit the scale to 0.85 over 0.2s and the opacity to 0 over 0.15s, ease-in-out, both from the tooltip's transform origin. On the live legacy page the `Width x Depth x Height` tooltip reads an inline `transform: matrix(0.903, 0, 0, 0.903, 0, 0)` 40ms after the hover and `animation: none` (the scratchpad's `rvw-tt-legacy.json` for plan c09248be3862, the Parity review's probe).

## Current

Chakra v3's tooltip recipe animates the content with `animationStyle: scale-fade-in` at `animationDuration: fast` when open and `scale-fade-out` when closed (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/tooltip.js:22-29`): the `scale-in` keyframes run 0.95 to 1 and `fade-in` 0 to 1 (`theme/tokens/keyframes.js:74-77,151-154`) over 150ms (`theme/tokens/durations.js:7`) on the browser's default timing, from `--transform-origin` (`theme/motion-styles.js:39-44`); the ui wrapper at `../ui` 0d23b49 writes no animation of its own. The same tooltip reads `animation: scale-in, fade-in 0.15s` and no inline transform (`rvw-tt-current.json`): a smaller, faster open with no overshoot, and a 150ms fade on close where legacy's scale ran 0.2s. Read by the Parity review of plan c09248be3862, not from the change; a fix is the ui wrapper's, in `../ui` (v2's keyframes and durations on the content's `_open` and `_closed` states), not built and not judged.

## Verdict

## Log
