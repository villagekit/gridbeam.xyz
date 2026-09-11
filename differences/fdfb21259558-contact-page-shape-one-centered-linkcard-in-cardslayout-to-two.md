---
title: "Contact page shape: one centered LinkCard in CardsLayout to two Sections, the second tinted gray"
status: regression
route: /contact
axis: visual
kind: changed
---
## Legacy

`packages/ui-page/src/components/layouts/CardsLayout.tsx:21-27` `Title`, then `<Container maxW="container.md"><Wrap spacing={8} justify="center">` holding the one `LinkCard` (`packages/applet-contact/src/pages/contact.tsx:16-21`); one flat white page, `audit/contact/1280/legacy.png`.

## Current

`app/contact/page.tsx:38-105` `<Section index={0} maxW="6xl">` (Title, intro paragraph in a `3xl` Container) then `<Section index={1} maxW="6xl" colorPalette="gray">` (an h2 Title and a `VStack maxW="3xl"` of two full-width cards) on a gray band from about y=450 to 1213 in `audit/contact/1280/current.png`.

## Verdict

## Log
