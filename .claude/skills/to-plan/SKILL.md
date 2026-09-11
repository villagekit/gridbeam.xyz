---
name: to-plan
description: "Turn the settled conversation into a plan record: the design that /to-plan-slices later splits into one-commit slices. No interview, just synthesis."
---

# To Plan

Write the record of the work the conversation settled, as an item in the
`plan` collection. Synthesize what was decided; the deciding is done. If
the design is not settled, say so and suggest a grilling first (the
`grilling` skill).

A record is a milestone, or a route's parity work, or a feature too big for
one commit; `/to-plan-slices` splits it. Work that fits one commit is written
as a slice directly, in the shape `.kipu/templates/plan.md` gives, and never
as a record: on one-commit work the record's paperwork outweighs its outcome.

## Bindings

Nothing here restates the store; read it:

- `plans/README.md`, "Writing a plan": the two shapes, the frontmatter a
  plan carries, prefix versus full id, the verbs that mint and move.
- `.kipu/collections/plan.toml`: the states, the fields, the headings.
- `decisions/`: the recorded decisions; a plan cites them by prefix.
- `differences/`: the parity ledger; a route record lists the differences
  it will close, by id.
- The M1 record in `plans/`: a real record, the example.

## Process

1. Orient in the decisions in the area and the differences on the route. A
   conflict with a recorded decision is flagged and a superseding decision
   proposed, never overridden in the plan.
2. Sketch the seams the tests will use: existing seams before new ones, the
   highest seam possible, as few as possible. Most route work has no pure
   seam; say so rather than inventing one. Check the seams with the user.
3. Write the record in the shape below with `kipu new plan --title <text>`
   (then edit the body), set its `parent` and `blocked_by` edges with
   `kipu relate`, and add it to the order of work in `plans/README.md`. If
   the work fits one commit, write a slice from the template instead, with
   the same edges, and stop here.

## The record

All sections H2, in this order. The title is frontmatter, so no H1.

- **Goal**: one paragraph, what the work yields, end to end, from the
  visitor's or the operator's perspective.
- **Scope**: the deliverables, in CLAUDE.md's vocabulary. Decisions are
  cited by prefix, never restated. Differences are listed by id with their
  titles.
- **Seams under test**: the seams from step 2, or "none pure" and why.
- **Exit demo**: one observable check that closes the record. For a route
  record it is the operator reviewing the route on `pnpm dev` against the
  legacy site, with every cited difference `fixed` or `sanctioned`.
- **Out of scope**: what is deferred, and to which record if known.
- **Outcome**: empty; written when the record is finished.
- **Log**: empty; `kipu note` appends here.

A record carries no done-when list: its slices do, and the record closes
when they have shipped and the exit demo holds. A gate between records (the
copy grilling, the operator's sign-off) is itself a plan the next record is
`blocked_by` and tagged `gate`, so the fold holds it and agents stop at it.

References age well: a route, a component name, a decision prefix, a
difference id. A `file:line` is evidence of the current state, never an
instruction. Code appears only where a probe produced a snippet that encodes
a decision, trimmed to that decision.
