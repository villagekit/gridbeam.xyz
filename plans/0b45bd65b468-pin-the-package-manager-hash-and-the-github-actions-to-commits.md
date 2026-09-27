---
title: Pin the package manager hash and the GitHub Actions to commits
status: done
worker: sonnet
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

Added corepack's hash to package.json's packageManager: pnpm@9.9.0+sha512.60c18acd138bff695d339be6ad13f7e936eea6745660d4cc4a776d5247c540d0edee1a563695c183a66eb917ef88f2b4feb1fc25f32a7adcadc7aaf3438e99c1. The hash is the sha512 of the pnpm 9.9.0 npm tarball, cross-checked three ways: npm view pnpm@9.9.0 dist.integrity converted from base64 to hex, sha512sum on a fresh curl of the registry tarball, and corepack's own cached .corepack metadata for that version, all three agreeing.

Pinned each uses: in .github/workflows/check.yml to the commit its v4 tag points to, read with git ls-remote: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4.4.0, pnpm/action-setup@b906affcce14559ad1aafd4ab0e942779e9f58b1 # v4.3.0 (the tag is annotated, so the peeled ^{} commit is used, not the tag object), actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0.

timeout 900 just check ran green: lint, typecheck, 89 tests passed, and next build succeeded with no diff in app/_lib/designs-data.generated.ts. pnpm-lock.yaml did not change. A fresh Opus review (Standards and Spec; Parity does not apply, nothing visitor-facing changed) approved with no blocking issues, having independently verified the hash and each SHA and tag comment.

Pushed to main; CI run to be confirmed after the commit.

## Log

- 2026-09-28: CI on the push (run 36321632210, commit dc86d9c) failed at the pnpm build step; every step through checkout, pnpm/action-setup and setup-node at their new pinned SHAs, install, lint, typecheck and test succeeded. This is pre-existing flakiness, not caused by this change: the pnpm build step failed the same way on the prior run for the commit already on main before this push (run 36321320452, commit 2af687f, still on the floating v4 tags) and on an earlier run for 4a03a980 before a retry of the same commit went green. No log detail beyond the step name is readable: gh auth token in this environment is invalid (gh auth status reports bad credentials in keyring) and the GitHub API's job-logs endpoint returns 403 Must have admin rights to Repository even unauthenticated, so the failure is recorded here by step and by this cross-run pattern rather than by log excerpt. Not re-run or forced; the operator can rerun the job or fix gh auth to read the log.
