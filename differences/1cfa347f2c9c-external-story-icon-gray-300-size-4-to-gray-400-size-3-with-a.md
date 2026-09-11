---
title: "External story icon: gray.300 size 4 to gray.400 size 3 with a top margin"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:98` `sx={{ color: 'gray.300' }} boxSize="4"`.

## Current

`app/_components/StoryCard.tsx:104-108` `color="gray.400" boxSize="3" mt="1"`. From code.

## Verdict

## Log
