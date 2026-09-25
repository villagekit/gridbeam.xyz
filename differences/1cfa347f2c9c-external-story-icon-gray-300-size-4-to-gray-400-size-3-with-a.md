---
title: "External story icon: gray.300 size 4 to gray.400 size 3 with a top margin"
status: fixed
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/item.tsx:98` `sx={{ color: 'gray.300' }} boxSize="4"`.

## Current

`app/_components/StoryCard.tsx:104-108` `color="gray.400" boxSize="3" mt="1"`. From code.

## Verdict

plan e332105c3b52: <Icon as={FaExternalLinkAlt} css={{ color: 'gray.300' }} boxSize="4" />, legacy's line; measured on pnpm dev, /stories at 1280: 16px by 16px, gray.300 (the v3 literal rgb(212, 212, 216) against legacy's rgb(203, 213, 224), the palette's upstream items).

## Log
