---
title: "Agent roles and who commits: the worker's model is the plan's worker field, the orchestrator is Sonnet"
status: accepted
date: 2026-09-27
supersedes: 8eed053ab779
---
## Context

`8eed053a` graded this repo's workers by a `worker:<model>` tag on each plan, Fable when untagged, and put the orchestrator on the session's model. On 2026-09-27 the agentic repo made the grading the estate's rule in its decision `3761d06da06d`, over its research `research/20260927-model-grading-synthesis.md`: the tag becomes a declared field, the orchestrator runs on the mechanical model, and a worker that meets a shape its model is not for hands the plan up. The `orchestrate` and `to-slices` skills now read and write the field, so this store follows or its slices stop being dispatched on their grade.

## Decision

- The **worker** runs the `implement` skill on one plan at a time, on the model the plan's `worker` field names (`fable`, `opus` or `sonnet`, declared in `.kipu/collections/plan.toml` with no default); a plan with no field runs on Fable. The field is written at the mint, by `/to-slices` for a slice and by the author for a lone plan. A split and a finish run on Fable whatever the epic carries. The worker has the last say over every sub-agent it spawns: a reviewer advises, and a rejected finding is answered in the plan's Outcome.
- **The grading test** is the agentic repo's, read from what the plan leaves open, and this repo binds only the places that count as a shape: a re-port from the legacy source and a change in `../ui` or `../gridkit`, beside the test's own seam, interface and unknown. The other two grades by example: Opus where the shape is given and the edges are not (an in-place visual, interaction or accessibility fix, a port of a script, a doc comment that has to say what a caller gets); Sonnet where the diff is stated in the plan (copy pasted verbatim from the legacy source at a judged verdict, a grouping, a flag, a pin, a citation header). In doubt, the stronger model. The reviewer of a split checks each slice's field against the test, and the minter of an audit's plans writes the field too.
- **Escalation**, as the agentic repo's decision `3761d06da06d` states it: a worker that finds the work decides a shape its model is not for stops before it builds, sets `worker` one step up with a note naming the shape, reverts its probe edits by path, commits the store change alone and reports; the orchestrator re-dispatches the plan once on the new model, only upward, so a plan climbs at most twice. Attended, the agent says so and the operator decides.
- The **orchestrator** runs the `orchestrate` skill on the mechanical model, Sonnet: it picks the next plan, spawns one worker on the plan's model, verifies the commit with git, and stops at the stop condition or at a gate. It never writes code. It is the session's model, so an orchestrate run is started in a Sonnet session.
- **Reviews**, design alternatives and research run on Opus sub-agents, started cold with the context they need.
- **Mechanical work** inside a worker's iteration (exact diffs of legacy against current, extraction, bulk edits, screenshot capture) runs on Sonnet sub-agents.
- **Effort** is not graded: a sub-agent inherits the session's effort, and no skill sets one.
- **Copy** is the operator's alone; no agent writes or rewords visitor-facing text.

Agents commit directly to `main` and push, one focused commit per plan, code and kipu items and the repo's own configuration alike. The operator reads commits, not the index. No attribution trailers.

## Consequences

The Sub-agents section of CLAUDE.md carries the agentic template's text with this repo's three models and its places; `plans/README.md` documents the field where it documented the tag; every plan that carried a `worker:<model>` tag carries the field instead, the one a worker held mid-flight at the change following when its commit lands, and the bodies' prose is left as evidence of what was. The kipu docs' default, where the operator commits what the agent staged, stays set aside for this repo.
