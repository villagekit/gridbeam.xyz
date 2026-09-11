---
title: Footer link About us removed
status: open
route: shell
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/components/footer.tsx:42`: `{ href: 'https://villagekit.com', isExternal: true, label: 'About us' }`.

## Current

No link to villagekit.com in `app/_lib/nav.ts:12-48` (the slogan's `Village Kit` link in `app/_components/SiteFooter.tsx:99` remains).

## Verdict

## Log
