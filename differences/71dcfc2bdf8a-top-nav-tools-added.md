---
title: "Top nav: Tools added"
status: sanctioned
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/nav.ts:3-19` has three top items: `Designs`, `Store`, `Stories`. `/tools-and-resources` is reached from the footer only (`apps/gridkit/components/footer.tsx:27`), labelled `Tools and resources`.

## Current

`app/_lib/nav.ts:8`: `{ href: '/tools-and-resources', label: 'Tools', location: 'top' }`.

## Verdict

rule: operator (5), [[c21b7e35f0c7]]. Store's removal leaves room in the top nav; Tools is one of the three pages promoted.

## Log

- 2026-09-26: Current is stale since plan 63e9c753ca55 reordered the nav to decision c21b7e35f0c7's four items: the Tools entry is now app/_lib/nav.ts:5. The Verdict stands.
