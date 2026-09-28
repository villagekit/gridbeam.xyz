---
title: Use biome check --write in the format scripts
status: done
worker: sonnet
---
The audit at the adoption of the shared agentic set (plan `0448bc2d`) found the deprecated flags.

## Work

Rule: the `typescript` skill, "Toolchain": "Biome for lint and format; `biome check --write .` formats."

Places: `package.json:18` (`"format": "biome check --apply ."`) and `:19` (`"format:unsafe": "biome check --apply-unsafe ."`); Biome 1.9.4's own help marks both aliases deprecated.

Fix: `biome check --write .` and `biome check --write --unsafe .`.

Docs: `CLAUDE.md, Commands` names `pnpm format`'s command.

## Seams under test

None.

## Done when

- `grep -c -- "--apply" package.json` prints 0 and `pnpm format` runs clean
- `timeout 900 just check` is green

## Outcome

Renamed both format scripts in package.json to Biome 1.9.4's non-deprecated flags: `format` to `biome check --write .`, `format:unsafe` to `biome check --write --unsafe .`. Updated CLAUDE.md's Commands table row for `pnpm format` to match. The justfile's `fmt`/`fmt-check` recipes call `pnpm format`/`pnpm lint` and needed no change.

Proof: `grep -c -- "--apply" package.json` prints 0; a repo-wide `git grep` for `--apply`/`apply-unsafe` finds only the plan item's own historical text; `pnpm format` ran clean (Checked 128 files, no fixes applied); `pnpm exec biome check --help` confirms `--write` and `--write --unsafe` are exactly what `--apply` and `--apply-unsafe` were aliases for; `timeout 900 just check` ran green.

Reviewed by a fresh Opus sub-agent on Standards, Spec and Parity: no critical findings, the flag rename verified against Biome's own help text rather than assumed, no other reference to the deprecated flags found, Parity not applicable since the diff touches no route.

## Log
