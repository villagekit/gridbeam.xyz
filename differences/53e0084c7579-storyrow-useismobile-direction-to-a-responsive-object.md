---
title: "StoryRow: useIsMobile direction to a responsive object"
status: regression
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/story/story-row.tsx:2,17-22` `useIsMobile()` (a JS breakpoint hook with an `md` fallback before hydration) picks `column`, `row` or `row-reverse`; `<Row index direction spacing={[4, null, 12]}>`.

## Current

`app/_components/story/StoryRow.tsx:1,18-23` `'use client'`, `direction={{ base: 'column', md: isEven ? 'row' : 'row-reverse' }}`, `gap={{ base: 4, md: 12 }}`.

## Verdict

## Log

- 2026-09-12: Story page template; the same pattern as 5bb93411f90e on `/`.
