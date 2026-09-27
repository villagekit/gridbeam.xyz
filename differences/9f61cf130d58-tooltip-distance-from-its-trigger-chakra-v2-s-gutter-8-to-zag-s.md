---
title: "Tooltip distance from its trigger: Chakra v2's gutter 8 to zag's gutter plus half the arrow, 13"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

Chakra v2's `usePopper` offsets the tooltip from its trigger by `[0, gutter]`, `gutter` 8 (the packed `@chakra-ui/popper` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/popper/dist/chunk-LUYFNC5G.mjs:31,70`), and its arrow wrapper sits `calc(size / 2 - 1px)` outside the box (`chunk-P4KPSAOW.mjs:60-61`, `--popper-arrow-offset`): on the live legacy page the `Width x Depth x Height` tooltip's box ends 8px above the `InfoTooltip`'s trigger box and its 10px arrow reaches 4px out of the box (the scratchpad's `gap-legacy.json` for plan c09248be3862: `gapBoxToContent: 8`, `bottom: -4px`).

## Current

zag's popper offsets the tooltip by `gutter` plus half the arrow's height (`node_modules/.pnpm/@zag-js+popper@1.40.0/node_modules/@zag-js/popper/dist/get-placement.js:37,63-67`, `gutter: 8`, `mainAxis = gutter + arrowOffset`) and sits the arrow `calc(size / 2)` outside the box (`middleware.js:53-55,96`, `--arrow-offset`): the same tooltip's box ends 13px above the trigger box and its 10px arrow reaches 5px out of it (`gap-current.json`: `gapBoxToContent: 13`, `bottom: -5px`), so the arrow box's outer edge sits 8px from the trigger box where legacy's sits 4px (the rotated tip reaches about 2px closer on each side). With Chakra v3's 8px arrow, before plan c09248be3862, the box ended 12px above. Read by the implementing agent of plan c09248be3862 beside the arrow size it restored; a fix would be the ui wrapper's, in `../ui` (`positioning.gutter` on `Tooltip.Root`, 3 for a 10px arrow, or the arrow's offset), not built and not judged.

## Verdict

## Log
