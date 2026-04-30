# 07 — Storybook upgrade + Chakra integration + CI

**Status:** TODO

## Why
Storybook 9 is already installed in `./ui` (`storybook ^9.0.6`) but `.storybook/main.ts` doesn't have a Chakra provider decorator — stories may render without theme. Storybook 10 is now the latest major (per the deps audit in Stream 03 task 04, which recommends skipping 9 → 10 across both repos for consistency). After upgrading + folding everything in, we want to deploy the Storybook publicly (it used to live at `ui.villagekit.com`) and gate changes with CI.

## What
Stories all render with the v3 theme applied. Storybook deployed somewhere reachable. CI (GitHub Actions) runs lint + type-check + storybook-build on every PR.

## Steps

### Storybook
- [ ] Bump Storybook 9 → 10 across `./ui` and the engine's `apps/storybook` (per Stream 03 task 04 recommendation). Run the official Storybook migration codemod; fix any breaking changes (addon API, mainjs format).
- [ ] Add a `.storybook/preview.tsx` that wraps every story with the `Provider` from the library (so the theme is applied). *(Already added in Stream 02 task 02 — verify it survives the v10 bump.)*
- [ ] Add useful global decorators: viewport sizes (mobile, tablet, desktop), color-mode toggle if v3 supports it.
- [ ] Add `addon-a11y` for accessibility checks during development.
- [ ] Cover every component with at least one story (currently 24 stories vs 25 components — fill gaps; new components from tasks 03-06 also need stories).
- [ ] Run the deferred Storybook smoke test from Stream 02 task 02 — verify every existing story renders cleanly under Chakra v3 + the v10 upgrade.
- [ ] Build storybook locally (`pnpm run build:storybook`) and verify the static output.

### Hosting
- [ ] Decide where Storybook lives:
  - Vercel as a separate project (free, easy)
  - GitHub Pages (free)
  - Netlify (free)
  - chromatic.com (paid, but with visual regression)
- [ ] Recommend: Vercel project named `villagekit-ui-storybook` or similar. Reuse the `villagekit/ui` repo.
- [ ] Update README's "Demo" link from `ui.villagekit.com` to the new URL (or set up DNS).

### CI
- [ ] Add `.github/workflows/ci.yml` with jobs: install (pnpm), lint (`pnpm run lint`), type-check (would need adding a `types` script — `tsc --noEmit`), build (`pnpm run build:pkg`), build-storybook (`pnpm run build:storybook`), publint (`pnpm run publint`).
- [ ] Trigger on push to main + every PR.
- [ ] Add a status badge to README.

## Notes
- Storybook 10 is the current latest major (per Stream 03 task 04's deps audit, recommending skipping 9 → 10 across both repos).
- `chromatic.com` would catch visual regressions but adds a paid dep. Probably overkill for v1.
- This task is also where the smoke test deferred from Stream 02 task 02 lands — running stories in a real browser closes that follow-up.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
- [./03-fold-ui-page.md](./03-fold-ui-page.md), [./04-fold-ui-nav.md](./04-fold-ui-nav.md), [./05-fold-ui-media.md](./05-fold-ui-media.md), [./06-fold-ui-mdx.md](./06-fold-ui-mdx.md) — all stories should exist before CI is meaningful
