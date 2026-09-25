---
title: Stories title description rewritten
status: regression
route: /stories
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/stories.tsx:17-22` `<Title description="Discover all things Grid Kit in our collection of articles, guides, and newsletters.">Stories</Title>`; `audit/stories/dom/legacy.txt:9`.

## Current

`app/stories/page.tsx:10-11,37` `pageDescription = 'Build logs, field reports, and explainers from people working with grid beam.'`; `audit/stories/dom/current.txt:11`.

## Verdict

## Log

- 2026-09-25: Regression (stories grilling I1). Ships as legacy with the rule 1 swap: "Discover all things grid beam in our collection of articles, guides, and newsletters."
