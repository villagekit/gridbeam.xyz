# 01 — Bootstrap Next.js + Chakra v3 + tooling

**Status:** DONE

## Why
The repo's top-level is currently a thin shell with three submodules. To make this repo *be* the gridbeam.xyz site, we need a Next.js app at the top level with Chakra v3 wired in and the tooling we'll use across pages.

## What
A working `pnpm dev` at the top level that serves a placeholder home page, with TypeScript, Biome, Chakra v3 provider, MDX support, and an alias to consume `@villagekit/ui` from `./ui` via workspace path.

## Steps
- [x] Decide on `pnpm` vs `npm`. The submodules use `pnpm`; recommend `pnpm` here too. Set `packageManager` in `package.json`.
- [x] ~~`pnpm create next-app@latest .`~~ — set up manually (per user direction). Hand-wrote `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `mdx-components.tsx`, `app/layout.tsx`, `app/page.tsx`. No conflicts to resolve since nothing is bulk-generated.
- [x] Bump `.nvmrc` from 18 to the current Node LTS (22).
- [x] Add `@chakra-ui/react@^3` and the v3 provider setup. The system lives in `./ui` and is consumed via `@villagekit/ui`'s exported `<Provider>`.
- [x] Configure `next.config.ts`: `transpilePackages: ['@villagekit/ui']` (workspace source consumption — see follow-up about `./ui`'s `publishConfig` exports). `mdxRs` left off (still experimental in Next 15).
- [x] Set up `pnpm-workspace.yaml` so the top-level can resolve `@villagekit/ui` from `./ui`. Engine packages will be added when Stream 03 lands.
- [x] Add `@biomejs/biome` and a `biome.json` (copied from `./gridkit/biome.json` for consistency, with `files.ignore` for the submodule directories).
- [x] Add `@next/mdx` and `mdx-components.tsx` (root-level pass-through).
- [x] Wire up `app/layout.tsx` with the Chakra `Provider` and a basic `<html>/<body>`.
- [x] Stub `app/page.tsx` with a "gridbeam.xyz — coming soon" placeholder.
- [x] Add `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm format`, `pnpm typecheck` scripts.
- [x] Add `LICENSE` (EUPL-1.2 text copied from `./ui/LICENSE`).
- [x] Add `package.json` `"license": "EUPL-1.2"`, `"engines": { "node": ">=22" }`.
- [x] Verify `pnpm -w run build` succeeds (4 static pages), `pnpm -w run dev` boots and `curl localhost:3000` returns the placeholder, `pnpm -w run lint` clean, `tsc --noEmit` clean.
- [x] Commit.

## Notes
- **Manual setup, not `pnpm create next-app`** — at the user's direction, every config file is hand-written. Avoids the template's ESLint setup, default Tailwind probe, and `.gitignore` clobber.
- **License: EUPL-1.2**, public repo. `LICENSE` lives alongside `package.json`. `.env.example` documents `BUTTONDOWN_API_KEY` for the future subscribe page; `.env` and `.env*.local` are gitignored.
- **App router**, not pages router. Fits MDX server components naturally.
- **Chakra v3 Provider** comes from `@villagekit/ui`. The library's system is wired through `<Provider>`; `app/layout.tsx` just imports it.
- **Workspace resolution of `@villagekit/ui`** — `./ui/package.json`'s `exports` was changed to point at `./src/index.ts` directly, with `publishConfig.exports` overriding to `./dist/*` for npm publishes (the `tsup` build is still missing — known Stream 02 follow-up). This lets workspace consumers (the website) skip the build step entirely; published consumers will still get bundled JS once tsup lands.
- **`'use client'` directives** added to client-only hook files in `./ui/src/hooks/` (`useTheme`, `useBreakpointWidth`, `useSizeWidths`, `useIsMobile`, `useMobileFriendlyTooltip`, `useWasRenderedOnClientAtLeastOnce`). Without these, any Next.js App Router consumer hits "useState only works in client components" build errors.

## Follow-ups
- **`'use client'` audit on remaining `./ui` component wrappers** (Stream 02). Several wrappers in `./ui/src/components/` (`Accordion`, `Badge`, `Checkbox`, `FormLabel`, `Select`, `Slider`, `Switch`, `Table`) re-export Chakra v3 components without a `'use client'` directive AND export theme recipe objects from the same file. Splitting recipes into separate files (or marking the wrappers as client) is needed before pages here actually consume them. Today's home page only uses Box/Container/Heading/Text, which work fine.
- **`tsup` install in `./ui`** (Stream 02 follow-up, still open). The `publishConfig.exports` pattern means the npm publish will fail until `dist/` is buildable. Not blocking the website but blocks `@villagekit/ui` release.
- **`favicon.ico`** — Next 15 logs a 404 for it on every dev request. Add when Stream 04 (content) provides one.

## Depends on
- [../02-ui-library/02-chakra-v3-migration.md](../02-ui-library/02-chakra-v3-migration.md) — **hard blocking.** The standalone `@villagekit/ui` must already be on Chakra v3 before this task starts, so we can use it from day one (no double-migration).
