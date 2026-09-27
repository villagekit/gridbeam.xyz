---
title: "Tooltip arrow padding: the 0.9.0 wrapper's 8 to zag's default 4"
status: upstream
route: /designs/bed-frame
axis: visual
kind: removed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Tooltip.tsx:17` passes `arrowPadding={8}` to Chakra v2's `Tooltip`, which keeps the arrow 8px from the tooltip's corners when the trigger sits near an edge.

## Current

`@villagekit/ui@1.2.0 src/components/Tooltip.tsx` passes no arrow padding to Chakra v3's `Tooltip.Root` `positioning`, so zag's default of 4 applies (`node_modules/.pnpm/@zag-js+popper@1.40.0/node_modules/@zag-js/popper/dist/get-placement.js:44,60`). Visible only when the arrow sits near the tooltip's edge; none of the probed tooltips did. Read by the Parity review of plan 4f55a829c726; a fix is the ui wrapper's, in `../ui`.

## Verdict

## Log

- 2026-09-27: Fixed in ../ui as commit 394d47f on its main (plan [[c09248be3862]]): the wrapper's content styles as one css array on Tooltip.Content with color whiteAlpha.900 and lineHeight inherit, the arrow at --arrow-size 10px, positioning.arrowPadding 8; not pushed, waiting on the operator's publish of @villagekit/ui (decision 28c1a536), which the bump plan 99f2fe62c62f consumes. Read on the probe under the file:../ui override: the desk's slider tooltip and the bed frame's dimensions tooltip at rgba(255, 255, 255, 0.92), 24px lines at 16px and 21px at 14px, a 10px arrow, legacy's values.
