---
title: "Design heading: h2 at the default size to h1 at xl and 2xl"
status: regression
route: /designs/bed-frame
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/catalogue-item/catalogue-item.tsx:84` `<Heading sx={{ textTransform: 'capitalize' }}>{item.name}</Heading>`, no `as`, no size (`audit/designs__bed-frame/dom/legacy.aria.yaml`: `heading "Bed Frame" [level=2]`; `audit/designs__bed-frame/1280/legacy.png` and `current.png`).

## Current

`app/_components/catalogue/CatalogueItem.tsx:75` `<Heading as="h1" size={{ base: 'xl', md: '2xl' }}>` (`current.aria.yaml`: `[level=1]`), visibly larger and bolder.

## Verdict

## Log

- 2026-09-12: Template.
