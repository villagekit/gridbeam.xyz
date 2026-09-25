---
title: Subscribe paragraph 2 added
status: regression
route: /subscribe
axis: copy
kind: added
---
## Legacy

None on the route.

## Current

`app/subscribe/page.tsx:46-50` "The plan is to use <em>Buttondown</em> as the email provider: independent, privacy-friendly, no tracking pixels. No signup form is wired up yet, and there's no audience pressure to rush one."

## Verdict

## Log

- 2026-09-12: Note 526d5330 lists the "no audience pressure" clause among the rewrites never presented to the operator; it holds and is this item.

- 2026-09-25: Regression (subscribe grilling S4). Removed; legacy's route is the heading, one sentence and the form.
