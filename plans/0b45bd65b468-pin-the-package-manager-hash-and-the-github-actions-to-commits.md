---
title: Pin the package manager hash and the GitHub Actions to commits
status: todo
tags:
  - "worker:sonnet"
---
The audit at the adoption of the shared agentic set (plan `0448bc2d`) found two floating pins.

## Work

Rule: `CLAUDE.md, Conventions`, "Pinned versions, checksummed where offered; a bump is its own commit naming what it buys."

Places: `package.json:7` (`"packageManager": "pnpm@9.9.0"` without corepack's `+sha512.<hash>`), `.github/workflows/check.yml:16`, `:19`, `:21` (`actions/checkout@v4`, `pnpm/action-setup@v4`, `actions/setup-node@v4`, floating major tags).

Fix: add the `+sha512.<hash>` corepack offers to the `packageManager` pin, and pin each action to its full commit SHA with the tag in a trailing comment.

## Seams under test

None.

## Done when

- `package.json`'s `packageManager` carries a hash and every `uses:` in `.github/workflows/check.yml` names a 40-character SHA
- CI is green on the push
- `timeout 900 just check` is green

## Outcome

## Log
