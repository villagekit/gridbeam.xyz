---
title: suppressHydrationWarning on the html element
status: regression
route: shell
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/_document.tsx:12`: `<Html lang="en">`, no hydration suppression.

## Current

`app/layout.tsx:63-66`: `<html lang="en" suppressHydrationWarning className={...}>`. Nothing in `@villagekit/ui@1.2.0 src/Provider.tsx` (a bare `ChakraProvider`, no `next-themes`) requires it.

## Verdict

## Log

- 2026-09-13: 2026-09-13: Confirmed regression. Empirical check found no source of hydration mismatch on this app's <html> element (only next/font's deterministic classes; Provider is a bare ChakraProvider, no next-themes) — no warning with or without the prop, dev and a production build, 5 routes. Drop it; a closing plan removes the prop.
