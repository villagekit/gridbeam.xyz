---
title: "Step 1: our catalogue to the catalogue, period added"
status: regression
route: /
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/index.tsx:227-232` "Browse designs from our catalogue, or imagine your own" (link "our catalogue" to `/designs`).

## Current

`app/page.tsx:219-224` "Browse designs from the catalogue, or imagine your own." (link "the catalogue" to `/designs`).

## Verdict

## Log

- 2026-09-25: Regression (grilling Q7, [[6fce53c0a18e]]). Ships as "Browse designs from our catalog, or imagine your own", link on "our catalog", no period. American spelling per the decision.
