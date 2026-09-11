---
title: "Filters-to-grid spacing: 8/16 to 6/10"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/stories.tsx:11,28` `useBreakpointValue({ base: 8, md: 16 })` on the `VStack spacing`.

## Current

`app/stories/StoriesBrowser.tsx:56` `<VStack gap={{ base: 6, md: 10 }} alignItems="stretch">`. From code.

## Verdict

## Log
