---
title: Filter selected state exposed with aria-pressed
status: open
route: /stories
axis: accessibility
kind: added
---
## Legacy

`apps/gridkit/components/option.tsx:64-69` `isSelected` drives styling only; `audit/stories/dom/legacy.aria.yaml:26-29` no option carries `[selected]`.

## Current

`app/stories/StoriesBrowser.tsx:99-101` `aria-pressed={selected}`; `audit/stories/dom/current.aria.yaml:25` `button "All" [pressed]`.

## Verdict

## Log
