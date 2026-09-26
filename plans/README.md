# plans: the run sheet

The `plan` collection, declared in [.kipu/collections/plan.toml](../.kipu/collections/plan.toml).
The frontmatter is the machine-readable truth (`status`, `priority`,
`parent`, `blocked_by`, `tags`); this README is commentary, and
`kipu ready --collection plan` is the order of work. Ids are twelve hex
characters; prose cites a plan by any unique prefix. Nothing is numbered,
so nothing is ever renumbered.

## Order of work

The top record is the one tagged `epic`. Its children are the milestones,
in the sequence their `blocked_by` edges give. Each milestone is a record
to be sliced with `/to-slices` before it starts; the slices become
its children. The "Milestones" section at the end of this file names them;
`kipu list --collection plan --parent <id>` and `kipu ready --collection
plan` say where they stand, and the frontmatter wins over the prose.

## Writing a plan

Two shapes, one collection:

- A **record** is work too big for one commit: a milestone, a route's
  parity work, a feature `/to-slices` will split. Its body is Goal,
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
back (`low`); `tags` for the process tags this store uses, `gate`, `epic` and
`attended`, and for the worker tag `worker:<model>` (`worker:fable`,
`worker:opus`, `worker:sonnet`) naming the model a slice runs on under
`/orchestrate`, written at the mint by the rule in CLAUDE.md, Sub-agents
(decision `8eed053a`); a slice with no worker tag runs on Fable. Sequence
lives in edges and nowhere else: priority is the weight
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
then `/finish-epic` runs the demo and finishes it, unattended
([[b9af27e0df50]]); an item left for the operator's verdict goes on one
attended plan minted beside the record, an agent-fixable one on a slice
beside it, and the record finishes anyway ([[40abdb2f222a]]). A gate between records (the copy grilling, the
operator's declaration of parity) is a plan the next record is `blocked_by`
and tagged `gate`; where the trigger is the operator's, it is tagged
`attended` too, and agents stop at it whoever handed it to them. Nothing
else makes a step attended.

## Wants

Prerequisites outside the graph, which no edge can express. A plan that
needs one carries a "wants:" line in its body, and an orchestrator stops at
it when the environment cannot meet it:

- A publish of `@villagekit/ui` or a `@villagekit/*` engine package to npm:
  the operator's, deferred to the end of M2, where the one attended bump
  plan `99f2fe62c62f` consumes it; until then a sibling fix parks its
  differences in `upstream` (decision `28c1a536`), and no slice carries
  this line.
- The Buttondown API key, for the subscribe form: the operator's; the one
  slice that needs it is tagged `attended` and carries the line, and the
  rest of the route ships without it.
- Cloudflare and DNS credentials, for the release: the operator's.
- The operator's eyes on `pnpm dev`, for the parity gate, where every route is reviewed.

## Vocabulary

Process terms, defined here because no other file owns them:

- **Epic**: a plan with children, at any depth: the top record, the
  milestones and the route records.
- **Record**: this repo's word for an epic, a plan too big for one commit,
  holding the goal, scope, seams and exit demo its slices are cut from.
- **Slice**: a plan that is one commit. Cut from a record it carries
  `parent` and `derived_from` to it; written directly it carries neither.
- **Seam**: the interface a test exercises. The fewer and the higher, the
  better. Most route work has none that is pure.
- **Gate**: a plan tagged `gate` that holds the next record until the
  trigger its body names has fired: a grilling, a sign-off, a publish. An
  agent checks the trigger; it is the operator's only when also tagged
  `attended`.
- **Attended**: a plan tagged `attended`, the operator's; `kipu ready --tag
  attended` is the operator's queue.
- **Top record**: the one record tagged `epic`. It parents the milestones.
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
3. `337e35d86920` M2: parity, route by route, blocked by the gate. Its route records, each blocked by the shell record and soft-ordered as listed: `a78b167170b8` the shell, `fd9a92bd8abd` home, `40179ab9e779` about, `7f0b60d948c5` faq, `ca353de8b645` stories index, `56e6eb197e6c` story pages, `f901cf9f724d` designs index, `0bc88eaf5493` design pages, `396c9af0cbd1` cutting planner, `a0b4d829f7a9` tools and resources, `1a3ab91a9640` contact, `e710087c8961` legal, `872ab70e2ff9` suppliers with the map, `fbb7c2c27eb5` subscribe with the form (wants the Buttondown key). Each is sliced with `/to-slices` after the copy gate, and finished by `/finish-epic` when its ledger is clean. The shell's slices: site-side `63e9c753ca55` the nav and header action, `ffe8e5d56f8e` the document head, `5e4529a6aeac` the site footer, `f8c93eaf4922` the header brand, `4f6f086c5d77` next.config, `39b1a28bb0cc` the site theme, `a7bf623f885c` the layout composition, `93ef1234208c` the footer cube; in `../ui` `c14505b76b6a` the palette, `45d6f5634a11` the recipes and provider, `1c74a465996d` the framework boundary, then `b0f69896e764` the nav, `1977c9af920c` the brand footer, `bc0407533650` mdx and media, `1cc03cfabcf2` LinkCard, each parking its items in `upstream` for the bump plan; and `531b810f2dbd` the QueryParamProvider adapter, a Phase 0 slice the layout slice minted. The shell record is finished; beside it, the operator's verdicts plan `77cf83a1285a` (fourteen items, attended, the parity gate blocked by it), three `../ui` slices, `61a42a0adbc8` the toggle's hover color, `9e54dca30d48` the five components' `rel` and `8a869061bce7` the press scale, each blocking the bump plan, and `a849fca1426c` the `transpilePackages` build test. The home's slices, blockers first: `4faefea81c76` the added sections and the metadata removed, `2de4b709bb36` the copy verdicts (both Sonnet); `6f90e7e24ca6` `MediaProvider` mounted in the shell; `0bb6cc8ab1ad` the testimonial fixed in place (Opus); `e332105c3b52` the story card, `c92c235205f5` the image carousel and `60cca8519469` the design carousel re-ported; then `159c621d8a1a` the page re-ported from `pages/index.tsx`, consuming the rest. The home record is finished; beside it, the operator's verdicts plan `8bb4a4380264` (six items, attended, the parity gate blocked by it), and beside the shell record three more `../ui` slices for the shell regressions the home's slices found in the published package, `2bd0169a6dda` the link, badge, container and button-size recipes, `8235bd4bea81` the `HoverCardContainer` selectors and `2de775cb197b` the `Section` band's rules, each blocking the bump plan. The about's slices, blockers first: `5ac30176aa70` the added intro, the two added sections and the per-page metadata removed, `5176646603be` the copy verdicts on the captions and the alts (both Sonnet); then `97e702d40df5` the page re-ported from `pages/about.tsx` (Fable), consuming both and the shell's `MediaProvider` and layout slices. The about record is finished; no verdicts plan stands beside it, since no item on `/about` was left for the operator; beside the shell record two more `../ui` slices, `728a36aedc8c` the `Title` container's width and `a4f938a27428` the badge's selectable text and numerals, each blocking the bump plan; the Title slice's review filed a third, `c06d8381c4b5` the `Description` container's width, blocking the bump plan too. The faq's slices, blockers first: `b52b62e260f3` the added Suppliers section, the two added questions, the description line and the per-page metadata removed, `241b65da8226` the copy verdicts on the sections, the questions, the answers and the closing line (both Sonnet); then `bba2bb35f208` the page re-ported from `pages/faq.tsx` (Fable), consuming both and the shell's layout slice. The faq record is finished; no verdicts plan stands beside it, since no item on `/faq` was left for the operator; beside the shell record one more `../ui` slice, `aff1c5f9a5f2` the accordion's centered trigger text and filled indicator, blocking the bump plan.
4. `f7a700a3e482` Gate: the operator declares parity, blocked by M2. The operator's.
5. `5802bbc9d984` M3: dependency upgrades, blocked by the gate.
6. `a4df2bf79395` M4: release on Cloudflare, blocked by M3. Wants Cloudflare and DNS credentials.

Outside the milestone sequence, the lone slices the adoption's audit minted
(plan `0448bc2d273a`), each a rule the code breaks, the operator's to
schedule: `15075b4a679f` the `@villagekit/*` import group, `0b45bd65b468`
the package-manager hash and the Actions pins, `d04ec0d664be` the scripts
to TypeScript, `0574cb3ea36d` the parity tooling's helpers, tests and log
fields (soft-ordered after the port), `b209e5941cdd` TSDoc on every export,
`e208e3942a31` the Biome `--write` flags, `8972ff9aefa9` the comments that
narrate a fix, `418682fd0f5f` the ported-file citations.
