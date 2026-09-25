---
title: "next.config: test each @villagekit package's need for transpilePackages, correct the comment"
status: done
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - "worker:fable"
priority: medium
---
`next.config.ts`'s `transpilePackages` list and the comment above it say the published `@villagekit/*` packages ship TypeScript sources at their top-level `exports`, and that the build dies without the list. Every package at the versions `pnpm-lock.yaml` pins resolves `.` to `dist/index.js` (`node_modules/@villagekit/ui/package.json`, `exports["."]`, 1.2.0; the shell record `a78b167170b8`'s Log and the next.config slice `4f6f086c5d77`'s Outcome flagged it, and CLAUDE.md's ui row was corrected at the record's finish, decision `40abdb2f222a`). This slice finds out, package by package, whether the list is still needed, and leaves the list and the comment saying what is true. Minted beside the shell record; a site-side change, no publish involved.

## Work

For each entry in `transpilePackages` (`@villagekit/parameters`, `part`, `part-fastener`, `part-gridbeam`, `part-gridpanel`, `plugin-smart-fasteners`, `product`, `product-kit`, `sandbox`, `ui`): remove it, run `timeout 900 just build`, and record whether the build passes and whether `pnpm dev` serves `/`, `/designs/shelf-tower` and `/tools/cutting-planner` with no module or `'use client'` error. Read each package's `package.json` `exports` and `dist/` in `node_modules` first: a package whose `dist` is ESM with `'use client'` directives, CSS or JSX may still need transpiling for a reason other than TypeScript sources; name the reason found. Keep an entry the test shows is needed, with a comment naming its reason; drop the ones the test shows are not, or keep the whole list with a comment that states the true reason, whichever the evidence gives. The legacy site's `createNextConfig` discovered the monorepo's packages for `transpilePackages` (`e0824769af3d`'s Log), so a list that stays is legacy's shape on a hand list.
Verify first: `node -e 'console.log(require("./node_modules/@villagekit/ui/package.json").exports["."])'` prints the `dist` paths.
Docs: CLAUDE.md's ui and gridkit rows, if the transpile clause changes.
Not this slice: the bump plan `99f2fe62c62f`, which re-runs the gate against the published packages after the publish and re-checks the list if the packages' `exports` change.

## Seams under test

None pure; the proof is the build and a served page per removal.

## Done when

- The Outcome holds a table, one row per package: kept or dropped, and the reason the build or the served pages gave
- The comment above `transpilePackages` in `next.config.ts` states what is true of the published packages at the pinned versions
- `pnpm dev` serves `/`, `/designs/shelf-tower` and `/tools/cutting-planner` with no console error after the change
- `timeout 900 just check` is green

## Outcome

Shipped: `next.config.ts` lists no `transpilePackages`; the block and the comment above it (the claim that the published `@villagekit/*` packages ship TypeScript sources at their top-level `exports` and that the build dies without the list) are gone. Read first, in `node_modules/@villagekit/<package>/package.json` at the versions `pnpm-lock.yaml` pins (`0.10.0` for the nine engine packages, `1.2.0` for `ui`): every package resolves `.` (and every subpath the site imports, `part/creator`, `part-gridbeam/creator`, `part-gridpanel/creator`, `part-fastener/creator`, `ui/mdx`) to compiled ESM under `dist/` (`"type": "module"`, `import` and `default` conditions at `./dist/*.js`, `types` at `./dist/*.d.ts`; the nine engine packages also carry a `source` condition at `./src/index.ts`, or `.tsx` for `parameters` and `sandbox`, which no bundler here selects, and `ui` carries none). The `dist/` trees hold plain `.js` and `.d.ts` with source maps: no `.ts`, `.css`, `.svg` or JSON import in any of them, and no reference into `src/` beyond the bundler's path comment that opens each module (`// src/values/boolean.tsx`) and the source maps. What they do hold that could have needed transpiling: 56 `'use client'` files among the 84 `.js` files in `ui/dist` (a directive Next honors in `node_modules` without transpiling) and two `new Worker(new URL(..., import.meta.url))` sites (`'./worker'` at `plugin-smart-fasteners/dist/index.js:24`, `'./javascript-worker'` at `product-kit/dist/renders/javascript.js:13`), the feature legacy's own hand list named (`web worker`) on its commented-out `@villagekit/product-kit` entry; the build after the change still emits both as Turbopack worker entries under `.next/static/media/`, the Parity review checked.

The test, one `next build --turbopack` and one `pnpm dev` per removal, the dev server asked for `/`, `/designs/shelf-tower` and `/tools/cutting-planner`, the responses checked for a 200 and for the `__next_error__` overlay and the dev log for `Module not found`, `⨯`, `Error:` and `use client`; the build prerenders all 37 design pages and the cutting planner, so it exercises the engine on the server as well. All eleven runs passed:

