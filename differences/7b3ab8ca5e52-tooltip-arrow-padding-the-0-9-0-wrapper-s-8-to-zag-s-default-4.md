---
title: "Tooltip arrow padding: the 0.9.0 wrapper's 8 to zag's default 4"
status: open
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
