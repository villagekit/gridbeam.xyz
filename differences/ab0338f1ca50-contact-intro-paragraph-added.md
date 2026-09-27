---
title: Contact intro paragraph added
status: fixed
route: /contact
axis: copy
kind: added
---
## Legacy

No paragraph: the page body is one `LinkCard` (`packages/applet-contact/src/pages/contact.tsx:14-23`).

## Current

`app/contact/page.tsx:41-44` "We'd love to hear from suppliers wanting to be listed, contributors with patches or ideas, and anyone with questions about the system or the catalogue."

## Verdict

plan 25e9376e0f72

## Log

- 2026-09-25: Regression (contact grilling K3). Removed; legacy's route is the heading and one email card.
