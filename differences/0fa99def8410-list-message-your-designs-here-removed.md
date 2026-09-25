---
title: List message Your designs here… ✨ removed
status: regression
route: /designs
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/pages/designs/index.tsx:77-84` `listMessage={<>Your designs here…{' '}<span role="img" aria-label="sparkle">✨</span></>}`, rendered after the grid by `components/catalogue/list.tsx:99-121` with a 0.5 s delayed fade-in that replays on every filter, search or sort change (`hideComingSoon`, `list.tsx:37-43`); `audit/designs/dom/legacy.txt` `Your designs here… ✨`.

## Current

`app/_components/design/DesignsBrowser.tsx:17-27` passes no `listMessage`; `app/_components/catalogue/Catalogue.tsx:261-273` renders the slot only when given, so nothing follows the grid (`audit/designs/dom/current.txt`).

## Verdict

## Log

- 2026-09-25: Regression (designs grilling D2). The list message "Your designs here… ✨" returns after the grid with legacy's delayed fade-in.
