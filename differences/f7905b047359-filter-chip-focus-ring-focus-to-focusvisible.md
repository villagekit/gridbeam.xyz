---
title: "Filter chip focus ring: _focus to _focusVisible"
status: regression
route: /stories
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/option.tsx:47-50` `_focus: { boxShadow: theme.shadows.outline, outline: 'none' }`, shown on any focus.

## Current

`app/stories/StoriesBrowser.tsx:126` `_focusVisible={{ outline: 'none', boxShadow: 'outline' }}`, keyboard focus only. From code.

## Verdict

## Log
