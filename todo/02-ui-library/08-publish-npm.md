# 08 — Publish to npm with proper CI/CD

**Status:** DONE (release infrastructure landed; first publish pending trusted-publisher config on npmjs.com + CI run)

## Why
`@villagekit/ui` should be installable from npm so anyone can use it. Right now the package is in a workspace, never published.

## What
`@villagekit/ui` published on npm. A CHANGELOG. Automated publish on tag (or via Changesets / release-please).

## Steps
- [x] Confirm npm scope ownership: `@villagekit` is owned by `ahdinosaur`; latest published `@villagekit/ui` is `0.9.0` from the engine's `core/ui` (last published 2024-12-05).
- [x] Add `CHANGELOG.md` — seeded with `1.0.0-beta.0` notes covering the Chakra v3 migration and folded `ui-page` / `ui-nav` / `ui-media` / `ui-mdx` packages.
- [x] Decide release process: **Changesets**.
- [x] Add `.changeset/config.json` (single-package, `access: "public"`, base `main`).
- [x] Set up `.github/workflows/release.yml` running `changesets/action@v1` on push to main — opens a "Version Packages" PR for any pending changesets, publishes when merged.
- [x] Configure publishing via npm trusted publisher (OIDC). Workflow grants `id-token: write`, drops `NPM_TOKEN`. Node 24 LTS is used so npm 11.5+ is available natively (`changeset publish` shells out to `npm publish`, which negotiates the OIDC token exchange).
- [ ] **(Mikey)** Configure the trusted publisher on npmjs.com for `@villagekit/ui` — repo `villagekit/ui`, workflow filename `release.yml`, no environment. https://docs.npmjs.com/trusted-publishers
- [x] Verify `package.json` `files` whitelist (`./src`, `./dist`).
- [x] Run `pnpm run publint` — passes.
- [x] Do a test publish with `--dry-run` — `1.0.0-beta.0`, 339 files, 102 kB tarball.
- [ ] Publish `1.0.0-beta.0` — runs automatically once the trusted publisher is configured and the next push to `main` lands.
- [ ] Verify install: `pnpm add @villagekit/ui@next` in a fresh project, import a component, render it. (After publish.)

## Notes
- README already declares the homepage and repo URLs correctly.
- ESM-only is fine. If any consumer needs CJS, that's a separate ask.
- **Beta first.** `1.0.0-beta.0` publishes with the `next` dist-tag (`publishConfig.tag: "next"` + `release` script passes `--tag next`). The website still consumes via `workspace:*` so it's not affected by what's on npm.
- **Changesets pre-mode not used.** Tried `pnpm changeset pre enter beta` from inside `./ui` but Changesets walks up to `gridbeam.xyz/pnpm-workspace.yaml` and treats the parent as the workspace root, missing the `.changeset/` folder. Worked around it by hardcoding `--tag next` in the `release` script. When promoting to stable `1.0.0`, drop `publishConfig.tag` and the `--tag next` flag (steps documented in `ui/README.md`).
- **Why `1.0.0-beta.0` (not `1.0.0`):** The current build hasn't been smoke-tested through Storybook (deferred per task 02-07 notes), and the engine still consumes the old `core/ui` (Stream 03 task 08). Beta gives us room to fix issues that surface as the engine and website exercise the API without polluting `latest`.
- **Website still uses `workspace:*`.** Decided not to switch the website to a published version — workspace gives faster dev iteration. Consumers outside this monorepo install from npm with the `next` dist-tag.

## Depends on
- [./07-storybook-and-ci.md](./07-storybook-and-ci.md) (CI in place)
- [./09-use-client-audit.md](./09-use-client-audit.md) — RSC-safe components before third parties consume them
- [./10-build-pkg-setup.md](./10-build-pkg-setup.md) — `dist/` must exist for `pnpm publish` to produce a usable package
- [../03-engine/01-license-cleanup.md](../03-engine/01-license-cleanup.md) — license consistency across `@villagekit/*` is nice
