---
title: Port the scripts to TypeScript under strict
status: done
worker: opus
---
The audit at the adoption of the shared agentic set (plan `0448bc2d`) found the five scripts outside the typechecker.

## Work

Rule: the `typescript` skill, "Toolchain": "`strict: true`, ESM-only", and `CLAUDE.md, Structure`, "TypeScript everywhere".

Places: `scripts/generate-designs-data.mjs:1`, `scripts/audit-dom.mjs:1`, `scripts/audit-pages.mjs:1`, `scripts/audit-shared.mjs:1`, `scripts/rebuild-audit-index.mjs:1`; `tsconfig.json:30`, whose `include` covers only `.ts`, `.tsx` and `.mdx` with `checkJs` off, so `tsc --noEmit` never reads them.

Fix: port the five `.mjs` scripts to `.ts` (the pinned Node runs them, as `audit-dom.mjs` already imports `scripts/audit-dom/normalize.ts`), keep their header comments, and point `package.json`'s scripts and the `prebuild` and `predev` hooks at the new files.

Docs: `CLAUDE.md, Commands` and `Structure` where they name the files.

## Seams under test

The scripts' pure helpers, tested by the sibling plan that shares them.

## Done when

- `ls scripts/*.mjs` prints nothing and `pnpm typecheck` reads every script
- `pnpm dev`, `pnpm audit:pages` and `pnpm audit:dom` run as before on one route
- `timeout 900 just check` is green

## Outcome

The five scripts are TypeScript: `scripts/generate-designs-data.ts`, `audit-dom.ts`, `audit-pages.ts`, `audit-shared.ts` and `rebuild-audit-index.ts`, renamed from `.mjs` so their history follows, typed under the root `tsconfig.json` (its `**/*.ts` include already covers `scripts/`) and run by Node's type stripping. `package.json`'s `predev`, `prebuild`, `generate:designs`, `audit:pages` and `audit:dom` point at the `.ts` files. Each header comment is kept, its own path renamed. CLAUDE.md's Structure names the files and the type-stripping limits; its Commands row for `audit:dom` drops "Node 22.18+", which Structure now states once for every script. The generated designs module changes only in its first line, which names the generator.

Typing: `audit-shared.ts` exports the `Side`, `AuditArgs`, `RouteEntry` and `LoadResult` types and one `errorMessage` helper (strict makes a caught value `unknown`, so `err.message` no longer typechecks; a thrown non-`Error` now reads as `String(err)` where it read as `undefined`). `audit-dom.ts` types its manifest as a capture or a skipped side; `audit-pages.ts` types its results as a load result plus the route, width and side; `generate-designs-data.ts` reads `parsed.product as ProductMeta`, the legacy author's cast (`../node-modules/packages/designs/src/index.ts:42` at `fce357d`).

Deviations from the plan's letter, with evidence:

- `tsconfig.json` gains `allowImportingTsExtensions` (the scripts import `./audit-shared.ts` and `./audit-dom/normalize.ts`, which tsc refuses without it; allowed since `noEmit` is set) and `erasableSyntaxOnly` (TypeScript 5.9 refuses enums and parameter properties, the syntax Node cannot strip; the whole repo already passed). `next build` does not run its own type check here (`next.config.ts`, `ignoreBuildErrors`), so neither can break the build.
- `package.json`'s `engines.node` is `>=22.18`, where it was `>=22`: `predev` and `prebuild` now run a `.ts` file, and Node strips types without a flag from 22.18. `.nvmrc` pins 24.15 and CI reads it.
- The first build added a throw on a missing `[product]` table or a non-string `exports` in the generator; the Parity and Spec reviews found it put back what difference `7c075b85aa8f` (fixed) removed, and it was replaced by the legacy cast before the commit. The four ledger items that cite `scripts/generate-designs-data.mjs` in their Current sections (`7c075b85aa8f`, `abb539b3555e`, `4d360677d686`, `9d4e2e43543e`) carry a dated note naming the new path, and so do the three open plans that cite the `.mjs` paths (`9d1770a4cd9e`, `549ec777422c` and the sibling `0574cb3ea36d`), found by the second review round.

Proof: `ls scripts/*.mjs` prints nothing; `pnpm typecheck` reads the scripts (it reported the strict errors in them before the typing); `pnpm dev` ran its `predev` from the `.ts` generator and served `/faq` at 200; `pnpm audit:pages --routes <file> --widths 1280` and `pnpm audit:dom --routes <file>` on `/faq` captured both sides (2/2 each) with the same manifest shape, a `current-only` route skipped its legacy side, a bad marker still stops with the line-number error, and `node scripts/rebuild-audit-index.ts` rebuilt the index; `timeout 900 just check` green, the drift check included. No route's output changed, so no screenshot pair beyond `/faq` was needed: the generated data's body is byte-identical.

Review findings dropped or deferred: the inline `'legacy' | 'current'` in `rebuild-audit-index.ts` where `audit-shared.ts` exports `Side` (Standards) goes with the sharing of the helpers, sibling plan `0574cb3ea36d`; the note that `import type` is enforced by Biome's `useImportType`, not tsc (Spec), changes nothing, since the lint is in the gate.

## Log
