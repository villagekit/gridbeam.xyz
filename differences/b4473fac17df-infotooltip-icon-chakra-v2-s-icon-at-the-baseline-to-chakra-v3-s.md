---
title: "InfoTooltip icon: Chakra v2's Icon at the baseline to Chakra v3's Icon at vertical-align middle, 3px lower against the dimensions text"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

Chakra v2's `Icon` rendered with a component as `as` (the 0.9.0 `InfoTooltip`, `@villagekit/ui@0.9.0 src/components/InfoTooltip.tsx:23`, `as={FaInfoCircle}`) writes `display: inline-block`, `lineHeight: 1em` and no `verticalAlign` (the packed `@chakra-ui/icon` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs:46-64`; the `verticalAlign: "middle"` at line 67 is the path without `as`): on the live legacy page the `Assembled dimensions` info icon's svg reads `vertical-align: baseline`, its top level with the top of the `Box` around it, 27px tall, and with the top of the `Assembled Dimensions` text beside it (the scratchpad's `gap-legacy.json` and `icon-pos-probe.mjs` for plan c09248be3862: `svg` at y 503, `box` at y 503, 16 by 27, the text at y 503).

## Current

Chakra v3's `Icon` recipe writes `verticalAlign: "middle"` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/icon.js:11`) and the 1.2.0 `InfoTooltip` renders the icon as `Icon`'s child (`@villagekit/ui@1.2.0 src/components/InfoTooltip.tsx:28-37`): the same svg reads `vertical-align: middle`, 2.78px below the top of a `Box` 24px tall and of the text beside it (`gap-current.json` and the icon position probe: `svg` at y 395.78, `box` at y 393, 16 by 24, the text at y 393), so the icon sits about 3px lower against the `Assembled Dimensions` text and the tooltip's trigger box is 3px shorter. Read by the implementing agent of plan c09248be3862 beside the tooltip's distance from this box; a fix is the ui `InfoTooltip`'s, in `../ui`, not built and not judged.

## Verdict

## Log
