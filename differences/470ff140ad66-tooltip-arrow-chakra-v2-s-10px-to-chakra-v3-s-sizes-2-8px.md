---
title: "Tooltip arrow: Chakra v2's 10px to Chakra v3's sizes.2, 8px"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

Chakra v2's `Tooltip` defaults `arrowSize` to 10 (the packed `@chakra-ui/tooltip` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/tooltip/dist/chunk-P7BNLW77.mjs:39`), and the 0.9.0 wrapper passes `hasArrow` and `arrowPadding={8}` with no size (`@villagekit/ui@0.9.0 src/components/Tooltip.tsx:16-17`): the live legacy page's tooltips carry a `chakra-tooltip__arrow-wrapper` 10px wide (the scratchpad's `style-legacy.json` for plan 4f55a829c726).

## Current

Chakra v3's tooltip recipe sets `--arrow-size: sizes.2`, 8px (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/tooltip.js:32`), and the ui wrapper renders `BaseTooltip.Arrow` with no size (`@villagekit/ui@1.2.0 src/components/Tooltip.tsx:38-41`): the same tooltips carry a `chakra-tooltip__arrow` 8px wide (`style-current.json`). Read by the Parity review of plan 4f55a829c726; a fix is the ui wrapper's, in `../ui`.

## Verdict

## Log
