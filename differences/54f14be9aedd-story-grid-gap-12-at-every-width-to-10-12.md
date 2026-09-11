---
title: "Story grid gap: 12 at every width to 10/12"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/list.tsx:30` `<SimpleGrid columns={columns} spacing="12">`.

## Current

`app/stories/StoriesBrowser.tsx:74` and `app/stories/StoriesStatic.tsx:18` `gap={{ base: 10, md: 12 }}`. From code.

## Verdict

## Log
