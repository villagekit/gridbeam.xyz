---
title: "LinkCard: fixed 3xs by 64 box with space-around to a fluid full-height card packed to the top"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:41,46` `<HoverCard ... sx={{ height: '64', paddingX: 4, paddingY: 8, width: '3xs' }}>` around a `Stack` with `justifyContent="space-around"` and `height="100%"`: every card is a 224 by 256 px box whose icon, heading, text and overlay are spread evenly. `audit/legal/1280/legacy.png`, `audit/tools-and-resources/1280/legacy.png`, `audit/contact/1280/legacy.png`: the cards float at that size at every width.

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:31-33` `<LinkBox h="full"><HoverCard as={as} h="full" paddingX="6" paddingY="8"><Stack ... justifyContent="flex-start" gap="4" h="100%">`: no width or height of its own, so the card fills its grid cell and packs its content to the top. `audit/legal/1280/current.png` (cards about 530 px wide), `audit/tools-and-resources/1280/current.png` (a row's cards stretched to the tallest).

## Verdict

## Log

- 2026-09-12: Filed on shell from the faq/contact/legal/tools/subscribe ledger (plan 848b026f): LinkCard is a `@villagekit/ui` component of which the shell pass filed only the aria-label drop (2cbb4f4b8497). Consumed on `/legal`, `/tools-and-resources` and `/subscribe` (current) and on legacy `/contact`, `/legal`, `/tools-and-resources`.
