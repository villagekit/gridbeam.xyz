---
title: "Stories content width: Container 8xl to Section 5xl with a 4xl Container"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/stories.tsx:24` one `<Container maxW="8xl">` around the filters and the list; the grid runs near the full width at 1280 in `audit/stories/1280/legacy.png`.

## Current

`app/stories/page.tsx:36,41` `<Section index={0} maxW="5xl">` around the Title and a nested `<Container maxW="4xl">` around the browser; a narrower centred grid in `audit/stories/1280/current.png`.

## Verdict

## Log
