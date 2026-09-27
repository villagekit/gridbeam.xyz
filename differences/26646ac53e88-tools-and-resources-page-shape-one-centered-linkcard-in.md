---
title: "Tools and resources page shape: one centered LinkCard in CardsLayout to three Sections with two card grids"
status: fixed
route: /tools-and-resources
axis: visual
kind: changed
---
## Legacy

`CardsLayout.tsx:21-27` `Title` then `<Container maxW="container.md"><Wrap spacing={8} justify="center">` holding the one fixed-size card, the same at 375, 768 and 1280 (`audit/tools-and-resources/{375,768,1280}/legacy.png`).

## Current

`app/tools-and-resources/page.tsx:115-163` `Section` 0 `maxW="6xl"` (Title, description, a centered paragraph in a `3xl` Container), `Section` 1 `colorPalette="gray"` (h2 Title, `<SimpleGrid columns={{ base: 1, md: 3 }} gap="6">` of three cards on a gray band), `Section` 2 (h2 Title, `<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">` of five cards); one column at 375, three and two at 768, three and three at 1280 (`audit/tools-and-resources/{375,768,1280}/current.png`).

## Verdict

plan 63d3330f8e00: app/tools-and-resources/page.tsx is legacy's page again, the ui CardsLayout (Title, then Container maxW=2xl holding Wrap gap=8 justify=center) around one LinkCard, the three Sections, the two SimpleGrids and the CardEntry arrays gone; read on the pairs at 375, 768 and 1280 as the centered title over one centered card and nothing else. The card's own residuals are the shell's upstream items (852324855146, 7a92b233069a, a01b12fe36e0, 2c024e4d002a, bd05a2d3642d, 2cbb4f4b8497) and the two containers' width 8a3babf21c3c and 318456ddabc6, waiting on the publish.

## Log

- 2026-09-26: From the ui LinkCard slice [[1cc03cfabcf2]]: the Current section above describes the cards as `@villagekit/ui@1.2.0` rendered them, fluid and filling their grid cells. The sibling's LinkCard is legacy's fixed 224 by 256 box again (item 852324855146, upstream), so once the bump plan [[99f2fe62c62f]] lands it each card sits at that size at the left of its SimpleGrid cell (at 1280 on /legal, x=96 and x=652 in cells about 530px wide) where legacy centered it in a Wrap; the page shape this item records is unchanged and still the route's to re-port.
