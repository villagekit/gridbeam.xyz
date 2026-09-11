---
title: "404 page: Next default error page to a shell-wrapped custom page"
status: open
route: shell
axis: visual
kind: added
---
## Legacy

No `apps/gridkit/pages/404.tsx`. The live site serves Next's built-in error page for an unknown path: `<h1 class="next-error-h1">404</h1>` and `This page could not be found.`, `<title>404: This page could not be found</title>`, no header, nav, footer or theme.

## Current

`app/not-found.tsx:1-69`: rendered inside `MainLayout` (header, nav, footer, skip target), a decorative inline SVG, `robots: { index: false, follow: false }`, two `LinkButton`s. Its text blocks are their own copy items.

## Verdict

## Log
