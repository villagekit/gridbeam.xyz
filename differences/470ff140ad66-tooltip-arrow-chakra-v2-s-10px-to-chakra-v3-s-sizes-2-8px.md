---
title: "Tooltip arrow: Chakra v2's 10px to Chakra v3's sizes.2, 8px"
status: upstream
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

- 2026-09-27: Fixed in ../ui as commit 394d47f on its main (plan [[c09248be3862]]): the wrapper's content styles as one css array on Tooltip.Content with color whiteAlpha.900 and lineHeight inherit, the arrow at --arrow-size 10px, positioning.arrowPadding 8; not pushed, waiting on the operator's publish of @villagekit/ui (decision 28c1a536), which the bump plan 99f2fe62c62f consumes. Read on the probe under the file:../ui override: the desk's slider tooltip and the bed frame's dimensions tooltip at rgba(255, 255, 255, 0.92), 24px lines at 16px and 21px at 14px, a 10px arrow, legacy's values.
