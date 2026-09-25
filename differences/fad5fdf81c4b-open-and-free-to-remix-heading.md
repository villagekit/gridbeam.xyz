---
title: Open and free to remix heading
status: regression
route: /
axis: copy
kind: added
---
## Legacy

No such section: the legacy page ends with "A place to share ideas" (`apps/gridkit/pages/index.tsx:341-371`).

## Current

`app/page.tsx:385-390` `<Title as="h2" ...>Open and free to remix</Title>`.

## Verdict

## Log

- 2026-09-25: Regression (grilling Q13). The "Open and free to remix" section is removed; the page ends at "A place to share ideas" as legacy does.
