---
title: Story card date shown on the home page
status: open
route: /
axis: visual
kind: added
---
## Legacy

`apps/gridkit/pages/index.tsx:302-303` `showDate={false}`; `apps/gridkit/components/stories/item.tsx:88-96` renders the date only when `showDate`.

## Current

`app/_components/StoryCard.tsx:42-46,101-103` always renders `formattedDate` ("29 Nov 2024"); `audit/_root/1280/current.png`. Legacy's format is `day/month/year` numeric; current's is `month: 'short'`.

## Verdict

## Log

- 2026-09-12: A `StoryCard` difference, filed on `/` where first met; the stories ledger cites it.
