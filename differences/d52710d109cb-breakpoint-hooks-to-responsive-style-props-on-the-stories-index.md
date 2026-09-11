---
title: Breakpoint hooks to responsive style props on the stories index
status: regression
route: /stories
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories.tsx:11` `useBreakpointValue` for the stack spacing; `apps/gridkit/components/stories/filters.tsx:17` `useIsMobile` for chip size and gap; `apps/gridkit/components/stories/list.tsx:27` `useBreakpointValue` for the columns.

## Current

`app/stories/StoriesBrowser.tsx:56,60,74,113` responsive objects (`{ base, md }`) throughout.

## Verdict

## Log

- 2026-09-12: The same pattern as 5bb93411f90e on `/`.