| Package | Build with the entry removed | `pnpm dev` with the entry removed | Result |
|---|---|---|---|
| all ten at once | passes, `Compiled successfully` | `/` 200, `/designs/shelf-tower` 200, `/tools/cutting-planner` 200, no error | dropped |
| `@villagekit/parameters` | passes | the three routes 200, no error | dropped |
| `@villagekit/part` | passes | the three routes 200, no error | dropped |
| `@villagekit/part-fastener` | passes | the three routes 200, no error | dropped |
| `@villagekit/part-gridbeam` | passes | the three routes 200, no error | dropped |
| `@villagekit/part-gridpanel` | passes | the three routes 200, no error | dropped |
| `@villagekit/plugin-smart-fasteners` | passes | the three routes 200, no error | dropped |
| `@villagekit/product` | passes | the three routes 200, no error | dropped |
| `@villagekit/product-kit` | passes | the three routes 200, no error | dropped |
| `@villagekit/sandbox` | passes | the three routes 200, no error | dropped |
| `@villagekit/ui` | passes | the three routes 200, no error | dropped |

No entry is needed, so the whole block goes rather than a list with a comment: legacy's `next.config.mjs` listed by hand only the packages that needed it, each with its reason (`@villagekit/part-gridpanel` for a deadbeef import, `@swc/wasm`; `@villagekit/product-kit` commented out for its web worker), and its `monorepo` plugin appended the `@villagekit-private/*` workspace packages, which have no `packages/` to be read from here; a hand list of nothing is no list. The item `e0824769af3d` carries a note that its Current field's hand list is stale; the carried-forward note `48c33db356cb`, which listed `transpilePackages` as verified sound in August 2026, carries a Log line that this test overtakes that entry.

What it means for the bump plan `99f2fe62c62f`: a package that ships `dist/` needs no transpile, and the sibling's `publishConfig.exports` at `../ui` point at `dist/` exactly as `1.2.0`'s do, so the published `@villagekit/ui` at the bump needs no entry either. A package whose top-level `exports` point at `src/*.ts` does need one: with `node_modules/@villagekit/ui/package.json`'s `exports` rewritten to the sibling's top-level shape (`./src/index.ts`, `./src/mdx/index.ts`, the tarball shipping `src/`) and no `transpilePackages`, `next build` prints `Next.js build worker exited with code: null and signal: SIGILL` and `next dev` dies compiling `/` with no message; with `transpilePackages: ['@villagekit/ui']` the same tree serves `/` and `/designs/shelf-tower` at 200. So the `file:../ui` override flow in CLAUDE.md's ui row now says the override needs an uncommitted `transpilePackages: ['@villagekit/ui']` beside it, reverted by path with the override; the published packages need nothing. The `package.json` probe edit was restored by copy.

Verified: `pnpm dev` on the final config serves the three routes at 200 (Playwright, `load` plus a twelve-second settle; the design page never reaches `networkidle`, its viewer keeping the network busy). The browser console after the change, two runs (the first read in the session, the second the saved capture), holds on `/` and `/designs/shelf-tower` Chakra v3's `Using kebab-case for css properties in objects is not supported` (`150c408aba5a` on `/` and `941bd045b043` on the design pages, regressions their routes' ledgers own), the `next/image` LCP `priority` warning on `/`, an aborted Cloudinary `.webm` request and the WebGL driver's `ReadPixels` messages on the design page, and nothing on `/tools/cutting-planner`; one run at the committed config, the same script, holds the same lines and, once, React's `memo: The first argument must be a component` on the design page, the regression `505a856301b8` records (its Current field, which said the sandbox source is transpiled by the list, carries a note). So the console after the change has no line the committed config does not have: nothing new, and the Done when's `no console error` holds only for errors this change could introduce, the pre-existing ones being ledger items. `timeout 900 just check` green, run again last after the dev checks (`Compiled successfully`, 61 static pages, the generated designs data at zero diff); `kipu verify --warnings-as-errors` green. No visual gate: the change touches no route's markup or styles, so the screenshot pairs did not run; no pure seam, no test.

Docs: CLAUDE.md's ui row (the transpile clause and the override flow) and gridkit row (`Same dist/ shape and bump flow ..., so no transpile`). No copy touched. Deviations from the plan, both by its own evidence: the Done when asks for a comment above `transpilePackages` that states what is true, and there is no comment because there is no list, the true statement living in CLAUDE.md's ui row where the override flow needs it; and its `no console error` clause is met as `no new console error`, the lines that remain being ledger items, named above. The plan's "keep the whole list with a comment that states the true reason" branch was not taken since no reason survived the test.

Reviews (Standards, Spec and Parity on fresh Opus sub-agents): no critical finding on the code; one on the Outcome's evidence, where the after-change console capture had been overwritten by the baseline capture, so the two files were identical and contradicted the memo sentence; the after-change check was re-run into its own file, the sentence rewritten to the three runs' facts, and a fresh Opus reviewer read the corrected Outcome against the files, whose four findings were applied too: the second worker's path (`./javascript-worker`), the bundler's path comments named for what they are, the two after-change runs described as one read and one saved, and the gate run once more, last, with `.next` present for the worker-entry check. Applied from the first round: the `'use client'` count (56, not forty), the `source` condition stated per package, CLAUDE.md's SIGILL clause narrowed to the build worker with `next dev`'s death named beside it, the deviations named, the note on `505a856301b8`. Dropped: rewriting the Current fields of `e0824769af3d` and `505a856301b8` in place, since the shell record's finish set the precedent of a dated note on an item whose Current a later change made stale, and this slice follows it.

## Log
