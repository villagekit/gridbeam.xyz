---
title: "Gate: the operator declares parity"
status: todo
tags:
  - gate
parent: 1783931160f2
blocked_by: 337e35d86920
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
