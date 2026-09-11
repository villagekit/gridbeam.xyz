---
title: Filters, Option and List components folded into StoriesBrowser
status: regression
route: /stories
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/stories/{index.ts,filters.tsx,list.tsx}` and the generic `Option<T>` on a `Badge` in `apps/gridkit/components/option.tsx:1-76` (barrelled at `apps/gridkit/components/index.ts:7`); `List` keys cards by `story.title` (`list.tsx:34`).

## Current

`app/stories/StoriesBrowser.tsx:56-132` the chip row, a local `FilterChip` on `chakra.button` and the grid in one file; keys by `story.metadata.slug` (`:76`).

## Verdict

## Log
