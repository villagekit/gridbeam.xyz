---
title: Story list animation on filter change removed
status: regression
route: /stories
axis: interaction
kind: removed
---
## Legacy

`apps/gridkit/components/stories/list.tsx:9-45` each card a `motion(Box)` with `layout` and `itemVariants` (hidden: opacity 0, scale 0.75; visible: opacity 1, scale 1; 0.3s tween) inside `<AnimatePresence>`: cards fade and scale out and in, and the grid reflows, when a filter is chosen.

## Current

`app/stories/StoriesBrowser.tsx:74-78` `filteredStories.map(...)` in a plain `SimpleGrid`; no motion, no transition. From code.

## Verdict

## Log
