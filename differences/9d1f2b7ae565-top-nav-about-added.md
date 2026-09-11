---
title: "Top nav: About added"
status: open
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/nav.ts:3-19` has three top items: `Designs`, `Store`, `Stories`. `/about` is reached from the footer only (`apps/gridkit/components/footer.tsx:25`).

## Current

`app/_lib/nav.ts:4`: `{ href: '/about', label: 'About', location: 'top' }`.

## Verdict

## Log
