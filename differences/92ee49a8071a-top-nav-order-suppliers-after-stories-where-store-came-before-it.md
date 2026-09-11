---
title: "Top nav order: Suppliers after Stories where Store came before it"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/nav.ts:3-19`: `Designs`, `Store`, `Stories`; Store second (`audit/_root/1280/legacy.png`, header).

## Current

`app/_lib/nav.ts:4-9`: `About`, `Designs`, `Stories`, `Suppliers`, `Tools`, `Contact`; Suppliers fourth, after Stories (`audit/_root/1280/current.png`, header; the same order in the mobile list).

## Verdict

## Log

- 2026-09-12: Follows the nav additions (open items) and the Store to Suppliers swap (`191e28561c6d`, sanctioned); the position itself no rule covers.
