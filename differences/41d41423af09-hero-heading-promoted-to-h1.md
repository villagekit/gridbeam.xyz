---
title: Hero heading promoted to h1
status: regression
route: /
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:87` `<Heading size="2xl">` with no `as`, an `h2` like every heading on the route; no `level=1` in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/page.tsx:116` `<Heading as="h1" ...>`; `heading "Anyone can be a maker." [level=1]` in `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: Regression by rule absence; the operator may sanction under rule 5.
