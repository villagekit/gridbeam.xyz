---
title: Footer link GitHub added to the sections
status: dismissed
route: shell
axis: copy
kind: added
---
## Legacy

`apps/gridkit/components/footer.tsx:21-58` has no GitHub section link; GitHub is a social icon only (`:115-120`).

## Current

`app/_lib/nav.ts:33-37`: `{ href: 'https://github.com/villagekit', label: 'GitHub', isExternal: true }` under Connect.

## Verdict

Not shipping: [[9f344fbfde9a]] explicitly excludes a footer-section GitHub link, since it's already a social icon in the row below and listing it twice is clutter with no payoff.

## Log
