---
title: Per-page getLayout to the app-router root layout
status: sanctioned
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/_app.tsx:40`: `const getLayout = Component.getLayout ?? ((page) => page)`; pages set `Page.getLayout` (e.g. `apps/gridkit/pages/stories.tsx:38-40`).

## Current

`app/layout.tsx:61-87`: one root layout wraps every route in `MainLayout`.

## Verdict

rule: upgrade (the app router's layouts replace the pages router's getLayout)

## Log
