---
title: Adopt the shared agentic set
status: done
---
Wire this repo to the shared agentic set by reference: the local skill copies gone, CLAUDE.md rendered from the agentic repo's template with every current rule landing in a slot, the template's text or a shared skill, the justfile and the settings file rendered, the store mapped in the villagekit workspace, then the audit. Nothing from the agentic repo is copied in.

## Work

- The store: `kipu workspace add . villagekit`; no requirements tree and no `/chunk`, so no store template applies.
- The local copies: delete `.claude/skills/{code-review,grilling,handoff,implement,orchestrate,research,tdd,to-plan}` (the shared set carries them) and `to-plan-slices` (retired, now `/to-slices`); `parity` stays, the project's own, and gains the Parity review brief the local `code-review` copy held, since the shared `code-review` binds a third axis to the project skill that fills it.
- No numbered records: the migrate step is skipped.
- Render `CLAUDE.md`, `justfile` (wrapping the pnpm scripts, so `just check` and `pnpm check` are one gate) and `.claude/settings.json`; `plans/README.md` gains the `attended` term and names `/to-slices`; the M2 record body follows the rename; the parity gate `f7a700a3e482` gains the `attended` tag, the marker the shared skills read; the route records close by `/finish-epic` when their ledger is clean, the operator reviewing at the parity gate (the operator's call of 2026-09-25, recorded as a decision).
- A reviewer on Opus reads the slot answers for the sections the pre-render file never had.
- `/agentic-audit` last, one plan per gap, fixing nothing.
- The agentic repo's follow-up, its own commit: the CLAUDE.md snapshot replaced with the file this adoption started from (the operator's word of 2026-09-25) and the manual list under `fixtures/merge-manual/`.

## Seams under test

None; the render is held by `lint-template.sh --rendered` and the gate.

## Done when

- `<agentic>/scripts/lint-template.sh --rendered CLAUDE.md` exits 0, and no `{{` is left in the justfile or the settings file
- `.claude/skills` holds only the repo's own skills
- `timeout 900 just check` is green

## Outcome

Adopted on 2026-09-25. What shipped: the nine local skill copies deleted (`code-review`, `grilling`, `handoff`, `implement`, `orchestrate`, `research`, `tdd`, `to-plan`, and the retired `to-plan-slices`), `parity` kept as the project's own skill with a new "Reviewing for parity" section holding the third review axis's brief; `CLAUDE.md` rendered from the agentic template, `lint-template.sh --rendered` green; `justfile` (wrapping the pnpm scripts, `just check` = lint, typecheck, test, build, plus the generated-data drift check CI already ran) and `.claude/settings.json` rendered, no `{{` left; `plans/README.md` gained the `attended` term and the shared gate rule and names `/to-slices`; `.kipu/README.md` points at the render; the store mapped in the `villagekit` workspace (`~/.config/kipu/workspace.toml`).

The operator's calls of 2026-09-25: every write confirmed and committed; route records close unattended by `/finish-epic`, the operator reviewing at the parity gate `f7a700a3e482`, now tagged `attended` (decision `b9af27e0df50`; the fifteen record bodies edited to say so); the agentic repo's snapshot of the pre-render file replaced with the file at `4c11516`.

Skill copies that differed from the shared set: all nine; `grilling` and `implement` were never snapshotted by the merge (the merge took `code-review`, `handoff`, `orchestrate`, `research`, `tdd`, `to-plan`, `to-plan-slices` at `c2c82b8`). What the local copies carried that the shared set reads from the render instead: the port rule and the parity ledger in `implement` (now `CLAUDE.md, Principles` and `Plans vs. reality`), the Parity axis in `code-review` (now the `parity` skill), the Fable/Opus/Sonnet roster in `orchestrate` (now `Sub-agents`), the `pnpm audit:pages` visual gate (now `Commands`), the gridbeam-specific examples in `tdd/tests.md` (the shared `typescript/tests.md` carries the pattern). The local `grilling` was the older mattpocock fork with the design-tree wording; the shared one is the rewrite. No shadowing skill. No numbered records, so no migration.

The render's reviewer (Opus) found and I fixed: a false gotcha (kipu stages every mutation, not only `new`; the hand-edit case is what needs `git add`), a self-contradiction on stdout in Tracing, "the gate is one copy" being false until the drift check joined `just check`, a stale gate paragraph in `plans/README.md`, `pnpm format`'s flag, `screenshot.sh` missing from the scripts list, and nine slot answers that were guesses (a warm run time now measured at 149 to 203 s; a "major bump is a decision" claim replaced by the M3 pointer; the invented helper rule now cited to the `parity` skill; conflated terms, the Jest arbiter and the wrangler-login detail dropped). Five pre-render rules the reviewer or the manual list could not find were placed: `kipu --version` first, products not on npm, Chakra v3 for the engine, the Buttondown key the operator's, no tool restrictions for any sub-agent, "don't second-guess", "no ESLint, no Prettier", "the right answer is often use this", "names carry the what", `vitest.config.ts`. Template text the reviewer flagged as not fitting the repo, left as the estate's: "Pinned versions" (the lockfile pins with integrity hashes) and "Library first" (no packages here). Kept against the reviewer's doubt: the worker-model gradation as an open item under Out of scope (the operator raised it in the same session, unrecorded until then), the Phase 0 line (derived from the port rule), the transcripts path (the skill's default, said so).

The audit ran six Opus reviewers (the `typescript` skill, Working style, Conventions, Testing, Tracing, Secrets) and minted eight plans, listed in `plans/README.md`: `15075b4a679f`, `0b45bd65b468`, `d04ec0d664be`, `0574cb3ea36d` (soft after the port), `b209e5941cdd`, `e208e3942a31`, `8972ff9aefa9`, `418682fd0f5f`. Secrets found nothing. Lines merged: the two reviewers' import lines into one plan; the Library-first, Testing and Tracing lines on `scripts/` into one plan for that area; the planner's wrong citation path into the citations plan (its file collapse is difference `1da20b256e35`). No line was dropped as a render error.

Gate: `timeout 900 just check` green in 203 s after the justfile gained the drift recipe (the first run died with the documented `SQLITE_BUSY`, fixed by deleting `.wrangler/state`); the edits after that run were prose only. `kipu verify --warnings-as-errors` green. A gate step this adoption left as two copies: the four scripts' sequence in `package.json`'s `check` and in the justfile; CI runs the steps singly.

The agentic repo's follow-up, its own commit: the snapshot replaced and noted in `fixtures/merge/sources/README.md`, and `fixtures/merge-manual/gridbeam-claude-md.txt` (192 entries, `check-manual.sh` green). `just check-manual` there fails on the vas list's line 162, a drift in the vas repo predating this work and untouched by it.

Named for the operator: `kipu doctor` calls the four collection READMEs legitimate orphans and the 635 differences unordered, both advisory; the built-in `/init` must not be run over the render.

## Log
