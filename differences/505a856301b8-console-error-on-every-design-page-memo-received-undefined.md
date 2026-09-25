---
title: "Console error on every design page: memo received undefined"
status: regression
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

The live legacy page logs no React error (probe console, plan cf52c388); `gridkit@v0.9.0 core/sandbox/src/scenery/lights.tsx:12` `export default memo(Lights)` above the hoisted `function Lights`.

## Current

`http://localhost:3000/designs/bed-frame` logs `memo: The first argument must be a component. Instead received: %s undefined` on load (probe); `node_modules/@villagekit/sandbox/src/scenery/lights.tsx` is byte-identical to v0.9.0 and is transpiled by Next (`next.config.ts:11-22`). The scene still lights and shadows, so the failing `memo` call was not traced.

## Verdict

## Log

- 2026-09-12: Template. Recorded as observed; the cause needs the re-port slice's attention.

- 2026-09-26: Plan a849fca1426c dropped the transpilePackages list from next.config.ts, so the Current field's `transpiled by Next (next.config.ts:11-22)` is stale; the claim was already wrong, since `@villagekit/sandbox@0.10.0` resolves `.` to `dist/index.js` and its `src/` is never what the bundler reads. The memo line was not caused by the list: at the committed config one dev run on /designs/shelf-tower printed it, and two runs on the config without the list did not, so it is intermittent and this item still owns it.
