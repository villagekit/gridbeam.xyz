---
title: "Start building button: Read the FAQ"
status: regression
route: /about
axis: copy
kind: added
---
## Legacy

No such section: the legacy page ends after the tri-joint caption (`apps/gridkit/pages/about.tsx:109-117`).

## Current

`app/about/page.tsx:209-211` "Read the FAQ" (to `/faq`).

## Verdict

## Log

- 2026-09-25: Regression (about grilling A6). The "Start building" section is removed; legacy ends after the tri-joint caption.
