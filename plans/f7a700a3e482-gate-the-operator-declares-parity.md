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
