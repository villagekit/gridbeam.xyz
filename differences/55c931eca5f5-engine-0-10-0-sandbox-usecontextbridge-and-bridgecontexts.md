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

- 2026-09-27: From the design pages record's split (plan 0bc88eaf5493): on the operator's verdicts plan [[8512c5e9cc98]], not a slice's. @react-three/fiber@9.6.1 (the site's lockfile's pin under the engine's ^9.0.0) bridges every React context into the canvas itself (dist/events-b389eeca.esm.js imports useContextBridge from its-fine, and react-three-fiber.esm.js wraps the canvas in it), so a restored bridgeContexts would be a second copy of what the canvas does; @react-three/drei@10.7.7 still exports the hook (core/useContextBridge.d.ts), so drei did not force the removal. Whether rule 4 covers it is the operator's; the item keeps its state until then. The v0.9.0 lines are core/sandbox/src/index.tsx:4,29,42,65,118-135.
