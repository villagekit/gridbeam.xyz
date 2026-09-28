---
title: Legal intro paragraph added
status: fixed
route: /legal
axis: copy
kind: added
---
## Legacy

No paragraph: the page is `Title` plus three `LinkCard`s (`packages/applet-legal/src/pages/legal.tsx:22-56`).

## Current

`app/legal/page.tsx:42-44` "gridbeam.xyz is a non-commercial educational site. We don't sell, advertise, or track."

## Verdict

plan 28f8cfbe92ea

## Log

- 2026-09-25: Regression (legal grilling L1). The intro paragraph is removed.
