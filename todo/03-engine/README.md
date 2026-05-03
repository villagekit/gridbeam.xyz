# Stream 03 — Engine (`./gridkit`)

The `./gridkit` submodule is a mature pnpm/turbo monorepo containing the code-as-CAD engine: parts library (gridbeam, gridpanel, fastener), product assemblies (kit), the WebGL sandbox renderer, the parameters / design system, and the Tauri-wrapped studio editor app.

It's good code. It's *almost* ready to be open-source — but it's blocked on a few mismatches between intent and reality.

## Goal

Cleanly publish the engine as open-source under EUPL-1.2, with consistent licensing across all packages, an honest README, a renamed GitHub repo, and (for the runtime packages) entries on npm — so the gridbeam.xyz website can consume them.

## Tasks

| # | Task | Status |
|---|------|--------|
| 01 | [Add EUPL-1.2 LICENSE file + fix `UNLICENSED` in every package.json](./01-license-cleanup.md) | DONE |
| 02 | [Rewrite README — drop "superseded" framing](./02-readme-and-positioning.md) | DONE |
| 03 | [Rename GitHub repo from `gridkit-legacy`](./03-rename-repo.md) | DONE |
| 04 | [Audit dependencies + build pipeline for any upgrades needed](./04-deps-and-build-audit.md) | DONE (static audit; live install pending) |
| 08 | [Migrate engine to Chakra v3 + remove `core/ui`](./08-migrate-engine-to-chakra-v3.md) | DONE (build/types/lint clean; runtime verification deferred) |
| 05 | [Publish runtime packages to npm](./05-publish-npm.md) | BLOCKED (engine standalone install + `@villagekit/ui` first publish) |
| 06 | [Decide future of the studio Tauri app](./06-studio-app-future.md) | DONE (decision) |
| 07 | [Wire engine into gridbeam.xyz website (designs catalog)](./07-website-integration.md) | DONE (build/types/lint clean; live canvas runtime verification deferred) |
| 09 | [`@villagekit/products` distribution decision](./09-products-catalog-publish.md) | DONE (decisions logged + cleanup landed; publishing deferred) |

## Order of attack

- 01-04 are mostly housekeeping; can run in parallel after 01 is started.
- **08 must happen before 05** — the engine's `core/ui` (which currently publishes as `@villagekit/ui`, conflicting with the standalone library) is removed here. Publishing must wait until that's resolved.
- 05 depends on 01, 04, 08 being done.
- 06 is a decision task — output is a one-line decision logged into CLAUDE.md.
- 07 is the integration that connects the engine to the website's designs catalog page (Stream 01 task 06).

## Reference: current state

- **Build pipeline**: turbo + tsup + biome — modern and working. No upgrade needed there.
- **Tech versions**: React 18.2/3, Three 0.165, TypeScript 5.2-5.4, Storybook 8 — current as of early 2024. Only minor bumps likely needed, except for **Chakra (v2 → v3)** which has to happen so the engine can consume the standalone `@villagekit/ui`.
- **License situation**: README says EUPL-1.2 but no `LICENSE` file at repo root, and **every** publishable package's `package.json` says `"license": "UNLICENSED"`. Internal contradiction — needs reconciling.
- **Workspace shape**: `apps/{studio,storybook}` (private), `core/*` (including `core/ui` which is being removed), `parts/*`, `products/*`, `kit-plugins/*`, `util/*`, `dev/tsconfig`, `commands/screenshot`. All `core/parts/products/kit-plugins/util` packages are versioned 0.9.0 and intended to be public.
- **Latest commits**: `6f26217 Add superseded`, `46f03b5 Add demo video`, `c4d1b26 Prep for a public release` — so prep is partly underway already.

## A note on `villagekit/villagekit`

A separate GitHub repo at `villagekit/villagekit` exists as a newer/better engine effort. **It's not in scope for this work.** This `./gridkit` codebase is being reclaimed specifically to power gridbeam.xyz, even though there's a successor in flight. The two projects can converge later; for now they're independent. The README rewrite (task 02) should drop the "superseded by villagekit/villagekit" line but is **not** trying to suppress that repo's existence — just stop framing this codebase as obsolete.

## What "open-source ready" means here

- LICENSE file at repo root (EUPL-1.2, real text from https://choosealicense.com/licenses/eupl-1.2/).
- Every public package.json has `"license": "EUPL-1.2"`.
- README is honest about positioning — drops the "superseded" framing.
- README explains how to install, use, and contribute.
- `core/ui` removed; consumers depend on the standalone `@villagekit/ui` (Stream 02).
- Runtime packages (`@villagekit/sandbox`, `@villagekit/parameters`, `@villagekit/design`, `@villagekit/part`, `@villagekit/product`, `@villagekit/part-gridbeam`, `@villagekit/part-gridpanel`, `@villagekit/part-fastener`, `@villagekit/product-kit`, `@villagekit/util-math`, `@villagekit/util-units`, `@villagekit/kit-plugin-smart-fasteners`) are published to npm. **Note `@villagekit/ui` is NOT in this list** — the standalone library at `./ui` owns that name.
- GitHub repo renamed off the `-legacy` suffix.
