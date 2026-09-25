---
title: "Open and free to remix button: GitHub"
status: regression
route: /
axis: copy
kind: added
---
## Legacy

No such section: the legacy page ends with "A place to share ideas" (`apps/gridkit/pages/index.tsx:341-371`).

## Current

`app/page.tsx:398-400` "GitHub" (to `https://github.com/villagekit`, new tab).

## Verdict

## Log

- 2026-09-25: Regression (grilling Q13). The "Open and free to remix" section is removed; the page ends at "A place to share ideas" as legacy does.
