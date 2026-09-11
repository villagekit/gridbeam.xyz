---
title: Filter group aria-label on a roleless div
status: open
route: /stories
axis: accessibility
kind: added
---
## Legacy

No group name: `apps/gridkit/pages/stories.tsx:26` a bare `role="menubar"` box.

## Current

`app/stories/StoriesBrowser.tsx:57-58` `aria-label="Filter stories by category"` on an `HStack` (a `div` with no role), so the name reaches nothing: no named group wraps the buttons in `audit/stories/dom/current.aria.yaml:25-28`.

## Verdict

## Log
