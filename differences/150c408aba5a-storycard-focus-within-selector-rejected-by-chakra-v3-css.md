---
title: StoryCard focus-within selector rejected by Chakra v3 css
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:39-47` `<Container sx={{ _focusWithin: { '.stories-item-image': { boxShadow: theme.shadows.outlineLarge } } }}>`, a class selector Chakra v2 accepts.

## Current

`app/_components/StoryCard.tsx:49-59` `css={{ _focusWithin: { '[data-story-image]': { boxShadow: 'outlineLarge' } } }}`; on `/stories` (dev server, 1280) the console reports "Using kebab-case for css properties in objects is not supported. Did you mean [dataStoryImage]?" for every card, so the focus-within image shadow depends on a selector Chakra v3 rejects.

## Verdict

## Log

- 2026-09-12: Found by the stories ledger (plan 843901f4); filed on `/` with the other StoryCard items.
