---
title: A sibling fix waits on the publish as upstream, and one attended bump plan closes it
status: accepted
date: 2026-09-25
---
## Context

Many regressions are closed by a change in `@villagekit/ui` or a `@villagekit/*` engine package, which this site consumes from npm: 45 of the shell's 65 and 38 more across the routes cite `@villagekit/ui`. The publish is the operator's, and a run that stopped at every publish would stop a dozen times. On 2026-09-25 the operator deferred every publish to the end of M2.

## Decision

- A difference whose fix lands in `../ui` or `../gridkit` is closed there by its own slice, on Fable: the change committed in the sibling by pathspec (never pushed from here; the sibling's push goes with the operator's publish), verified by the sibling's own checks, and seen on this site through an uncommitted override of the dependency to the sibling path, reverted by path before the commit, which never ships. The slice then moves each item to `upstream` (`kipu move <id> upstream --from regression`) with a note citing the sibling commit, and writes a `blocked_by` edge from the bump plan to itself.
- `upstream` is a state of the `difference` collection: fixed in a sibling, waiting on the publish. A route record finishes with `upstream` items on it; a route is at parity when no item on it is `open` or `regression`, and the site is at parity only when none is `upstream` either.
- One bump plan, tagged `attended`, holds the publish: the operator publishes the packages, then the plan bumps `package.json` and the lockfile, runs the gate and the screenshot pairs, and moves every `upstream` item to `fixed` (`kipu fix <id> --outcome "plan <prefix>"`), an `upstream` item the publish did not fix going back to `regression` with a note. The parity gate is `blocked_by` the bump plan.
- The Parity review treats an `upstream` item as an expected difference on the screenshot pairs, not a finding.

## Consequences

`differences/README.md`, the `parity` skill's review brief and CLAUDE.md name the state. The M2 record's rule that a site slice consuming a publish carries a Wants line is withdrawn: no slice consumes a publish until the bump plan, and no Wants line stops a run for one. `../gridkit` sits ahead of its origin with the operator's own commits; a worker's pathspec commit there lands on top of them and pushes nothing.
