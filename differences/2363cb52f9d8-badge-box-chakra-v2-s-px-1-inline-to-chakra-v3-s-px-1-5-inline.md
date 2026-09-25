---
title: "Badge box: Chakra v2's px 1 inline to Chakra v3's px 1.5 inline-flex with a 5 minimum height"
status: regression
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
