---
title: "Visit website links: identical names, external indication by attributes only"
status: fixed
route: /suppliers
axis: accessibility
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:200-202` renders `link "Visit website"` twice (`audit/suppliers/dom/current.aria.yaml`) with nothing per supplier in the name; `isExternal` gives `target="_blank" rel="noopener noreferrer"` and no icon or "opens in a new tab" text (`@villagekit/ui@1.2.0 src/components/LinkButton.tsx:28-29`).

## Verdict

plan 3ba33b316c3c

## Log

- 2026-09-25: Regression (suppliers grilling Q7). Moot after the re-port: the name is the link, so each link's name is the supplier's.
