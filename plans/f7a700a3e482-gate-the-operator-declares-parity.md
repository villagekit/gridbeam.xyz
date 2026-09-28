---
title: "Gate: the operator declares parity"
status: todo
tags:
  - gate
  - attended
parent: 1783931160f2
blocked_by:
  - 337e35d86920
  - target: 99f2fe62c62f
    note: the deferred publishes land before the operator reviews
  - target: 77cf83a1285a
    note: the operator's verdicts on the shell come before the review of the site
  - target: 8bb4a4380264
    note: the operator's verdicts on the home come before the review of the site
  - target: 239f17128896
    note: the operator's verdicts on the stories index come before the review of the site
  - 14be8f377b34
  - 549ec777422c
  - target: 8512c5e9cc98
    note: the operator's verdicts on the design pages come before the review of the site
  - target: 0c6face80696
    note: the operator's verdicts on the contact route come before the review of the site
  - target: d2beea2f9659
    note: the operator's verdicts on the legal route come before the review of the site
  - target: ddb2aba0ac3d
    note: the operator's verdicts on the suppliers route come before the review of the site
  - 91b42a34a79f
---

The operator has reviewed every route and declares the site at parity with the legacy gridkit.nz site. Only a human can say when parity is reached. This gate is the operator's: an orchestrator stops here.

## Work

Walk every route on `pnpm dev` beside the legacy site one last time. Finish this gate when satisfied.

## Seams under test

None.

## Done when

- Every route record under M2 is `done`
- `kipu list --collection difference --status open` and `--status regression` both print nothing
- The operator has finished this plan

## Log

- 2026-09-27: From the design pages record's split (plan 0bc88eaf5493): blocked_by the design pages' verdicts plan [[8512c5e9cc98]], written at the split so the operator's verdicts come before the review.

- 2026-09-28: From the subscribe record's split (plan fbb7c2c27eb5): blocked_by the subscribe verdicts plan 91b42a34a79f, written at the split so the operator's verdicts come before the review.
