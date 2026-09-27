---
title: "Tooltip text: Chakra v2's whiteAlpha.900 to white"
status: upstream
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

Chakra v2's tooltip theme sets the text color to `whiteAlpha.900` (the packed `@chakra-ui/theme` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/components/tooltip.js:35`, `colors.whiteAlpha.900`), and the 0.9.0 wrapper (`@villagekit/ui@0.9.0 src/components/Tooltip.tsx`) sets no color: the live legacy page's slider tooltip (`800mm` on `/designs/makers-desk`) and the `Width x Depth x Height` tooltip read `color: rgba(255, 255, 255, 0.92)` (the scratchpad's `style-legacy.json` for plan 4f55a829c726).

## Current

`@villagekit/ui@1.2.0 src/components/Tooltip.tsx:32` writes `color="white"` on the content, over Chakra v3's `fg.inverted` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/tooltip.js:12`): the same two tooltips read `color: rgb(255, 255, 255)` (`style-current.json`). The engine's own `Text` children inside the dimensions tooltip write `color: 'white'` on both sides. Read by the Parity review of plan 4f55a829c726; a fix is the ui wrapper's, in `../ui`.

## Verdict

## Log

- 2026-09-27: Fixed in ../ui as commit 394d47f on its main (plan [[c09248be3862]]): the wrapper's content styles as one css array on Tooltip.Content with color whiteAlpha.900 and lineHeight inherit, the arrow at --arrow-size 10px, positioning.arrowPadding 8; not pushed, waiting on the operator's publish of @villagekit/ui (decision 28c1a536), which the bump plan 99f2fe62c62f consumes. Read on the probe under the file:../ui override: the desk's slider tooltip and the bed frame's dimensions tooltip at rgba(255, 255, 255, 0.92), 24px lines at 16px and 21px at 14px, a 10px arrow, legacy's values.
