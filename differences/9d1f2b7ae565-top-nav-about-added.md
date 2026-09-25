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

- 2026-09-26: Current is stale since plan 63e9c753ca55 reordered the nav to decision c21b7e35f0c7's four items: the About entry is now app/_lib/nav.ts:6. The Verdict stands.
