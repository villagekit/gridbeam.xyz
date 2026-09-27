---
title: Design code compiled to JavaScript at build with @swc/wasm, legacy's compile, so the design pages receive JavaScript
status: todo
parent: 0bc88eaf5493
derived_from: 0bc88eaf5493
blocked_by:
  - target: 3c448a379ad7
    strength: soft
    note: "route order: the pairs and the console are read on the re-ported page"
worker: fable
---
A design's TypeScript is compiled to JavaScript at build with `@swc/wasm`, legacy's compile with its options verbatim, so every design page receives JavaScript and the browser never loads `@swc/wasm-web` to compile it on each visit; the `0 x 0 x 0mm` placeholder state shortens toward legacy's, and the triangle desk's intermediate pose, which the M1 run tied to the same timing, is probed after. Two items, one on `/designs/bed-frame` and one on `/designs/5-12-13-triangle-desk`. Legacy compiled inside `getDesign` at build; here the build-time place is the designs generator, since this site's `getDesign` runs on the Worker per request under OpenNext's default cache, where a Node wasm binding cannot go, and the function's home is the generated module's question, the operator's on the designs index verdicts plan (`abb539b3555e` on `549ec777422c`), so the slice notes it there and files nothing new. Fable, since the placement is decided against the runtime. Record `0bc88eaf5493`; decisions `ee86d68a`, `2032533f`, `91cbeac8`.

## Work

- Legacy: `../node-modules/packages/designs/src/index.ts:44-66` at `fce357d`: `transform(designCode, { filename: designMeta.exports, jsc: { parser: { syntax: 'typescript' } }, module: { noInterop: true, strict: true, type: 'es6' }, sourceMaps: 'inline' })` with `designMeta.exports` rewritten from `.ts` to `.js` first; `packages/designs/package.json` pins `@swc/wasm ^1.6.6`. Current: `scripts/generate-designs-data.mjs:40-48` embeds each design's `.ts` text and its `exports` unchanged; `app/_lib/designs.ts:34-42` `getDesign` with its one-line comment naming this item; `@villagekit/product-kit@0.10.0 src/renders/index.tsx:26-39` picks the JavaScript renderer for a `.js` `exports` and the TypeScript one (`@swc/wasm-web` in the browser, `renders/typescript.tsx:24-70`) for `.ts`.
- `@swc/wasm` added beside `smol-toml` in `package.json`, the caret range every other dependency carries and the lockfile pinning it with its hash; the generator, after reading `code`, rewrites `meta.exports` to `.js` and transforms the code with legacy's options verbatim, so `designs-data.generated.ts` carries JavaScript with legacy's inline source maps and `exports` ending `.js`; `getDesign` keeps returning `{ code, meta }` and its comment names the generator. The generator's header (its page) says what it compiles and why, and that the output is deterministic for the pinned swc version, which the drift check `just generated` relies on.
- Why the generator and not `getDesign`, verified before the edit: the design page is prerendered through `generateStaticParams`, but `open-next.config.ts` configures no incremental cache and OpenNext's default is `dummy` (`node_modules/@opennextjs/cloudflare/dist/api/config.js:45`), so a prerendered page renders again on the Worker per request (the generator's header records the `readdir` incident), where `@swc/wasm`, a Node binding loading a wasm file of tens of megabytes from disk, cannot run within a Worker; the compile therefore belongs to the build step that already writes the module. The worker checks the two claims (`grep -n "dummy" node_modules/@opennextjs/cloudflare/dist/api/config.js`, `du -sh node_modules/@swc/wasm` after the install) and, if `getDesign` turns out to run at build only, writes the compile in `getDesign` as legacy's and says so in the Outcome.
- The placement: legacy's function compiled, this site's generator does; the difference is the generated module's, [[abb539b3555e]], the operator's: a note there says the compile lives in the generator and moves back into `getDesign` with the disk read if the operator chooses it. [[9d4e2e43543e]] closes: its Legacy is the build-time swc compile and its Current the raw TypeScript compiled in the browser, and after this slice the page receives JavaScript compiled at build by swc with legacy's options.
- [[e84e09089678]]: after the compile, probe `/designs/5-12-13-triangle-desk` at 1280 on `pnpm dev` at 1 s, 3 s and 6 s after load, three fresh loads, as the item's log did; if the desk draws its angled legs and separated shelves from the first frame, fix it citing this plan; if the pose persists, note the probe on the item and leave it `regression` for the record's finish.
- The generated module grows with the compiled code and the inline maps (174 KB now); the size after is recorded in the Outcome. `app/_lib/designs.test.ts` gains two assertions (below).
- Verify first: `grep -c "swc" package.json scripts/generate-designs-data.mjs` prints 0; `grep -c '"exports": "\./[a-z0-9-]*\.ts"' app/_lib/designs-data.generated.ts` prints 37.
- The record's Log and the note on [[9d4e2e43543e]] from the library slice say the compile lands in `getDesign`; this slice's note on [[abb539b3555e]] and a line on the designs index verdicts plan `549ec777422c` say it landed in the generator and why, so the operator's question on the generated module visibly includes the compile's home.
- Docs: the generator's header comment; CLAUDE.md's Commands row for the gate already says the build regenerates the designs data.
- Not this slice: the generated module's existence and the disk read (the operator's); the page (the page re-port, `Design page re-ported from the legacy design page, catalogue item, design components and loading component`); the engine's client render path.

## Seams under test

`app/_lib/designs.test.ts` (Vitest): every entry of the generated module has `meta.exports` ending `.js` and `code` ending with legacy's inline source map line (`//# sourceMappingURL=data:application/json;base64,`); the rest by the network log, the console, the desk probe and the eye on `pnpm dev`.

## Done when

- `pnpm generate:designs` writes `app/_lib/designs-data.generated.ts` whose 37 entries carry `exports` ending `.js` and JavaScript code, and a second run leaves `git status --porcelain app/_lib/designs-data.generated.ts` empty (the drift check's determinism)
- On `pnpm dev`, `/designs/bed-frame`, `/designs/shelf-tower` and `/designs/5-12-13-triangle-desk` render their geometry with non-zero `Assembled Dimensions`, the network log holds no request for `@swc/wasm-web`'s wasm, and the console holds no compile error; the placeholder `0 x 0 x 0mm` state on `/designs/bed-frame`, timed as the item's log timed it, ends sooner than the 8.8 s it recorded, the timing written in the Outcome beside legacy's 1.7 s
- The desk probe at 1 s, 3 s and 6 s: the right pose from the first frame, or the item's note
- With `pnpm dev` stopped by pid (CLAUDE.md's Gotchas), `npx opennextjs-cloudflare build` completes and `grep -rlE "@swc/wasm['\"]" .open-next/server-functions` prints nothing, so the server bundle carries no `@swc/wasm` (the pattern leaves the engine's `@swc/wasm-web` aside)
- `pnpm test` is green with the two new assertions; [[9d4e2e43543e]] is `fixed`, [[e84e09089678]] is `fixed` or noted, the note on [[abb539b3555e]] and the line on `549ec777422c` are written, checked after
- `timeout 900 just check` is green

## Outcome

## Log
