---
title: "Set up the unattended M2 run: per-plan worker models, the deferred publish, the subscribe key"
status: done
---
The operator gave the go on 2026-09-25 for `/orchestrate` over everything unattended, with a model per plan, the `@villagekit/ui` and engine publishes deferred to the end, and the subscribe form's key handled by an attended plan minted for later. This plan records the calls as decisions and shapes the store so the run needs no hand: the worker-model gradation as tags the slicer writes and the orchestrator reads, the `upstream` state for a difference fixed in a sibling and waiting on the publish, the one attended bump plan the parity gate waits on, and the subscribe record's Wants line moved to the slice that needs the key.

## Work

- A decision superseding `077cef20`: the worker runs on the model the plan's `worker:<model>` tag names, Fable when untagged; the orchestrator runs on the session's model; the rest of the roster unchanged.
- A decision for the deferred publish: a fix that lands in `../ui` or `../gridkit` moves its differences to `upstream`, the sibling commit cited in a note, and the one attended bump plan closes them after the operator's publish; a record finishes with `upstream` items on it.
- `.kipu/collections/difference.toml`: the `upstream` state; `differences/README.md` and the `parity` skill's review brief name it.
- CLAUDE.md: Sub-agents carries the gradation and the citations move to the new decision; Out of scope drops the open question; Principles names the state.
- `plans/README.md`: the `worker:<model>` tags, the deferred publish under Wants.
- The M2 record and the subscribe record: the deferral rule and the key rule in their bodies.
- The bump plan, tagged `attended`, which the parity gate is `blocked_by`.
- The eight audit plans tagged with their models; the three bulk plans over files the re-ports rewrite held behind M2.
- The slice template's gate line: `timeout 900 just check`.
- The orchestrate and to-slices skills in the agentic repo read and write the tag, committed there.

## Seams under test

None; no code changes.

## Done when

- `kipu ready --collection plan` shows the shell record first and every audit plan tagged `worker:<model>`
- `kipu verify --warnings-as-errors` is green and the agentic template lint over CLAUDE.md exits 0
- `timeout 900 just check` is green

## Outcome

Shipped as written. Decisions `8eed053ab779` (supersedes `077cef20`: the worker's model is the plan's `worker:<model>` tag, Fable when untagged; the orchestrator is the session's model) and `28c1a5369a6b` (a sibling fix parks its differences in `upstream`; the one attended bump plan `99f2fe62c62f` consumes the deferred publishes, and the parity gate `f7a700a3e482` is blocked by it). The `upstream` state in `difference.toml`, named in `differences/README.md`, the `parity` skill's review brief and CLAUDE.md. The eight audit plans tagged: `worker:sonnet` on the Biome flags, the pins and the import group; `worker:opus` on the scripts port, the helpers, the comments, the citations and TSDoc; the import group, the citations and TSDoc held behind M2 since the re-ports rewrite most of their files. The TSDoc plan's scope is now the rule's, every export, on the operator's word that anything unattended runs. The subscribe record's Wants line moved to the one slice that needs the key, minted attended. The slice template's gate line corrected to `timeout 900 just check`. The orchestrate and to-slices skills gained the tag in the agentic repo (its plan `c0ebf02c2f9a`), with the manual list's five phrases. Gate green in the background run; template lint and `kipu verify --warnings-as-errors` green. The orchestrator for this run is the session itself, on Fable, as the new decision allows.
