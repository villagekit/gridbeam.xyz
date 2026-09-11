---
title: "Footer envelope link: Newsletter (/subscribe) to Email (/contact)"
status: open
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/components/footer.tsx:61-66`: `{ Icon: FaEnvelope, href: '/subscribe', isExternal: false, label: 'Newsletter' }`. The lock's source `apps/villagekit/components/footer.tsx:46-51` has the same entry.

## Current

`app/_components/SiteFooter.tsx:28`: `{ href: '/contact', label: 'Email', icon: <FaEnvelope /> }`.

## Verdict

## Log

- 2026-09-12: The footer lock keeps the social row as `apps/villagekit` lists it, and that list has the envelope going to `/subscribe` as `Newsletter`. No rule covers the retarget.

- 2026-09-12: Moved to open (review): copy stays the operator's whatever the lock says about its neighbours; the lock's list is the evidence for the grilling.
