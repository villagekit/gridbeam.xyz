---
title: Viewport meta gains initial-scale=1
status: open
route: shell
axis: code
kind: added
---
## Legacy

`https://gridkit-landing-villagekit.vercel.app/` `<head>`: `<meta name="viewport" content="width=device-width"/>` (Next's pages-router default).

## Current

`app/layout.tsx:55-57`: `viewport: { width: 'device-width', initialScale: 1, ... }`, rendered `width=device-width, initial-scale=1`.

## Verdict

## Log
