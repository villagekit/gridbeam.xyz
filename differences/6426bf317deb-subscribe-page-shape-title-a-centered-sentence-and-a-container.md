---
title: "Subscribe page shape: Title, a centered sentence and a container.sm form to two Sections, the second tinted gray"
status: regression
route: /subscribe
axis: visual
kind: changed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:32-64` `Title`, then `<Container maxW="container.md"><VStack spacing={[8, null, 12]}>` holding the centered sentence and the form, itself in `container.sm` (`component.tsx:111`); one flow, one width, a single pink `size="lg" variant="primary"` button at the end (`component.tsx:166-174`), no icons (`audit/subscribe/1280/legacy.png`).

## Current

`app/subscribe/page.tsx:36-79` `Section` 0 `maxW="6xl"` (Title and a `3xl` Container of text) then `Section` 1 `maxW="6xl" colorPalette="gray"` (an h2 Title and a `<SimpleGrid columns={{ base: 1, md: 2 }} gap="6">` of two dashed `LinkCard`s with pink `FaEnvelope` and `FaGithub` icons, one column at 375, two from 768); the gray band starts about y=620 in `audit/subscribe/1280/current.png`.

## Verdict

## Log

- 2026-09-26: From the ui LinkCard slice [[1cc03cfabcf2]]: the Current section above describes the cards as `@villagekit/ui@1.2.0` rendered them, fluid and filling their grid cells. The sibling's LinkCard is legacy's fixed 224 by 256 box again (item 852324855146, upstream), so once the bump plan [[99f2fe62c62f]] lands it each card sits at that size at the left of its SimpleGrid cell (at 1280 on /legal, x=96 and x=652 in cells about 530px wide) where legacy centered it in a Wrap; the page shape this item records is unchanged and still the route's to re-port.
