---
title: GitHub Issues URL overflows the text column at 375
status: open
route: /legal/privacy-policy
axis: visual
kind: added
---
## Legacy

No such link in the legacy policy (`packages/applet-legal/src/mdx/privacy-policy.mdx`: the contact links read "contact us").

## Current

`app/legal/privacy-policy/page.tsx:193-200` the `Link` "github.com/villagekit/gridbeam.xyz/issues" has no `wordBreak`: in `audit/legal__privacy-policy/375/current.png` (rows about 3703 to 3714) its ink reaches x=353 where the text column ends at x=342.

## Verdict

## Log

- 2026-09-12: Found by the Parity review of plan 848b026f; a sibling of 90f294279f16 on `/contact`. The link sits in the added Your rights section, which the operator judges.
