# 01 — Bootstrap Next.js + Chakra v3 + tooling

**Status:** TODO

## Why
The repo's top-level is currently a thin shell with three submodules. To make this repo *be* the gridbeam.xyz site, we need a Next.js app at the top level with Chakra v3 wired in and the tooling we'll use across pages.

## What
A working `pnpm dev` at the top level that serves a placeholder home page, with TypeScript, Biome, Chakra v3 provider, MDX support, and an alias to consume `@villagekit/ui` from `./ui` via workspace path.

## Steps
- [ ] Decide on `pnpm` vs `npm`. The submodules use `pnpm`; recommend `pnpm` here too. Set `packageManager` in `package.json`.
- [ ] `pnpm create next-app@latest .` (app router, TypeScript, no Tailwind, no `src/`, no ESLint — we use Biome). Resolve any conflicts with existing files (CLAUDE.md, todo/, .gitmodules, .nvmrc).
- [ ] Bump `.nvmrc` from 18 to the current Node LTS (likely 22).
- [ ] Add `@chakra-ui/react@^3` and the v3 provider setup. Move the system from `./ui` once Stream 02 is far enough.
- [ ] Configure `next.config.{ts,mjs}`: `transpilePackages: ['@villagekit/ui']` if the workspace package isn't pre-built; `mdxRs: true` if using `@next/mdx`.
- [ ] Set up `pnpm-workspace.yaml` so the top-level can resolve `@villagekit/ui` from `./ui` (and similarly any engine packages from `./gridkit`).
- [ ] Add `@biomejs/biome` and a `biome.json` (copy from `./gridkit/biome.json` for consistency).
- [ ] Add `@next/mdx` and `mdx-components.tsx` for MDX page support (matches the legacy site's pattern).
- [ ] Wire up `app/layout.tsx` with the Chakra `Provider` and a basic `<html>/<body>`.
- [ ] Stub `app/page.tsx` with a "gridbeam.xyz — coming soon" placeholder.
- [ ] Add `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm format` scripts.
- [ ] Add `LICENSE` (EUPL-1.2 text — copy from `./ui/LICENSE` for consistency).
- [ ] Add `package.json` `"license": "EUPL-1.2"`.
- [ ] Verify `pnpm dev` works and the placeholder renders.
- [ ] Commit.

## Notes
- **Do NOT start from `node-modules/apps/gridbeam/`.** That stub is an abandoned earlier attempt — wrong dependencies (legacy `@villagekit-private/*`, Chakra v2). Look at it only for reference (which routes existed, favicon config), then build fresh.
- **License: EUPL-1.2**, public repo. Drop a `LICENSE` file in alongside `package.json`. No `.env` files committed; document required vars in a `.env.example` (e.g. `BUTTONDOWN_API_KEY` for the newsletter).
- The legacy site uses **pages router**. We're going to **app router** for the new site — better long-term, fits MDX server components nicely.
- If Chakra v3's setup is still in flux, confirm the recommended provider pattern from current Chakra docs at the time of work — the API has been moving.
- `transpilePackages` lets us consume `@villagekit/ui` directly from the workspace without a publish step; useful during development.

## Depends on
- [../02-ui-library/02-chakra-v3-migration.md](../02-ui-library/02-chakra-v3-migration.md) — **hard blocking.** The standalone `@villagekit/ui` must already be on Chakra v3 before this task starts, so we can use it from day one (no double-migration).
