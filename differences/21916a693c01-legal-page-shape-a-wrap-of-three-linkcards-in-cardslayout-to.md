---
title: "Legal page shape: a Wrap of three LinkCards in CardsLayout to three Sections"
status: regression
route: /legal
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/layouts/CardsLayout.tsx:21-27` `Title` then `<Container maxW="container.md"><Wrap spacing={8} justify="center">` of three fixed-size cards on a flat page (`audit/legal/1280/legacy.png`, the cards span about 272 to 1008 px).

## Current

`app/legal/page.tsx:39-91` `Section` 0 (Title, description, a centered paragraph in a `3xl` Container), `Section` 1 (an h2 Title with description and a `<SimpleGrid columns={{ base: 1, md: 2 }} gap="6">` spanning the `6xl` Section, cards from about 96 to 1184 px), `Section` 2 `colorPalette="gray"` (Questions) on a gray band (`audit/legal/1280/current.png`, y about 1010 to 1200). Column reflow moves from `Wrap`'s content-driven wrapping to the `md` breakpoint.

## Verdict

## Log

- 2026-09-26: From the ui LinkCard slice [[1cc03cfabcf2]]: the Current section above describes the cards as `@villagekit/ui@1.2.0` rendered them, fluid and filling their grid cells. The sibling's LinkCard is legacy's fixed 224 by 256 box again (item 852324855146, upstream), so once the bump plan [[99f2fe62c62f]] lands it each card sits at that size at the left of its SimpleGrid cell (at 1280 on /legal, x=96 and x=652 in cells about 530px wide) where legacy centered it in a Wrap; the page shape this item records is unchanged and still the route's to re-port.
