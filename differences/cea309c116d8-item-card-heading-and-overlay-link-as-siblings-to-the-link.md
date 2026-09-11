---
title: "Item card: heading and overlay link as siblings to the link nested inside the heading"
status: regression
route: /designs
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue/item.tsx:85-97` `<Heading id=...>{name}</Heading>` then an empty `<LinkOverlay as={NextLink} href=... aria-labelledby=... />` (`audit/designs/dom/legacy.aria.yaml`: `heading "Bed Frame" [level=2]` and `link "Bed Frame"` as siblings).

## Current

`app/_components/catalogue/ItemCard.tsx:70-85` `<Heading id=...><LinkOverlay ... aria-labelledby=...>{name}</LinkOverlay></Heading>` (`audit/designs/dom/current.aria.yaml`: `heading "Bed Frame" [level=2]:` > `link "Bed Frame"`).

## Verdict

## Log
