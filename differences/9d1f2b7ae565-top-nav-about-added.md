---
title: "Top nav: About added"
status: sanctioned
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/nav.ts:3-19` has three top items: `Designs`, `Store`, `Stories`. `/about` is reached from the footer only (`apps/gridkit/components/footer.tsx:25`).

## Current

`app/_lib/nav.ts:4`: `{ href: '/about', label: 'About', location: 'top' }`.

## Verdict

rule: operator (5), [[c21b7e35f0c7]]. About is one of the three pages promoted.

## Log
