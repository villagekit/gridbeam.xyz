---
title: "Filter row: left-aligned to centred"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/components/stories/filters.tsx:20-27` `<HStack ... alignItems="center">` with no `justifyContent`: the chips start at the container's left edge, `audit/stories/1280/legacy.png`.

## Current

`app/stories/StoriesBrowser.tsx:57-61` `justifyContent="center"`; the chips are centred, `audit/stories/1280/current.png`.

## Verdict

## Log
