---
title: GitHub Issues URL overflows the text column at 375
status: open
route: /legal
axis: visual
kind: added
---
## Legacy

No such link on legacy `/legal` (three `LinkCard`s, `packages/applet-legal/src/pages/legal.tsx:22-56`).

## Current

`app/legal/page.tsx:79-86` the `Link` "github.com/villagekit/gridbeam.xyz/issues" has no `wordBreak`: in `audit/legal/375/current.png` (rows about 1448 to 1459) its ink reaches x=353 where the text column ends at x=342 and prose stops by x=314, and the closing "." wraps alone to the next line.

## Verdict

## Log

- 2026-09-12: Found by the Parity review of plan 848b026f; a sibling of 90f294279f16 on `/contact`. The link belongs to the added Questions section, which the operator judges; the defect goes with it.
