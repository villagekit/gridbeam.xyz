---
title: "Steps list icons: Chakra v2's ListIcon inline at text-bottom to v3's List.Indicator inline-block at middle"
status: open
route: /
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:226-268` at `fce357d` `<ListIcon as={...} />`, styled by Chakra v2's list theme: `display: inline`, `margin-right: 8px`, `vertical-align: text-bottom`, a 1em box (18px at 375 and 768, 20px at 1280, a probe of the live site on 2026-09-26); `audit/_root/1280/legacy.png`, the `How to get started` list.

## Current

`app/HomePage.tsx:228-230` and the five items after it: `<List.Indicator asChild>` around `<Icon as={...} />`, styled by Chakra v3's list recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/list.js:21-27`: `marginEnd: 2`, `minHeight: 1lh`, `flexShrink: 0`, `display: inline-block`, `verticalAlign: middle`) and its icon recipe (`recipes/icon.js:7-12`, `verticalAlign: middle`); the same probe on `pnpm dev` reads `inline-block`, `margin-right: 8px`, `vertical-align: middle`, the same 1em box, so each icon sits a few pixels higher against its line than legacy's; `audit/_root/1280/current.png`. The root's `display: flex; gap: 32px` for v2's `spacing={8}` margins renders the same 32px between items.

## Verdict

## Log

- 2026-09-26: Filed open by the page re-port (plan [[159c621d8a1a]]): [[3d21d3543886]] sanctions List.Indicator for ListIcon under rule 4, and whether the v3 recipe's own alignment comes with it is the operator's call; otherwise the fix is verticalAlign="text-bottom" on each indicator, or a list recipe in ../ui. Goes on the home's verdicts plan at the record's finish.
