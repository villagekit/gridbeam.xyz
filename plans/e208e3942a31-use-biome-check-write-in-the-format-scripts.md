---
title: Use biome check --write in the format scripts
status: todo
tags:
  - "worker:sonnet"
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

## Log
