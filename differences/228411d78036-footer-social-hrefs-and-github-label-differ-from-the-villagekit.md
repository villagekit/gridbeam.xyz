---
title: Footer social hrefs and GitHub label differ from the villagekit list the lock cites
status: open
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/villagekit/components/footer.tsx:52-88` (the list the footer lock cites): `Mastodon` https://sunrise.social/villagekit; `Github` https://www.github.com/villagekit. The gridkit footer (`apps/gridkit/components/footer.tsx:69,116-120`) had `https://sunrise.social/gridkit` and `Github` https://www.github.com/villagekit.

## Current

`app/_components/SiteFooter.tsx:30`: `https://sunrise.social/@villagekit`; `:60-61`: label `GitHub`, `https://github.com/villagekit`.

## Verdict

## Log

- 2026-09-12: The lock covers the accounts as `apps/villagekit` lists them; these three values differ from that list and no rule covers the difference.

- 2026-09-12: Moved to open (review): copy stays the operator's; the lock's list is the evidence for the grilling.
