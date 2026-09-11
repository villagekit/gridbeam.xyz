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
