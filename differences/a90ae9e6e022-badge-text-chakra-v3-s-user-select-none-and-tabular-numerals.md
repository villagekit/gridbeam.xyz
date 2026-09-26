---
title: "Badge text: Chakra v3's user-select none and tabular numerals kept over v2's selectable text and normal numerals"
status: upstream
route: shell
axis: interaction
kind: added
---

## Legacy

Chakra v2's badge wrote no `user-select` and no `font-variant-numeric` (`@chakra-ui/theme@3.3.1` `components/badge.js:31-35` and the v2 `Badge` component's own css, `@chakra-ui/layout@2.3.1` `dist/chunk-Z6RXEUPO.mjs:21-25`), so a badge's text is selectable and its digits proportional. Measured on the live legacy site, `/stories` at 1280, the story card's `Guide` badge: `user-select: auto`, `font-variant-numeric: normal` (the scratchpad's `recipes-probe.mjs`, 2026-09-26).

## Current

Chakra v3's badge recipe base writes `userSelect: none` and `fontVariantNumeric: tabular-nums` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/badge.js:6-15`), which `@villagekit/ui`'s `badgeRecipe` keeps under 1.2.0 and after the recipes slice [[2bd0169a6dda]], whose scope was Chakra v2's box (display, padding, type, no minimum height) with every other v3 declaration kept as it renders. Measured on `pnpm dev`, the same badge: `user-select: none`, `font-variant-numeric: tabular-nums`. Every `Badge` on the site, so filed on `shell`; no badge on the site shows digits today, so the numerals do not show, and the selection difference is the one a visitor can meet. The fix is two lines in the ui recipe base, a ui slice's.

## Verdict

## Log

- 2026-09-26: At the about record's finish (plan [[40179ab9e779]]), found owned by no slice and no verdicts plan (filed by the recipes slice [[2bd0169a6dda]] after the shell's verdicts plan [[77cf83a1285a]] and the home's finish were written): the fix in ../ui is the slice [[a4f938a27428]], minted beside the shell record (decision 40abdb2f222a, worker:fable, blocking the bump plan [[99f2fe62c62f]]), two declarations in src/components/Badge.recipe.ts; the slice moves this item to upstream with the sibling commit (decision 28c1a536).

- 2026-09-26: Fixed in ../ui by the Badge slice [[a4f938a27428]], ui commit f8b772f on its main: badgeRecipe's base writes userSelect auto and fontVariantNumeric normal over Chakra v3's none and tabular-nums. Under the file:../ui override the first /stories card badge reads auto and normal and a drag from the page margin across it selects its text, the live legacy site's readings (the scratchpad's badge-probe.mjs, badge-after.json against badge-legacy.json); the /designs option keeps user-select none by the route's own prop, as legacy's option.tsx wrote it. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
