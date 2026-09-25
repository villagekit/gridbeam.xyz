---
title: Port the scripts to TypeScript under strict
status: todo
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

## Log
