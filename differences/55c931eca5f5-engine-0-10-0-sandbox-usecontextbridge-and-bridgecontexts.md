---
title: "Engine 0.10.0: sandbox useContextBridge and bridgeContexts removed"
status: regression
route: /designs/bed-frame
axis: code
kind: removed
---
## Legacy

`gridkit@v0.9.0 core/sandbox/src/index.tsx:4,29,50,64,115-133` `useContextBridge` from drei and a `bridgeContexts` prop; `products/kit/src/view.tsx:6,22` passes `[ProductKitContext]`.

## Current

`node_modules/@villagekit/sandbox/src/index.tsx` no bridge; `node_modules/@villagekit/product-kit/src/view.tsx:6,14-24` passes none.

## Verdict

## Log

- 2026-09-12: Template. `PartsGlForAll` receives its data as props, so no behaviour change was found.
