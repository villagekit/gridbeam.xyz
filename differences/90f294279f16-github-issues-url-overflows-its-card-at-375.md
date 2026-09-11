---
title: GitHub Issues URL overflows its card at 375
status: open
route: /contact
axis: visual
kind: added
---
## Legacy

No such link on legacy `/contact` (one email `LinkCard`, `packages/applet-contact/src/pages/contact.tsx:16-21`).

## Current

`app/contact/page.tsx:95-102` the `Link` "github.com/villagekit/gridbeam.xyz/issues" has no `wordBreak` (the email link above it sets `wordBreak: 'break-all'`, `:74`): in `audit/contact/375/current.png` the text runs from x=41 past the card's edge at about x=360, through the card's `p="6"` padding.

## Verdict

## Log

- 2026-09-12: Found by the Parity review of plan 848b026f. An `added` card with a layout defect: the operator judges the card; the defect goes with it.
