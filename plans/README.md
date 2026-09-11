# plans: the run sheet

The `plan` collection, declared in [.kipu/collections/plan.toml](../.kipu/collections/plan.toml).
The frontmatter is the machine-readable truth (`status`, `priority`,
`parent`, `blocked_by`, `tags`); this README is commentary, and
`kipu ready --collection plan` is the order of work. Ids are twelve hex
characters; prose cites a plan by any unique prefix. Nothing is numbered,
so nothing is ever renumbered.

## Order of work

The epic is the one record tagged `epic`. Its children are the milestones,
in the sequence their `blocked_by` edges give. Each milestone is a record
to be sliced with `/to-plan-slices` before it starts; the slices become
its children. The "Milestones" section at the end of this file names them;
`kipu list --collection plan --parent <id>` and `kipu ready --collection
plan` say where they stand, and the frontmatter wins over the prose.

## Writing a plan

Two shapes, one collection:

- A **record** is work too big for one commit: a milestone, a route's
  parity work, a feature `/to-plan-slices` will split. Its body is Goal,
  Scope, Seams under test, Exit demo, Out of scope, Outcome, Log: all H2,
  no H1, the title in frontmatter. `/to-plan` writes one.
- A **slice** is one commit. Its body is [.kipu/templates/plan.md](../.kipu/templates/plan.md):
  a paragraph, Work, Seams under test, Done when, Outcome, Log. `kipu new
  plan` and `kipu split` copy that body; a record's body is written by hand.

Frontmatter: `title` (required); `status: todo`; `parent` naming the record,
if it has one (a slice cut by `kipu split` also carries `derived_from` to
it); `blocked_by` for every plan whose deliverable this one consumes, hard
unless `--soft` with a `--note` for an ordering preference; `priority` only
on a slice, `medium` unless it is pulled ahead (`urgent`, `high`) or pushed
back (`low`); `tags` for the two process tags this store uses, `gate` and
`epic`. Sequence lives in edges and nowhere else: priority is the weight
that breaks ties among ready items, and a record carries none. kipu writes
edge targets as full ids; prose and commit subjects cite by prefix.

Minting is `kipu new plan --title <text>` (a slice or a record) or
`kipu split <record> --title <text>...` (the slices of a record, with their
`parent` and `derived_from` edges). Edges are `kipu relate <id> blocked_by
<other>`; weight is `kipu set <id> priority high`; a gate is `kipu set <id>
tags --append gate`.

A record moves to `doing` in the commit that mints its slices, so a sliced
record never competes with them for ready. A slice moves to `done` with its
Outcome in the commit that ships it (`kipu finish <id> --outcome -`). A
record stays open until its slices have shipped and its exit demo holds;
then the operator runs the demo and finishes it. A gate between records
(the copy grilling, the operator's sign-off on a route) is a plan the next
record is `blocked_by` and tagged `gate`: it is the operator's, and agents
stop at it.

## Wants

Prerequisites outside the graph, which no edge can express. A plan that
needs one carries a "wants:" line in its body, and an orchestrator stops at
it when the environment cannot meet it:

- A publish of `@villagekit/ui` or a `@villagekit/*` engine package to npm:
  the operator's.
- The Buttondown API key, for the subscribe form: the operator's.
- Cloudflare and DNS credentials, for the release: the operator's.
- The operator's eyes on `pnpm dev`, for every route record's exit demo.

## Vocabulary

Process terms, defined here because no other file owns them:

- **Record**: a plan too big for one commit, holding the goal, scope, seams
  and exit demo its slices are cut from.
- **Slice**: a plan that is one commit. Cut from a record it carries
  `parent` and `derived_from` to it; written directly it carries neither.
- **Seam**: the interface a test exercises. The fewer and the higher, the
  better. Most route work has none that is pure.
- **Gate**: a plan tagged `gate` that holds the next record until something
  outside the code has happened: a grilling, a sign-off, a publish. It is
  the operator's to move.
- **Epic**: the one record tagged `epic`. It parents the milestones.
- **Milestone**: a record that is a child of the epic and a step in its
  sequence, closed by its exit demo.
- **Route record**: a record for one route's parity work, a child of the
  parity milestone, listing the differences it will close.
- **Order of work**: the sequence `blocked_by` and `priority` give, which
  `kipu ready` prints. The **run sheet** is this file, its commentary.

## Milestones

The epic: `1783931160f2` gridbeam.xyz at parity and live. Its children, in order:

1. `c6182c6a8609` M1: the parity ledger. Slices: `4465f31eea38` audit tooling: DOM extraction (first, urgent); then `b2ed8f4c3f6e` the shell (high; blocks the rest), `3f28cb79b112` home and about, `848b026f7a17` faq, contact, legal, tools and resources, subscribe, `843901f42191` stories, `cf52c3885b8a` designs, `5c68a1cb8f07` cutting planner and suppliers, any order.
2. `e2805adefd47` Gate: the copy grilling, blocked by M1. The operator's.
3. `337e35d86920` M2: parity, route by route, blocked by the gate. Its route records, each blocked by the shell record and soft-ordered as listed: `a78b167170b8` the shell, `fd9a92bd8abd` home, `40179ab9e779` about, `7f0b60d948c5` faq, `ca353de8b645` stories index, `56e6eb197e6c` story pages, `f901cf9f724d` designs index, `0bc88eaf5493` design pages, `396c9af0cbd1` cutting planner, `a0b4d829f7a9` tools and resources, `1a3ab91a9640` contact, `e710087c8961` legal, `872ab70e2ff9` suppliers with the map, `fbb7c2c27eb5` subscribe with the form (wants the Buttondown key). Each is sliced with `/to-plan-slices` after the copy gate.
4. `f7a700a3e482` Gate: the operator declares parity, blocked by M2. The operator's.
5. `5802bbc9d984` M3: dependency upgrades, blocked by the gate.
6. `a4df2bf79395` M4: release on Cloudflare, blocked by M3. Wants Cloudflare and DNS credentials.
