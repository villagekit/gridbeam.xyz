---
name: orchestrate
description: Run an autonomous sequence of plan iterations by delegating each one to a worker sub-agent. Use when the user asks to run the loop over the order of work (or a named series of plans) until a stated stop condition.
argument-hint: "[worker-model, default fable] <stop condition, e.g. \"until the shell record is done\">"
---

# Orchestrating a sequential plan run

You are the orchestrator. You do as little as possible; the workers do the work.
You pick the next plan, spawn one worker at a time, check its commit with git,
tell the user, and stop at the stop condition. You never write code, review, or
commit yourself. Don't push your opinions onto the workers; be patient with them.

## Inputs from the user

- **Worker model**: `fable` unless the user names another. The worker is the
  strongest model in the room; the reviewers and the mechanical sub-agents it
  spawns are Opus and Sonnet (CLAUDE.md, "Sub-agents").
- **Stop condition** (required): "until plan X is done", "until every plan
  under record X is done", "run N iterations", and so on. "Stop after this
  iteration" means finish it fully, then stop. If the user gave none, ask.

## Each iteration

1. Pick the next plan: the one the user named, once, and after it the order
   of work, which is the first entry of `kipu ready --collection plan --json`.
   `plans/README.md` is commentary, not the order. An empty ready set ends
   the run. Report two things: any `doing` record whose children are all
   terminal (its exit demo and its Outcome are the operator's), and the
   plans that wait on it or on a gate.
2. Check it is dispatchable by reading its frontmatter and body yourself
   (`kipu show <id> --related`). A plan tagged `gate` is the operator's; a
   record (no `## Done when`) needs `/to-plan-slices` first. Either one ends
   the run: report what it needs and stop. A plan whose body names a "wants"
   line the environment cannot meet (an API key, a publish) ends the run the
   same way.
3. Spawn one `general-purpose` agent with `model` set to the worker model. Never
   `fork`: the worker should start fresh from its plan, not inherit your
   transcript. Its prompt says:
   - run the `implement` skill on that plan, by id;
   - the run state: what this run has shipped, what is next, any standing user
     sign-offs recorded in the plan or decision files (cite them, don't re-ask),
     and any flags carried forward;
   - finish synchronously: run the gate to completion, commit, and push in this
     one turn, never ending the turn mid-gate to "check back later";
   - report back with the commit hash, or with what blocked it.
   Nothing else. The `implement` skill and CLAUDE.md already hold the working loop
   and the standing rules; don't restate or add to them.
4. Wait. Don't nudge a running worker. Under `/loop`, a wakeup is ScheduleWakeup
   with a long delay (1200 s or more); outside `/loop` there is nothing to
   schedule, the worker's report wakes you.
   The worker owns its review; if a reviewer's verdict somehow lands with you
   instead, forward it to the worker verbatim via SendMessage.
5. When the worker reports, verify with git yourself: `git log -1`,
   `git status --porcelain` (clean), `git status -sb` (not ahead of origin),
   `git show --stat`, `git log -1 --format='%(trailers)'` (empty). Don't trust
   the report alone. An iteration that produced no commit, or that reports
   part of its plan's scope left out, ends the run: report what the worker
   reported, and never re-dispatch the same plan.
6. Tell the user: commit hash and subject, then distance to the stop condition.
7. Stop condition met: stop (under `/loop`, ScheduleWakeup with `stop: true`)
   and write a closing report. Otherwise go to 1.

## Traps (each has actually happened)

- A "completed" notification can mean the worker stopped short of committing.
  Read its result text before acting. A worker that ends its turn mid-gate
  without the "finish synchronously" line stalls until nudged via SendMessage.
- Don't read sub-agent transcript files with shell tools; file timestamps only,
  for liveness.
- After dormancy (overnight), re-check state with git and the process table before
  re-contacting a stalled worker.
- Never extend the run past the stop condition or start the next body of work
  unasked.
