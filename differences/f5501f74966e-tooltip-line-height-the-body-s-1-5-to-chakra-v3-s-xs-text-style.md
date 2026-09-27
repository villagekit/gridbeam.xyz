---
title: "Tooltip line height: the body's 1.5 to Chakra v3's xs text style, 1rem"
status: upstream
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

- 2026-09-27: Fixed in ../ui as commit 394d47f on its main (plan [[c09248be3862]]): the wrapper's content styles as one css array on Tooltip.Content with color whiteAlpha.900 and lineHeight inherit, the arrow at --arrow-size 10px, positioning.arrowPadding 8; not pushed, waiting on the operator's publish of @villagekit/ui (decision 28c1a536), which the bump plan 99f2fe62c62f consumes. Read on the probe under the file:../ui override: the desk's slider tooltip and the bed frame's dimensions tooltip at rgba(255, 255, 255, 0.92), 24px lines at 16px and 21px at 14px, a 10px arrow, legacy's values.
