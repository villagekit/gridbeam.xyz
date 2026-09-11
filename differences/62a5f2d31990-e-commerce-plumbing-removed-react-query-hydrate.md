---
title: "E-commerce plumbing removed: react-query, Hydrate, CartContextProvider"
status: sanctioned
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/_app.tsx:25-26,42,91-93`: `QueryClientProvider` (ESM and CJS, with the `NOTE(mw)` comment), `Hydrate state={pageProps.dehydratedState}`; `:13,95`: `CartContextProvider` from `@/context/cart`.

## Current

No `@tanstack/react-query` in `package.json`; no cart context in `app/`.

## Verdict

rule: no e-commerce (the store's data layer and cart)

## Log
