---
title: "Mobile menu toggle hover and press: pink icon to gray.900, the color prop beats the toolbar variant in Chakra v3"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`packages/ui-nav/src/components/NavHeader.tsx:82-88` at `fce357d`: the toggle is `IconButton variant="toolbar"` with `sx={{ color: 'gray.900' }}`; `@villagekit/ui@0.9.0 src/components/Button.tsx:122-138`: the `toolbar` variant colors the icon `primary.500` on hover and on press (`_hover`, `_active`) and `gray.700` on focus. In Chakra v2 the variant's nested selectors beat the `sx` color, so the icon is `gray.900` at rest and pink under the pointer or a press: on the live site at 375, the toggle's computed color is `rgb(23, 25, 35)` at rest and `rgb(213, 63, 140)` on hover, over the variant's `primary.400` 10% fill.

## Current

`../ui/src/components/nav/NavHeader.tsx` (1.2.0 and the nav slice alike): the same two lines, `variant="toolbar"` and `color="gray.900"`. Chakra v3 emits the recipe's styles inside a cascade layer and a style prop unlayered, so `color="gray.900"` beats the variant's `_hover`, `_active` and `_focus` colors whatever their specificity: at 375 the computed color is `rgb(24, 24, 27)` at rest and on hover, the `primary.400` 10% fill and the 1.08 scale still applying. Visible in the open-menu captures, where the pointer rests on the toggle after the click: the icon at (36, 31) is `rgb(213, 63, 140)` on legacy and `rgb(24, 24, 27)` here; read from the computed styles on `pnpm dev` as well.

## Verdict

## Log
