# 08 — Publish to npm with proper CI/CD

**Status:** TODO

## Why
`@villagekit/ui` should be installable from npm so anyone can use it. Right now the package is in a workspace, never published.

## What
`@villagekit/ui` published on npm. A CHANGELOG. Automated publish on tag (or via Changesets / release-please).

## Steps
- [ ] Confirm npm scope ownership: log in to npm and verify `@villagekit` is owned. (No collision with the engine — the engine's `core/ui` is being removed in Stream 03 task 08.)
- [ ] Add `CHANGELOG.md` — start fresh from `0.x` (current version is `0.7.2` but post-Chakra-v3 this is a major break, bump to `1.0.0` or `0.8.0` with clear notes).
- [ ] Decide release process:
  - **Manual** — `pnpm publish` from local on a tagged commit. Simple, requires discipline.
  - **Changesets** — PR-based changelog entries, automated release PR. Recommended for libraries.
  - **release-please** — Google's tool, conventional commits → auto release.
  - Recommend Changesets.
- [ ] Add `.changeset/config.json` and an initial changeset entry for the v3 migration.
- [ ] Set up a `.github/workflows/release.yml` that runs on push to main, opens a release PR with version bumps, and publishes when that PR is merged.
- [ ] Add the `NPM_TOKEN` secret to the GitHub repo.
- [ ] Verify `package.json` `files` whitelist covers what npm should actually ship (`./dist`, README, LICENSE).
- [ ] Run `pnpm run publint` and fix any export-map warnings.
- [ ] Do a test publish with `--dry-run` first.
- [ ] Publish v1.0.0.
- [ ] Verify install: `pnpm add @villagekit/ui` in a fresh project, import a component, render it.

## Notes
- README already declares the homepage and repo URLs correctly.
- ESM-only is fine. If any consumer needs CJS, that's a separate ask.
- Consider beta/canary versions during the v3 migration before cutting v1.0.0 stable.

## Depends on
- [./07-storybook-and-ci.md](./07-storybook-and-ci.md) (CI in place)
- [./09-use-client-audit.md](./09-use-client-audit.md) — RSC-safe components before third parties consume them
- [./10-build-pkg-setup.md](./10-build-pkg-setup.md) — `dist/` must exist for `pnpm publish` to produce a usable package
- [../03-engine/01-license-cleanup.md](../03-engine/01-license-cleanup.md) — license consistency across `@villagekit/*` is nice
