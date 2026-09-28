---
title: "Subscribe page shape: Title, a centered sentence and a container.sm form to two Sections, the second tinted gray"
status: fixed
route: /subscribe
axis: visual
kind: changed
---
## Legacy

`packages/applet-subscribe/src/page.tsx:32-64` `Title`, then `<Container maxW="container.md"><VStack spacing={[8, null, 12]}>` holding the centered sentence and the form, itself in `container.sm` (`component.tsx:111`); one flow, one width, a single pink `size="lg" variant="primary"` button at the end (`component.tsx:166-174`), no icons (`audit/subscribe/1280/legacy.png`).

## Current

`app/subscribe/page.tsx:36-79` `Section` 0 `maxW="6xl"` (Title and a `3xl` Container of text) then `Section` 1 `maxW="6xl" colorPalette="gray"` (an h2 Title and a `<SimpleGrid columns={{ base: 1, md: 2 }} gap="6">` of two dashed `LinkCard`s with pink `FaEnvelope` and `FaGithub` icons, one column at 375, two from 768); the gray band starts about y=620 in `audit/subscribe/1280/current.png`.

## Verdict

plan 244b962caae9

## Log

- 2026-09-26: From the ui LinkCard slice [[1cc03cfabcf2]]: the Current section above describes the cards as `@villagekit/ui@1.2.0` rendered them, fluid and filling their grid cells. The sibling's LinkCard is legacy's fixed 224 by 256 box again (item 852324855146, upstream), so once the bump plan [[99f2fe62c62f]] lands it each card sits at that size at the left of its SimpleGrid cell (at 1280 on /legal, x=96 and x=652 in cells about 530px wide) where legacy centered it in a Wrap; the page shape this item records is unchanged and still the route's to re-port.

- 2026-09-28: The Parity review of the removals slice (plan eb43bbfbe5f2) named this item's gap precisely: at 1280 and 768 the current h1 sits about 48px lower than legacy (about y=198 vs y=150) and the heading-to-sentence gap is about 95px vs legacy's 63px; at 375 the content column is narrower, so the h1 wraps to two lines and the sentence wraps at about 280px against legacy's 343px. Compare audit/subscribe/1280/{legacy,current}.png and audit/subscribe/375/{legacy,current}.png. Still the re-port's (244b962caae9) to close.
