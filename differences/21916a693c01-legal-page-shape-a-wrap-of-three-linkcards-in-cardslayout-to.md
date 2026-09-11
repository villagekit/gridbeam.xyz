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
