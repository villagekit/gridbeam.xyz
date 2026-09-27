---
title: "Assembled Dimensions tooltip style: the sm font and 4 padding dropped with the InfoTooltip's Tooltip props"
status: open
route: /designs/bed-frame
axis: visual
kind: removed
---
## Legacy

`gridkit@v0.9.0 products/kit/src/info.tsx:64` passes `sx={{ fontSize: 'sm', padding: 4 }}` to the `InfoTooltip`, which `@villagekit/ui@0.9.0 src/components/InfoTooltip.tsx:7,19` spreads onto the `Tooltip`, whose `sx` merges over its own `paddingX: 2, paddingY: 1` and `fontSize: 'md'` (`src/components/Tooltip.tsx:20-26`): the live legacy page's `Width x Depth x Height` tooltip reads `font-size: 14px`, `line-height: 21px`, `padding: 16px`, 320px by 124px (the scratchpad's `style-legacy.json` for plan 4f55a829c726).

## Current

`@villagekit/product-kit@0.10.0 src/info.tsx:52-61` passes no style, and `@villagekit/ui@1.2.0`'s `InfoTooltip` takes none (`src/components/InfoTooltip.tsx:9-13`: `label`, `pointerTimeout` and, from ../ui 0d23b49, `portalProps`, where the 0.9.0 props extended `Partial<TooltipProps>` and passed `sx` and `placement` through), so the tooltip reads the ui `Tooltip`'s own `fontSize="md"`, `paddingX="2"`, `paddingY="1"` (`src/components/Tooltip.tsx:34-36`): `font-size: 16px`, `padding: 4px 8px`, 320px by 80px (`style-current.json`). Read by the Parity review of plan 4f55a829c726, which restored the tooltip's portal container and not its style; a fix needs the ui `InfoTooltip` to take a style again and the engine line back, in `../ui` and `../gridkit`.

## Verdict

## Log
