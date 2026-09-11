---
title: "Privacy policy heading outline: h1, h3, h4 to h1, h2, h3"
status: regression
route: /legal/privacy-policy
axis: accessibility
kind: changed
---
## Legacy

`audit/legal__privacy-policy/dom/legacy.aria.yaml`: `heading "Privacy policy" [level=1]` then `heading "Personal information we collect" [level=3]`, two `[level=4]`, and eight more `[level=3]`; no level 2 (`packages/applet-legal/src/mdx/privacy-policy.mdx:1,18,43,57,65-105`).

## Current

`audit/legal__privacy-policy/dom/current.aria.yaml:26,34`: `[level=1]`, six `[level=2]`, five `[level=3]` under "What we do collect"; no skipped level (`app/legal/privacy-policy/page.tsx:40,49,73,77-137,148-218`).

## Verdict

## Log

- 2026-09-12: Regression by the rule's absence; the legacy outline skips a level and the current one does not, which the operator may weigh under rule 5.
