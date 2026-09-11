---
title: Document title template and default title
status: open
route: shell
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:47-48`: `titleTemplate="Grid Kit: %s"`, `defaultTitle="Grid Kit"`. Rendered `<title>Grid Kit</title>` on `/`.

## Current

`app/layout.tsx:30-33`: `title: { default: 'gridbeam.xyz', template: '%s — gridbeam.xyz' }`. Rendered `<title>About grid beam — gridbeam.xyz</title>` on `/about`.

## Verdict

## Log

- 2026-09-12: Copy: the rebrand rule names the domain, not the template's shape (prefix to suffix with an em dash) or the default title (`Grid Kit` would become `Grid Beam`, not `gridbeam.xyz`). The operator judges.
