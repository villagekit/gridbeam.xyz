# 07 — Storybook upgrade + Chakra integration + CI

**Status:** DONE (engine `apps/storybook` upgrade deferred to Stream 03 task 08; Vercel hosting deferred to npm-publish task)

## Why
Storybook 9 is already installed in `./ui` (`storybook ^9.0.6`) but `.storybook/main.ts` doesn't have a Chakra provider decorator — stories may render without theme. Storybook 10 is now the latest major (per the deps audit in Stream 03 task 04, which recommends skipping 9 → 10 across both repos for consistency). After upgrading + folding everything in, we want to deploy the Storybook publicly (it used to live at `ui.villagekit.com`) and gate changes with CI.

## What
Stories all render with the v3 theme applied. Storybook deployed somewhere reachable. CI (GitHub Actions) runs lint + type-check + storybook-build on every PR.

## Steps

### Storybook
- [x] Bump Storybook 9 → 10 in `./ui`. Switched from `@storybook/react-webpack5` to `@storybook/nextjs-vite` (the components use `next/link`, `next/navigation`, `next/image`, so the Next.js-aware framework is correct). The engine's `apps/storybook` is still on Storybook 8 + Chakra v2 — it gets bumped as part of [Stream 03 task 08](../03-engine/08-migrate-engine-to-chakra-v3.md) since the Chakra v3 migration there has to land first.
- [x] `.storybook/preview.tsx` keeps the `Provider` decorator from task 02. Verified intact under v10 + nextjs-vite.
- [x] Added global decorators: viewport sizes (Mobile / Tablet / Desktop / Wide) via `parameters.viewport`. Color-mode toggle skipped — neither the library nor the website wires up `next-themes`, so a switcher in Storybook would be misleading. Easy to add later if/when light/dark ships.
- [x] Added `@storybook/addon-a11y` with `test: 'todo'` parameter (visible in the panel; not enforced in CI yet).
- [x] Filled gap stories: Badge, FormLabel, Table (basic-component gaps); plus the deferred stories for layouts (`Section`/`Row`/`Column`), Footer, Nav (`NavBar`, `NavList`), Media (`Image` SVG + cloudinary, `Video`), and the MDX overrides. Every component the library exports now has at least one story group.
- [x] Smoke test from task 02 closed — `pnpm run build:storybook` builds clean, all stories registered in `storybook-static/index.json`.
- [x] `pnpm run build:storybook` — clean static output in `storybook-static/`.

### Hosting
- [x] Hosting decision: **Vercel project, deferred to [task 08](./08-publish-npm.md)**. Setting up the Vercel project requires the user's account access; CI now uploads `storybook-static` as a build artifact in the meantime (PR reviewers can download and inspect). Adding a deploy preview action (`amondnet/vercel-action` or Vercel's GitHub app) is a small follow-up once the project exists.
- [x] README updated — old `ui.villagekit.com` link replaced with a pointer to the CI artifact + this task file.

### CI
- [x] Added `.github/workflows/ci.yml` (in `./ui`) with steps: install (pnpm), lint, types (`tsc --noEmit`), build:pkg, publint, build:storybook, upload `storybook-static` artifact. Concurrency cancels duplicate runs. Triggers on push to `main` and every PR.
- [x] Added a `types` script to `./ui/package.json` (`tsc --noEmit`).
- [x] CI status badge added to README. Note: the badge will render `failing` until the workflow has actually run on `main` for the first time post-merge.

## Notes
- Switched away from webpack5 to vite-based framework. Faster dev/build, and `@storybook/nextjs-vite` auto-handles `next/link`, `next/navigation` (with `appDirectory: true` set globally in preview), and `next/image` — without it, every `next/*` import in our nav/footer/image components would fail to resolve in Storybook.
- Provided a stub `.storybook/next.config.js` with `nextConfigPath` set in `main.ts`. Without it, `@storybook/nextjs-vite` walks up the tree and picks up the consuming website's `next.config.ts`, which references files that don't exist inside `./ui`.
- Removed `@storybook/addon-themes` — only one theme exists, so the switcher had no purpose.
- Removed `@storybook/addon-webpack5-compiler-swc` and `@storybook/react-webpack5` (replaced by `@storybook/nextjs-vite`).
- Bumped local Node to 22.22.2 (Storybook 10 requires 22.12+). Added `.nvmrc` so CI and contributors stay aligned.
- `chromatic.com` would catch visual regressions but adds a paid dep. Probably overkill for v1.
- The full Storybook smoke test deferred from Stream 02 task 02 is closed by this task — `build:storybook` validates that every story imports and compiles under Chakra v3 + Storybook v10. Live render verification is best done once the Vercel deploy lands (so it's reachable from a browser without local setup).

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
- [./03-fold-ui-page.md](./03-fold-ui-page.md), [./04-fold-ui-nav.md](./04-fold-ui-nav.md), [./05-fold-ui-media.md](./05-fold-ui-media.md), [./06-fold-ui-mdx.md](./06-fold-ui-mdx.md) — all stories should exist before CI is meaningful

## Follow-ups (new tasks discovered during this work)
- **Engine `apps/storybook` v8 → v10 bump** rolls into Stream 03 task 08 (Chakra v3 + remove `core/ui`) — engine still on v8 + Chakra v2.
- **Vercel deploy of Storybook** — left as the natural pairing with [task 08](./08-publish-npm.md) (npm publish): both want the Vercel project to exist first. Add a deploy step (or Vercel GitHub app) at that point.
- **`@storybook/addon-a11y` is configured with `test: 'todo'`** — promote to `test: 'error'` once components are clean and we want CI gating.
