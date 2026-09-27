---
title: "Console error on every design page: memo received undefined"
status: fixed
route: /designs/bed-frame
axis: code
kind: changed
---
## Legacy

The live legacy page logs no React error (probe console, plan cf52c388); `gridkit@v0.9.0 core/sandbox/src/scenery/lights.tsx:12` `export default memo(Lights)` above the hoisted `function Lights`.

## Current

`http://localhost:3000/designs/bed-frame` logs `memo: The first argument must be a component. Instead received: %s undefined` on load (probe); `node_modules/@villagekit/sandbox/src/scenery/lights.tsx` is byte-identical to v0.9.0 and is transpiled by Next (`next.config.ts:11-22`). The scene still lights and shadows, so the failing `memo` call was not traced.

## Verdict

plan 51b6f4badc86. The line was a development artifact of the `transpilePackages` list that plan a849fca1426c dropped, not a fault in the engine's `memo` calls: with the engine packages transpiled, Next's React Refresh transform wrapped the inline `memo(function Fasteners2)` of `@villagekit/part-fastener/dist/gl.js` in a refresh signature call, and the smart-fasteners worker, which imports that module and runs without a refresh runtime, evaluated Turbopack's stub signature, which returns undefined, so React logged `memo(undefined)` once per worker start. At the committed config the console reads nothing on the three sampled routes: 51 page loads on `pnpm dev` (one warm server, two cold) with both engine workers spawning, and 18 on `next start` after `pnpm build`, the same as the legacy page's clean console.

## Log

- 2026-09-12: Template. Recorded as observed; the cause needs the re-port slice's attention.

- 2026-09-26: Plan a849fca1426c dropped the transpilePackages list from next.config.ts, so the Current field's `transpiled by Next (next.config.ts:11-22)` is stale; the claim was already wrong, since `@villagekit/sandbox@0.10.0` resolves `.` to `dist/index.js` and its `src/` is never what the bundler reads. The memo line was not caused by the list: at the committed config one dev run on /designs/shelf-tower printed it, and two runs on the config without the list did not, so it is intermittent and this item still owns it.

- 2026-09-28: From the page re-port (plan 3c448a379ad7): a Playwright capture of every console error and warning on /designs/bed-frame at 1280 and on /designs/5-12-13-triangle-desk, after the re-port, read no memo line; the two lines read were the engine's missing-key warning from CutGridBeamSvg (noted on 7f2556a9ec9d) and emotion's kebab-case warning on the sandbox's hover key. The diagnosis slice 51b6f4badc86 confirms the reading and closes the item, or finds where the line still fires.

- 2026-09-28: From the diagnosis slice (plan 51b6f4badc86). Reproduced by rule: with the old `transpilePackages` list restored as a probe edit and a cold `.next`, a Playwright `page.on('console')` listener read the line on 15 of 15 page loads of /designs/shelf-tower and /designs/bed-frame (fresh, hard reload and soft navigation from /designs, over three runs) and on 0 of 5 of /designs/5-12-13-triangle-desk on the same server, unexplained; at the committed config, 0 of 51 page loads on `pnpm dev` (one warm server, two cold) and 0 of 18 on `next start`. The message is the smart-fasteners worker's, not the page's: a CDP `Runtime.consoleAPICalled` listener on the page session read nothing while Playwright's page console event, which forwards worker messages, read every one, which is why earlier probes disagreed. The worker's stack, captured by attaching to the worker target: `exports.memo` in `next/dist/compiled/react/cjs/react.development.js` (`null == type && console.error(...)`), called from the module evaluation of `@villagekit/part-fastener/dist/gl.js` at `var Fasteners = memo(_s1(function Fasteners2(props) {...}))`, where `_s1 = __turbopack_context__.k.signature()`, reached through `plugin-smart-fasteners/dist/worker.js`, whose bare `import "@villagekit/part-fastener"` (its `lib.js` also reads `fastenerVariants` from that index) pulls `gl.js` in through the package's `index.js`. In the page, `k` is React Refresh and `$RefreshSig$()` returns its argument; in the worker, Turbopack's dev runtime binds `DUMMY_REFRESH_CONTEXT`, whose `signature: () => (_type) => {}` returns undefined (the runtime prepended to the worker's entry chunk, `next@15.5.18`). The transform only runs on first-party and transpiled code, so the dist emitted without the list reads `memo(function Fasteners2(props)` with no wrapper. Nothing to change in `../gridkit`: the engine's code is sound in every runtime, and the stub is Next's. The legacy site never had the line because its `next.config.mjs` at fce357d transpiled only `@villagekit/part-gridpanel` and `@swc/wasm`, never `part-fastener`, and left `@villagekit/product-kit` out with the comment `// web worker`, the legacy author's own precedent for keeping worker-imported engine code out of the list.
