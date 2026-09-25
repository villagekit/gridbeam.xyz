---
title: "Mobile menu toggle hover and press: pink icon to gray.900, the color prop beats the toolbar variant in Chakra v3"
status: upstream
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

- 2026-09-26: Handed to the slice [[61a42a0adbc8]], minted beside the shell record [[a78b167170b8]] at its finish (decision 40abdb2f222a): a fix in ../ui on the toggle's rest color against the toolbar variant's states, parked in upstream when it lands.

- 2026-09-26: Fixed in ../ui at commit d736bfe on main (plan 61a42a0adbc8): src/components/Button.tsx, the toolbar variant's rest color reads var(--toolbar-color, {colors.gray.700}); src/components/nav/NavHeader.tsx, the toggle sets css={{ '--toolbar-color': 'colors.gray.900' }} in place of color="gray.900"; CHANGELOG.md under Fixed. On pnpm dev under the file:../ui override the toggle reads rgb(23, 25, 35) at rest and rgb(213, 63, 140) on hover and on press, legacy's values. Waits on the operator's publish and the bump plan 99f2fe62c62f (decision 28c1a536).
