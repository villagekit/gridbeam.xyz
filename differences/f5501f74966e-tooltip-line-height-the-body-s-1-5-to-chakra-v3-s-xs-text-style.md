---
title: "Tooltip line height: the body's 1.5 to Chakra v3's xs text style, 1rem"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

Chakra v2's tooltip theme sets `fontSize: 'sm'` and no line height (the packed `@chakra-ui/theme` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/components/tooltip.js:31-48`), and the 0.9.0 wrapper sets `fontSize: 'md'` (`@villagekit/ui@0.9.0 src/components/Tooltip.tsx:22`), so the line height is the body's `1.5`: the live legacy page's slider tooltip (`800mm` on `/designs/makers-desk`) reads `font-size: 16px`, `line-height: 24px`, 80px by 32px (the scratchpad's `style-legacy.json` for plan 4f55a829c726).

## Current

Chakra v3's tooltip recipe sets `textStyle: 'xs'` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/tooltip.js:17`), which writes `fontSize: xs` and `lineHeight: 1rem` (`theme/text-styles.js:6`), and the ui wrapper overrides the font size alone (`@villagekit/ui@1.2.0 src/components/Tooltip.tsx:34`, `fontSize="md"`): the same tooltip reads `font-size: 16px`, `line-height: 16px`, 80px by 24px (`style-current.json`); the dimensions tooltip's paragraphs read 16px lines too. Read by the Parity review of plan 4f55a829c726; a fix is the ui wrapper's, in `../ui`.

## Verdict

## Log
