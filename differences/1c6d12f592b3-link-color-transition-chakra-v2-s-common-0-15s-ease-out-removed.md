---
title: "Link color transition: Chakra v2's common 0.15s ease-out removed"
status: upstream
route: shell
axis: interaction
kind: removed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/Link.tsx:27-58` `linkTheme` sets `outline`, `borderRadius` and `_hover` and inherits the rest of Chakra v2's link base (`@chakra-ui/theme@3.3.1` `dist/components/link.js`: `transitionProperty: common`, `transitionDuration: fast`, `transitionTimingFunction: ease-out`). Measured on the live legacy site at 1280 on the footer's section links, social links and credit link: `transition: background-color 0.15s cubic-bezier(0, 0, 0.2, 1), border-color ..., color ..., fill ..., stroke ..., opacity ..., box-shadow ..., transform ...`, so the hover color fades in.

## Current

`@villagekit/ui@1.2.0 src/components/Link.tsx:20-42` `linkRecipe` carries the same three keys and no transition, and Chakra v3's link recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/link.js`) has none either. Measured on `pnpm dev` at 1280 on the same three footer links: `transition: all` at 0s, the hover color snapping. Every `Link` on the site, so filed on `shell`.

## Verdict

## Log

- 2026-09-26: Found at the Parity review of the site footer slice (plan [[5e4529a6aeac]]); pre-existing, not introduced there. The fix is the ui `Link` recipe's, the recipes slice [[45d6f5634a11]], never a site-side style.

- 2026-09-26: Fixed in ../ui by the recipes and provider slice [[45d6f5634a11]], commit 540e9c3: src/components/Link.tsx: linkRecipe carries transitionProperty common, transitionDuration fast and transitionTimingFunction ease-out, v2's link base; measured 150ms on a footer link on both sides (v3's ease-out token is cubic-bezier(0, 0, 0.58, 1) where v2's was (0, 0, 0.2, 1), the token's value under the upgrade). Waits in upstream for the bump plan [[99f2fe62c62f]].
