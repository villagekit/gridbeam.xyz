---
title: Custom 404 page replaces Next's default
status: accepted
date: 2026-09-13
---

## Context

Legacy had no `404.tsx`; an unknown path served Next's stock pages-router error page, unbranded and with no way back onto the site. The current build added a shell-wrapped `app/not-found.tsx` with its own heading, paragraph, title, meta description and two buttons. The copy grilling (`e2805adefd47`) reviewed all of it as one page, not as separate unrelated additions.

## Decision

Keep the custom 404 page. Plain English throughout, no em dash (`64ee4dfa393d`): heading `404: page not found`, paragraph `That page isn't here. It may have moved, or never existed.`, buttons `Home` and `Browse designs`.

## Consequences

`02bdafcfc345`, `135a0cf0996f`, `875936172cc5`, `ba3e8b25688f`, `047946115b35` and `fb5b26b56721` are sanctioned against this decision, rule 5. `fb5b26b56721`'s Verdict quotes the corrected heading (the drafted current text used an em dash the operator rejected).
