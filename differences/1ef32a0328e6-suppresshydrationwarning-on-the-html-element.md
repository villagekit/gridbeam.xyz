---
title: suppressHydrationWarning on the html element
status: open
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
