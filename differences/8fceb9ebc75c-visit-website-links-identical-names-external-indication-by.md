---
title: "Visit website links: identical names, external indication by attributes only"
status: open
route: /suppliers
axis: accessibility
kind: added
---
## Legacy

Absent: no legacy `/suppliers`.

## Current

`app/suppliers/page.tsx:200-202` renders `link "Visit website"` twice (`audit/suppliers/dom/current.aria.yaml`) with nothing per supplier in the name; `isExternal` gives `target="_blank" rel="noopener noreferrer"` and no icon or "opens in a new tab" text (`@villagekit/ui@1.2.0 src/components/LinkButton.tsx:28-29`).

## Verdict

## Log
