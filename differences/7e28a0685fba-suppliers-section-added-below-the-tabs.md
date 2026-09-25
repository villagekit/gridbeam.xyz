---
title: Suppliers section added below the tabs
status: regression
route: /designs/bed-frame
axis: visual
kind: added
---
## Legacy

The page ends after the `CatalogueItem` (`apps/gridkit/pages/designs/[id].tsx:92-121`).

## Current

`app/designs/[id]/page.tsx:61-68` a full-width `<Section index={1} colorPalette="gray">` with a paragraph and a pink `LinkButton`, no heading and no landmark, one extra tab stop in `main` on every tab (`audit/designs__bed-frame/1280/current.png`, `current.aria.yaml`).

## Verdict

## Log

- 2026-09-12: Template. Its two strings are copy items.

- 2026-09-25: Regression (design page grilling T4). The suppliers section is removed; the page ends after the tabs as legacy. Template.
