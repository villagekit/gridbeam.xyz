---
title: "After the operator's publish: bump @villagekit/ui and the engine packages, close the upstream items"
status: todo
tags:
  - attended
---
Every difference fixed in `../ui` or `../gridkit` during M2 waits here in `upstream`, since the publishes are deferred to the end of the milestone (decision `28c1a536`). This plan is the operator's until the packages are on npm; then it bumps the site and turns every `upstream` item into `fixed`, or back into `regression` where the publish did not carry the fix.

wants: the operator's publish of `@villagekit/ui` and of every `@villagekit/*` engine package a `blocked_by` slice below changed, to npm.

## Work

- `pnpm update @villagekit/ui --latest` and the same for each engine package the blocking slices changed; commit `package.json` and `pnpm-lock.yaml`.
- The gate, then `pnpm audit:pages` and `pnpm audit:dom` over every route with an `upstream` item; look at the pairs.
- For each `upstream` item (`kipu list --collection difference --status upstream --json`): `kipu fix <id> --outcome "plan <this prefix>"` when the pairs show it closed, else `kipu move <id> regression --from upstream` with a note saying what the pairs still show, and a new slice under the item's route record for it.
- The parity gate `f7a700a3e482` is `blocked_by` this plan; it becomes ready when this finishes.

## Seams under test

None.

## Done when

- `kipu list --collection difference --status upstream` is empty, checked after the moves
- `package.json` pins the published versions and `pnpm-lock.yaml` matches
- `timeout 900 just check` is green
