---
title: "Filter chips: Inspiration before Newsletters to Newsletters before Inspiration"
status: regression
route: /stories
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/context/stories.tsx:14-20` `filterOptions = { all: 'All', guide: 'Guides', inspiration: 'Inspiration', newsletter: 'Newsletters' }`, iterated in that order by `apps/gridkit/components/stories/filters.tsx:28`; `audit/stories/dom/legacy.txt:11-14`.

## Current

`app/stories/StoriesBrowser.tsx:22-27` `FILTERS` in the order all, guide, newsletter, inspiration; `audit/stories/dom/current.txt:13-16`. The tab order follows (`audit/stories/dom/current.aria.yaml:25-28`).

## Verdict

## Log
