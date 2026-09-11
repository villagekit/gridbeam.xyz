---
title: "Top nav: Tools added"
status: open
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/nav.ts:3-19` has three top items: `Designs`, `Store`, `Stories`. `/tools-and-resources` is reached from the footer only (`apps/gridkit/components/footer.tsx:27`), labelled `Tools and resources`.

## Current

`app/_lib/nav.ts:8`: `{ href: '/tools-and-resources', label: 'Tools', location: 'top' }`.

## Verdict

## Log
