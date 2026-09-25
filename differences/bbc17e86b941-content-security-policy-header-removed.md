---
title: Content-Security-Policy header removed
status: fixed
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/next.config.mjs:4-8,50-62`: `headers()` sets `Content-Security-Policy: default-src *; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: data: blob:; style-src 'self' 'unsafe-inline';` on `/(.*)`.

## Current

`next.config.ts` has no `headers()`.

## Verdict

plan 4f6f086c

## Log
