---
name: to-plan-slices
description: "Split a plan record into one-commit tracer-bullet slices with blocked_by edges, hardened by adversarial review rounds and placed in the order of work."
---

# To Plan Slices

Split a record into slices: tracer bullets, each one focused commit, each
declaring what gates it. Nothing here restates the store; read it:

- `plans/README.md`, "Writing a plan": the two shapes, the frontmatter a
  plan carries, prefix versus full id, the verbs that mint and move.
- `.kipu/collections/plan.toml`: the states, the fields, the headings.
- `.kipu/templates/plan.md`: the slice body. `kipu split` writes it.

## Process

1. Read the record in full, every decision it cites, and every difference
   it lists (`kipu show <id>` on each).
2. Draft the slices. Each cuts a narrow but complete path through every
   layer it touches (data, component, page, tests, screenshots) and is
   demoable alone on `pnpm dev`; a slice that ships one layer works only
   when its siblings land, so it is not a slice. Size is one commit in one
   fresh context window. Split only where a reviewer could reject one slice
   while approving its neighbor. Any prefactoring is its own slice, first.
   A wide refactor (one mechanical change whose blast radius spans the
   codebase, such as a shared component's API) is sequenced expand, migrate
   in batches per directory, contract, each batch a slice blocked by the
   expand, the contract blocked by every batch. Work in a sibling repo
   (`../ui`, `../gridkit`) is its own slice, and the site slice that consumes
   the publish is `blocked_by` it and carries a "wants: publish" line.
3. Give each slice its edges and weight: `parent` and `derived_from` to the
   record (`kipu split` writes both); `blocked_by` for every deliverable it
   consumes from another slice, never only a mention in prose, hard by
   default, `--soft --note` for an ordering preference that does not gate;
   `priority` as the weight `plans/README.md` defines, `medium` unless the
   slice is pulled ahead or pushed back. Sequence lives in the edges only.
   Each slice names the differences it closes, by id, in its Work section.
4. Present the numbered breakdown to the operator: title, blocked by, what
   it delivers, which differences it closes. The operator sets the
   granularity; iterate on their call. Unattended, an orchestrator's worker
   never runs this step: it stops and reports (the `implement` skill).
5. Run adversarial review rounds: fresh Opus sub-agents each round, given
   the record, the slices and the brief below. Fix between rounds. Stop
   when two consecutive rounds return nothing actionable, or when the
   operator calls it.
6. Mint the slices with one `kipu split <record> --title ... --title ...`,
   blockers first so edges cite real ids, then `kipu relate` the
   `blocked_by` edges and `kipu set` the priorities, and fill each body from
   the template. Add them to the order of work in `plans/README.md`, and
   move the record to `doing` in the same commit, so only slices are ever
   ready. The record closes when its slices have shipped and its exit demo
   holds.

Shared context lives in the record and a slice cites it by prefix, never
copies it. What one slice learns that a later one needs goes into the
record's Log, not into the next slice's body.

## Review brief

- **Contradictions** with the recorded decisions and the differences'
  verdicts.
- **Edges that lie**: a slice consumes a deliverable with no `blocked_by`
  edge, direct or transitive, to the slice that produces it.
- **Coverage**: inventory every difference the record lists and every
  deliverable in its Scope, and diff it against the union of the slices.
  Nothing uncovered, nothing assigned twice.
- **Done-when**: every line observable, at least one runnable; a line that
  reads the store's own state (a difference `fixed`) says when it is checked.
- **Port rule**: a slice on a drifted route starts from the legacy source;
  a slice on a faithful route fixes in place; a slice that would have the
  agent write copy is wrong.
- **Format**: the frontmatter parses (`kipu verify`); the template's sections
  are present and nothing is padded.
