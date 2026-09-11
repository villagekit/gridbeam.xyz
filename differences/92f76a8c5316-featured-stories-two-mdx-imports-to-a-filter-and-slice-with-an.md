---
title: "Featured stories: two MDX imports to a filter and slice with an empty guard"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:48-49,302-303` `metadata` imported from `whats-a-grid-unit.mdx` and `building-with-grid-kit.mdx`, rendered in that order.

## Current

`app/page.tsx:95-97,266` `getAllStories().filter((story) => story.metadata.category === 'guide').slice(0, 3)` (`app/_lib/stories.ts:181-185`, newest first) and `{featuredStories.length > 0 && ...}` around the section.

## Verdict

## Log
