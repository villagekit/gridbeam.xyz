---
title: Preconnect to res.cloudinary.com removed
status: fixed
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:85`: `<link rel="preconnect" href="https://res.cloudinary.com" />` (the `analytics.mikey.nz` preconnect at `:86` goes with Matomo).

## Current

No preconnect link in `app/layout.tsx`.

## Verdict

plan ffe8e5d5

## Log
