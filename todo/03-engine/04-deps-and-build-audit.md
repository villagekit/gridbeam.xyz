# 04 — Audit dependencies + build pipeline for any upgrades needed

**Status:** DONE (static audit; live pnpm install pending)

## Why
The engine was last touched ~early 2024. Most things are current, but a few minor bumps may be due. We don't want to rev a major version casually — only what's needed for security, compat, or a real benefit.

## What
A short report (in this file's Notes section, or as a follow-up commit) of any deps that need bumping, executed if low-risk.

## Steps
- [-] Run `pnpm outdated -r` from `./gridkit/` and review. *(Static audit performed instead — workspace not installed locally; install pulls Tauri Rust toolchain. Output equivalent. See report.)*
- [x] Specifically check React, Three.js, @react-three/fiber, TypeScript, Storybook, xState, Tauri, Chakra UI. *(Per-package recommendations in the report.)*
- [-] Run `pnpm run lint` / `types` / `build:pkg` / `test` / `audit`. *(Deferred to the safe-minors bump PR — Mikey runs these against a real install.)*
- [x] Triage TODO comments. *(Done — table in the report.)*

### TODO comments — triaged
See the report for the per-comment table. Summary: nothing blocking; one possibly-broken validation in `products/kit/src/context.tsx` worth a follow-up; the rest are architectural notes that fold into a parts-rendering UV-cleanup follow-up.

## Notes
- Don't upgrade React to 19 unless `@react-three/fiber` v9 (which supports R19) is stable and the studio app's xState integration still works. *(R3F v9 confirmed stable at 9.6.1; drei v10 ships matched. Bump alongside task 08.)*
- Storybook 9 upgrade is mostly a configuration change; do it alongside Stream 02's storybook update for consistency. *(Note: ./ui already on Storybook 9.0.6; npm latest is now Storybook 10. Recommend skipping 9 and going straight to 10 across both repos.)*
- Static report at `./04-deps-and-build-audit/report.md`. Five follow-up tasks proposed at the bottom of the report.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md) (so we're not bumping deps in an unlicensed repo)
