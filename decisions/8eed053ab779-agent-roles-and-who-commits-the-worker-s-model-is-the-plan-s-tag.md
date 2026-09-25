---
title: "Agent roles and who commits: the worker's model is the plan's tag"
status: accepted
date: 2026-09-25
supersedes: 077cef20699b
---
## Context

`077cef20` set one worker model, Fable, for every plan an orchestrator dispatches. On 2026-09-25 the operator asked for a model per plan: critical thinking and decisions (slicing, re-ports, anything that shapes an interface) on Fable, minor thinking with edge cases (an in-place fix, a port of tooling, a comment that has to name a constraint) on Opus, well-described mechanical work (a verbatim copy swap, an import regrouping, a flag or a pin) on Sonnet. The agentic repo's own roster already puts the orchestrator on the session's model, since the spawner sets the model and a run started in a session is that session's.

## Decision

- The **worker** runs the `implement` skill on one plan at a time, on the model the plan's `worker:<model>` tag names (`worker:fable`, `worker:opus`, `worker:sonnet`); a plan with no tag runs on Fable. The tag is written when the plan is minted: by `/to-slices` for a slice, by the author for a lone plan. A split and a finish run on Fable, whatever the epic carries. The worker has the last say over every sub-agent it spawns: a reviewer advises, and a rejected finding is answered in the plan's Outcome.
- The tag's rule: Fable where the work decides a shape (a re-port from the legacy source, a change in `../ui` or `../gridkit`, a slice that names a seam or an unknown); Opus where the shape is given and the edges are not (an in-place visual, interaction or accessibility fix, a port of a script, a doc comment that has to say what a caller gets); Sonnet where the diff is stated in the plan (copy pasted verbatim from the legacy source at a judged verdict, a grouping, a flag, a pin, a citation header). In doubt, the stronger model.
- The **orchestrator** runs the `orchestrate` skill on the session's model: it picks the next plan, spawns one worker on the plan's model, verifies the commit with git, and stops at the stop condition or at a gate. It never writes code.
- **Reviews**, design alternatives and research run on Opus sub-agents, started cold with the context they need.
- **Mechanical work** inside a worker's iteration (exact diffs of legacy against current, extraction, bulk edits, screenshot capture) runs on Sonnet sub-agents.
- **Copy** is the operator's alone; no agent writes or rewords visitor-facing text.

Agents commit directly to `main` and push, one focused commit per plan, code and kipu items and the repo's own configuration alike. The operator reads commits, not the index. No attribution trailers.

## Consequences

The Sub-agents section of CLAUDE.md carries the gradation, and the `orchestrate` and `to-slices` skills in the agentic repo read and write the tag. A reviewer of a split checks the tag against the rule. The kipu docs' default, where the operator commits what the agent staged, stays set aside for this repo.
