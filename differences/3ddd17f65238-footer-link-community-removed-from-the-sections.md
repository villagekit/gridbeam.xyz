---
title: Footer link Community removed from the sections
status: sanctioned
route: shell
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/components/footer.tsx:49-52`: `{ href: 'https://discuss.villagekit.com', isExternal: true, label: 'Community' }` under Our company.

## Current

No section link to the forum in `app/_lib/nav.ts:12-48`; the URL moved to the social row as `Community forum` (`app/_components/SiteFooter.tsx:66-72`, its own item).

## Verdict

rule: operator (5), [[9f344fbfde9a]].

## Log
