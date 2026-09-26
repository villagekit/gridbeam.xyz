---
title: "Caption 1: modular system based on a 40mm grid to modular system on a 40 mm grid"
status: fixed
route: /about
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/about.tsx:18-24` "Grid Kit is a modular system based on a 40mm grid." (bold "modular system based on a 40mm grid").

## Current

`app/about/page.tsx:69-71` "Grid beam is a modular system on a 40 mm grid." (bold "modular system on a 40&nbsp;mm grid").

## Verdict

plan 51766466

## Log

- 2026-09-12: Rule 1 covers the brand swap only.

- 2026-09-25: Regression (about grilling A3). Ships as legacy with the rule 1 swap: "Grid beam is a modular system based on a 40mm grid.", bold on "modular system based on a 40mm grid".
