---
title: "Story card hover: HoverCardContainer to a bespoke scale"
status: regression
route: /
axis: interaction
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:37` `<HoverCardContainer as="section">`: scale 1.05 on hover and the `accentB` recolor of nested hover cards, `outlineColor` border on focus-within (`@villagekit/ui@0.9.0 src/components/HoverCard.tsx:68-90`); `:41-47` `outlineLarge` shadow on the image.

## Current

`app/_components/StoryCard.tsx:49-59` `LinkBox` with `_hover: { transform: 'scale(1.02)' }` and `_focusWithin` shadow on the image only. From code.

## Verdict

## Log

- 2026-09-12: A `StoryCard` difference, filed on `/` where first met; the stories ledger cites it.
