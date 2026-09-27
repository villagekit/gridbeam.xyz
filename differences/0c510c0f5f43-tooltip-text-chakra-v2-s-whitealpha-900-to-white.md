---
title: "Tooltip text: Chakra v2's whiteAlpha.900 to white"
status: open
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
