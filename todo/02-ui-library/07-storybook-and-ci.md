# 07 — Storybook upgrade + Chakra integration + CI

**Status:** TODO

## Why
Storybook 9 is already installed in `./ui` (`storybook ^9.0.6`) but `.storybook/main.ts` doesn't have a Chakra provider decorator — stories may render without theme. After folding everything in, we want to deploy the Storybook publicly (it used to live at `ui.villagekit.com`) and gate changes with CI.

## What
Stories all render with the v3 theme applied. Storybook deployed somewhere reachable. CI (GitHub Actions) runs lint + type-check + storybook-build on every PR.

## Steps

### Storybook
- [ ] Add a `.storybook/preview.tsx` that wraps every story with the `Provider` from the library (so the theme is applied).
- [ ] Add useful global decorators: viewport sizes (mobile, tablet, desktop), color-mode toggle if v3 supports it.
- [ ] Add `addon-a11y` for accessibility checks during development.
- [ ] Cover every component with at least one story (currently 24 stories vs 25 components — fill gaps).
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
- Storybook 9 is the latest major; no upgrade needed for now.
- `chromatic.com` would catch visual regressions but adds a paid dep. Probably overkill for v1.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
- [./03-fold-ui-page.md](./03-fold-ui-page.md), [./04-fold-ui-nav.md](./04-fold-ui-nav.md), [./05-fold-ui-media.md](./05-fold-ui-media.md), [./06-fold-ui-mdx.md](./06-fold-ui-mdx.md) — all stories should exist before CI is meaningful
