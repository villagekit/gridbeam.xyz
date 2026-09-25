---
title: "Tools and resources page shape: one centered LinkCard in CardsLayout to three Sections with two card grids"
status: regression
route: /tools-and-resources
axis: visual
kind: changed
---
## Legacy

`CardsLayout.tsx:21-27` `Title` then `<Container maxW="container.md"><Wrap spacing={8} justify="center">` holding the one fixed-size card, the same at 375, 768 and 1280 (`audit/tools-and-resources/{375,768,1280}/legacy.png`).

## Current

`app/tools-and-resources/page.tsx:115-163` `Section` 0 `maxW="6xl"` (Title, description, a centered paragraph in a `3xl` Container), `Section` 1 `colorPalette="gray"` (h2 Title, `<SimpleGrid columns={{ base: 1, md: 3 }} gap="6">` of three cards on a gray band), `Section` 2 (h2 Title, `<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">` of five cards); one column at 375, three and two at 768, three and three at 1280 (`audit/tools-and-resources/{375,768,1280}/current.png`).

## Verdict

## Log

- 2026-09-26: From the ui LinkCard slice [[1cc03cfabcf2]]: the Current section above describes the cards as `@villagekit/ui@1.2.0` rendered them, fluid and filling their grid cells. The sibling's LinkCard is legacy's fixed 224 by 256 box again (item 852324855146, upstream), so once the bump plan [[99f2fe62c62f]] lands it each card sits at that size at the left of its SimpleGrid cell (at 1280 on /legal, x=96 and x=652 in cells about 530px wide) where legacy centered it in a Wrap; the page shape this item records is unchanged and still the route's to re-port.
