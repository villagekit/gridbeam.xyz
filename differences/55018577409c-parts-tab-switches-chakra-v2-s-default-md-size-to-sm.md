---
title: "Parts tab switches: Chakra v2's default md size to sm"
status: open
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

The Parts tab's two switches, `Group same size parts` and the per-group toggle, render at Chakra v2's default size, `md`: legacy's `components/design/parts-breakdown.tsx` passes no `size` to `Switch` (`../node-modules/apps/gridkit/components/design/parts-breakdown.tsx:31` at `fce357d`), so each track is 30 by 16 inside a 2px inset, 34 by 20 on screen, with a 14px thumb travel (the packed `@chakra-ui/theme` `dist/components/switch.js:94-99` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`).

## Current

`app/_components/design/PartsBreakdown.tsx:43,78` pass `size="sm"`, which under the ui recipe of plan 402430831b29 (`../ui` 47c6ffb, `src/components/Switch.recipe.ts`, Chakra v2's `sm`) renders a 22 by 12 track, 26 by 16 on screen, with a 10px thumb travel (read on `/designs/bed-frame` at 1280 with the Parts tab selected, `pnpm dev` under the ui override: the controls switch 34 by 20, the two Parts switches 26 by 16). Before that slice the `sm` switch was Chakra v3's 32 by 16. Read by the Parity review of plan 402430831b29. The page re-port slice `3c448a379ad7` takes legacy's call site.

## Verdict

## Log
