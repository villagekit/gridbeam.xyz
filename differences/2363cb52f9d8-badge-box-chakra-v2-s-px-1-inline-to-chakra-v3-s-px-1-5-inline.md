---
title: "Badge box: Chakra v2's px 1 inline to Chakra v3's px 1.5 inline-flex with a 5 minimum height"
status: upstream
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:78-86` a `Badge` with `backgroundColor`, `fontSize: 'sm'` and `fontWeight: 'normal'` in its `sx`, on Chakra v2's badge base (`@chakra-ui/theme@3.3.1` `components/badge.js`: `px: 1`, inline, no minimum height) under `@villagekit/ui@0.9.0`'s `borderRadius: 'lg'` and `textTransform: 'none'`. Measured on the live legacy site, `/stories` at 1280: 4px horizontal padding, `display: block`, 21px tall on a 21px line.

## Current

`app/_components/stories/Item.tsx:83-91` the same props on `@villagekit/ui@1.2.0`'s `Badge`, Chakra v3's re-export whose default `size: sm` writes `px: 1.5`, `minH: 5`, `display: inline-flex` and `textStyle: xs` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/badge.js`), the ui recipe adding only the radius and the text transform (`dist/components/Badge.recipe.js`). Measured on `pnpm dev`, `/stories` at 1280: 6px horizontal padding, `display: flex`, 20px tall on a 16px line; the card's `fontSize: 'sm'` and `fontWeight: 'normal'` win over the recipe, so the text is 14px at 400 on both sides. Every `Badge` on the site, so filed on `shell`. The fix is the ui's: Chakra v2's badge base in the ui `badgeRecipe`, which a ui slice the operator mints makes.

## Verdict

## Log

- 2026-09-26: Filed by the story card slice (plan [[e332105c3b52]]); found on the story card, whose badge line is legacy's; the color and shade are 2b12ca93bdd3's, the literals the palette's upstream items.

- 2026-09-26: At the home record's finish (plan [[fd9a92bd8abd]]): the fix in ../ui is the slice [[2bd0169a6dda]], minted beside the shell record (decision 40abdb2f222a, worker:fable, blocking the bump plan [[99f2fe62c62f]]); the slice moves this item to upstream with the sibling commit (decision 28c1a536).

- 2026-09-26: Correction at the home record's finish (plan [[fd9a92bd8abd]], the review's finding): the Legacy text's word inline is short. Chakra v2's theme wrote no display rule, but the v2 Badge component's own __css wrote display inline-block, vertical-align middle and white-space nowrap (@chakra-ui/layout@2.3.1, dist/chunk-Z6RXEUPO.mjs:21-25); the flex parent on /stories blockifies it on both sides, so the slice [[2bd0169a6dda]] reads display on the suppliers page's badges.

- 2026-09-26: Fixed in ../ui at commit 6603102 (plan [[2bd0169a6dda]]): the badge recipe carries Chakra v2's base (inline-block at vertical-align middle, fontSize xs, fontWeight bold) under the 0.9.0 radius and text transform, and neutralizes v3's default sm size to v2's box (px 1, no text style, no minimum height); v3's xs, md and lg stay reachable. On pnpm dev under the override, the story card's badge on /stories at 1280 and 375 reads 47 by 21 with 4px horizontal padding on a 21px line, the live legacy site's reading; the /suppliers badges read 4px padding and min-height auto, and display block since their HStack blockifies them as the card's flex parent does, so display inline-block was read by cloning one into a plain div (the scratchpad's badge-block-probe.mjs). v3's user-select none and tabular numerals stay, filed as [[a90ae9e6e022]]. Waits on the publish; the bump plan [[99f2fe62c62f]] moves it to fixed.

- 2026-09-26: At the stories index record's finish (plan [[ca353de8b645]]): the page re-port [[278fb531e229]] made the four /stories filter chips Badges under the ported Option component, so this item now reads on them too: 20px tall on v3's sm size where the live legacy site's chips read 31px at 1280 and 25px at 375 (audit/stories/probe.json). The fix at 6603102 covers them, its textStyle none and minH auto returning the chip to the body's line height under the Option's own fontSize; the bump plan [[99f2fe62c62f]] carries the readings.
