---
title: "Story card: stories Item to StoryCard"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:1-111` `HoverCardContainer` > `LinkBox` > `Container maxW="md"`; ui-media `Image` inline; `capitalize(category)` from `lodash-es` and `StoryCategoryColors` from `@/stories`; a `showDate` prop; `publishedAt` a `Date`.

## Current

`app/_components/StoryCard.tsx:1-114` `LinkBox as="article"`; hand-written `_hover`/`_focusWithin`; a `StoryImage` child; local `categoryLabels` and `categoryPalettes` maps; no `showDate`; `publishedAt` a string.

## Verdict

## Log

- 2026-09-12: A `StoryCard` difference, filed on `/` where first met; the stories ledger cites it.
