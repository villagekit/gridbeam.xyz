---
title: "Link keyboard focus: Chakra v2's outline shadow to v3's gray focus outline on any focus"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Link.tsx:27-35` `linkTheme.baseStyle` sets `outline: 'none'` and inherits Chakra v2's link base (`@chakra-ui/theme@3.3.1` `dist/components/link.js`: `_focusVisible: { boxShadow: 'outline' }`), and `Link` cancels focus on mouse down. Measured on the live legacy site at 1280 by Tab-focusing a footer link (`About`): `outline: rgba(0, 0, 0, 0) solid 2px`, `box-shadow: rgba(0, 163, 196, 0.5) 0px 0px 0px 2px`, the theme's `outline` shadow on keyboard focus only.

## Current

`@villagekit/ui@1.2.0 src/components/Link.tsx:20-42` `linkRecipe` sets `outline: 'none'` and no focus style, and Chakra v3's link recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/link.js`: `focusRing: 'outside'`) merges under it, so the compiled recipe carries `&:is(:focus, [data-focus]) { outline: 2px solid var(--focus-ring-color) }` with the gray `colorPalette.focusRing` and no shadow (the merged recipe read from `createSystem(defaultConfig, config)` in `../ui`). Every `Link` on the site, so filed on `shell`.

## Verdict

## Log

- 2026-09-26: Found by the recipes slice [[45d6f5634a11]] measuring the footer links on both sides; pre-existing, in the family of [[6a18067acb3b]] (the focus ring the ui's controls show). No rule covers a different focus ring, so regression; the fix is the ui Link recipe's.

- 2026-09-26: Fixed in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3: src/components/Link.tsx: linkRecipe sets focusRing none and _focusVisible boxShadow outline; measured on a Tab-focused footer link on /faq, outline none with the cyan 2px shadow on both sides. Waits in upstream for the bump plan [[99f2fe62c62f]].
