# 04 — Audit dependencies + build pipeline for any upgrades needed

**Status:** TODO

## Why
The engine was last touched ~early 2024. Most things are current, but a few minor bumps may be due. We don't want to rev a major version casually — only what's needed for security, compat, or a real benefit.

## What
A short report (in this file's Notes section, or as a follow-up commit) of any deps that need bumping, executed if low-risk.

## Steps
- [ ] Run `pnpm outdated -r` from `./gridkit/` and review.
- [ ] Specifically check:
  - **React** (currently 18.3.1 in storybook, 18.2 in studio) — task 08 (Chakra v3 migration) settles whether we go to React 19 or stay on 18.x. Don't preempt.
  - **Three.js** (0.165) — minor versions release frequently. Bumping to latest (~0.170+) may be safe.
  - **@react-three/fiber** — currently ^8.16.8. v9 may exist. Upgrade if compatible (especially relevant if React 19 is in scope per task 08).
  - **TypeScript** (5.2-5.4) — bump to ~5.5+.
  - **Storybook** (8.1.6) — v9 exists; upgrade matches what `./ui` uses.
  - **xState** (5.13) — minor bumps fine.
  - **Tauri** (v2 in studio) — fine.
  - **Chakra UI** — handled by task 08 (whole-engine v3 migration). Don't touch here.
- [ ] Run `pnpm run lint` and fix any new Biome warnings.
- [ ] Run `pnpm run types` and fix any new TS issues.
- [ ] Run `pnpm run build:pkg` and ensure clean output.
- [ ] Run `pnpm run test` (only `util/units` has Vitest tests currently; consider expanding test coverage as a separate task).
- [ ] Check for security advisories: `pnpm audit`.

### TODO comments to triage
The following TODOs were spotted during the explore — none blocking, but worth a sweep:
- `util/units`: "TODO memoize" — performance hint.
- `parts/fastener`, `parts/gridbeam`, `parts/gridpanel`: "TODO move texture to descriptor".
- `products/kit`: "TODO fix" / "TODO" (vague).
- `core/part`: UV mapping TODO.

Spend 30 minutes triaging — file follow-up tasks for anything substantive.

## Notes
- Don't upgrade React to 19 unless `@react-three/fiber` v9 (which supports R19) is stable and the studio app's xState integration still works.
- Storybook 9 upgrade is mostly a configuration change; do it alongside Stream 02's storybook update for consistency.

## Depends on
- [./01-license-cleanup.md](./01-license-cleanup.md) (so we're not bumping deps in an unlicensed repo)
