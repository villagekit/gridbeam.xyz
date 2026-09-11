---
title: CSSReset removed
status: sanctioned
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:89`: `<CSSReset />` from `@villagekit/ui`.

## Current

`@villagekit/ui@1.2.0 src/index.ts` exports no `CSSReset`; Chakra v3's `ChakraProvider` (inside `src/Provider.tsx`) carries the preflight.

## Verdict

rule: upgrade (Chakra v3 has no CSSReset; the reset ships with its provider)

## Log
