---
title: "FAQ accordion rows: the theme paddingY 4 to an explicit paddingY 3"
status: regression
route: /faq
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/faq.tsx:350,356` no padding props; `@villagekit/ui@0.9.0 src/components/Accordion.tsx:12-17,26-29` gives button and panel `paddingY: 4`.

## Current

`app/faq/page.tsx:308,320` `<Accordion.ItemTrigger paddingY="3">` and `<Accordion.ItemContent paddingY="3">`, overriding the recipe's `paddingY: '4'` (`@villagekit/ui@1.2.0 src/components/Accordion.recipe.ts:13-22`).

## Verdict

## Log

- 2026-09-26: From the recipes slice [[45d6f5634a11]]: the ui recipe now pads the accordion's `itemBody` (the box v3 does not animate) 4 in place of `itemContent`, so the route's `paddingY="3"` on `ItemContent` no longer overrides the recipe's panel padding but stacks on it, 28px above and below the answer on `pnpm dev` against legacy's 16px; the trigger's `paddingY="3"` still overrides the recipe's 4. Removing both props, this item's fix, gives legacy's 16px on trigger and panel.
