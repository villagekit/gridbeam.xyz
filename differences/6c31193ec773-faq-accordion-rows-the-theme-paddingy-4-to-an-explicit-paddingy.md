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
