---
title: Email the maintainer card added
status: regression
route: /subscribe
axis: copy
kind: added
---
## Legacy

None on the route.

## Current

`app/subscribe/page.tsx:64-70` `LinkCard` `title="Email the maintainer"`, `icon={<FaEnvelope />}`, `description="Drop a quick note via the contact page and ask to be told when signups open. Same channel for any other newsletter questions."`, `href="/contact"`, `linkComponent={NextLink}`.

## Verdict

## Log

- 2026-09-25: Regression (subscribe grilling S4). Removed; legacy's route is the heading, one sentence and the form.
