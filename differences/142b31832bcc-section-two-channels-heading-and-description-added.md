---
title: Section Two channels heading and description added
status: regression
route: /contact
axis: copy
kind: added
---
## Legacy

No second heading on the route (`packages/applet-contact/src/pages/contact.tsx:14-31`).

## Current

`app/contact/page.tsx:49-51` `<Title as="h2" description="Email for private notes. GitHub for anything public.">Two channels</Title>`.

## Verdict

## Log

- 2026-09-25: Regression (contact grilling K3). Removed; legacy's route is the heading and one email card.
