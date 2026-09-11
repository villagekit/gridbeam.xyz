---
title: Agent roles and who commits
status: accepted
date: 2026-09-11
---
## Context

The previous pass on this repo was worked by a weaker model with no review structure, and the operator was not satisfied with the result. The process has to say which model does what, and who has the last word.

## Decision

- The **worker** is Fable, running the `implement` skill on one plan at a time. It has the last say over every sub-agent it spawns: a reviewer advises, and a rejected finding is answered in the plan's Outcome.
- The **orchestrator** is Sonnet, running the `orchestrate` skill: it picks the next plan, spawns one Fable worker, verifies the commit with git, and stops at the stop condition or at a gate. It never writes code.
- **Reviews**, design alternatives and research run on Opus sub-agents, started cold with the context they need.
- **Mechanical work** (exact diffs of legacy against current, extraction, bulk edits, screenshot capture) runs on Sonnet sub-agents.
- **Copy** is the operator's alone; no agent writes or rewords visitor-facing text.

Agents commit directly to `main` and push, one focused commit per plan, code and kipu items and the repo's own configuration alike. The operator reads commits, not the index. No attribution trailers.

## Consequences

The kipu docs' default, where the operator commits what the agent staged, is set aside for this repo. An orchestrator run is bounded by a stop condition and by gates, so the operator's review lands per route rather than per commit.
