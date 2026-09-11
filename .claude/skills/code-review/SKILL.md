---
name: code-review
description: "Review the changes since a fixed point along three axes: Standards (does the code follow this repo's documented standards, the legacy author's patterns among them?), Spec (does the code do what the plan asked, and do its load-bearing claims verify?) and Parity (does the shipped route match the legacy site on every axis the ledger tracks, and did the change introduce no new difference?). Runs the three reviews in parallel Opus sub-agents and reports them side by side. Use when the user wants to review a branch, work-in-progress changes, or asks to \"review since X\"."
---

Three-axis review of the diff between `HEAD` and a fixed point:

- **Standards**: does the code conform to this repo's documented standards, and hold the invariants those standards protect?
- **Spec**: does the code faithfully implement what the plan asked, and do its load-bearing claims hold up against the references?
- **Parity**: does the route, as shipped, match the legacy site, and does the ledger say what the code says?

The axes run as **parallel Opus sub-agents** so they don't pollute each other's context, then this skill aggregates their findings. Each review starts cold: the prompt must carry everything the reviewer needs. The worker running this skill has the last say: a reviewer advises, and a rejected finding is answered in the plan's Outcome with the reason.

## Process

### 1. Pin the fixed point

Whatever the user said is the fixed point (a commit SHA, `main`, `HEAD~1`, etc.). If they didn't specify one, and the work is uncommitted, the fixed point is `HEAD` and the diff is the working tree; otherwise ask.

Capture the diff command once: `git diff <fixed-point>...HEAD`, or `git diff HEAD` for the working tree. Also note the list of commits via `git log <fixed-point>..HEAD --oneline`.

Before going further, confirm the fixed point resolves (`git rev-parse <fixed-point>`) and the diff is non-empty. A bad ref or empty diff should fail here, not inside three parallel sub-agents.

### 2. Identify the spec sources

What the change was supposed to do, in this order:

1. The plan the change implements: a path or id the user passed, a plan prefix in a commit subject, or the plan the session has been working from. `kipu show <id> --related` prints it.
2. The `difference` items the plan cites, each with its Legacy and Current sections and its Verdict.
3. The decisions in the area (`decisions/`), and any research note the change cites.
4. If no plan is found, ask the user. If there isn't one, the **Spec** sub-agent reviews against the decisions alone and says so.

### 3. Identify the standards sources

Anything in the repo that documents how code should be written: CLAUDE.md ("Conventions", "Legacy is the baseline", "Logging", "Testing"), the scripts' header comments.

On top of whatever the repo documents, the Standards axis always carries the **smell baseline** below: a fixed set of Fowler code smells (_Refactoring_, ch.3). Two rules bind it:

- **The repo overrides.** A documented repo standard always wins; where it endorses something the baseline would flag, suppress the smell. In this repo the legacy author's pattern is a documented standard: a clean structure that differs from the legacy one without a stated reason is a finding, not a matter of taste.
- **Always a judgment call.** Each smell is a labeled heuristic ("possible Feature Envy"), never a hard violation. Skip anything tooling already enforces (Biome, tsc).

Each smell reads *what it is* → *how to fix*; match it against the diff:

- **Mysterious Name**: a function, variable, or type whose name doesn't reveal what it does or holds. → rename it; if no honest name comes, the design's murky.
- **Duplicated Code**: the same logic shape appears in more than one hunk or file in the change. → extract the shared shape, call it from both.
- **Feature Envy**: a function that reaches into another module's data more than its own. → move it onto the data it envies.
- **Data Clumps**: the same few fields or params keep traveling together (a type wanting to be born). → bundle them into one type, pass that.
- **Primitive Obsession**: a primitive or string standing in for a domain concept that deserves its own type. → give the concept its own small type.
- **Repeated Switches**: the same `switch`/`if`-cascade on the same type recurs across the change. → replace with a table or a lookup both sites share.
- **Shotgun Surgery**: one logical change forces scattered edits across many files in the diff. → gather what changes together into one module.
- **Divergent Change**: one file or module is edited for several unrelated reasons. → split so each module changes for one reason.
- **Speculative Generality**: abstraction, parameters, or hooks added for needs the plan doesn't have. → delete it; inline back until a real need shows.
- **Message Chains**: long `a.b().c().d()` navigation the caller shouldn't depend on. → hide the walk behind one function on the first object.
- **Middle Man**: a type or function that mostly just delegates onward. → cut it, call the real target direct.
- **Refused Bequest**: a component that ignores or overrides most of what it wraps. → drop the wrapping, use composition.

### 4. Spawn the three sub-agents in parallel

Spawn all three on **Opus**, with no tool restriction: a reviewer may run the tests, read `node_modules` sources, read the legacy checkout, start the dev server, or take a screenshot when a finding needs it. The Read tool shows a PNG, so a reviewer looks at screenshot pairs itself.

**Standards sub-agent prompt** should include:

- The full diff command and commit list.
- The list of standards-source files you found in step 3, **plus the smell baseline from step 3** pasted in full (the sub-agent has no other access to it).
- The brief: "Report, per file/hunk where relevant, (a) every place the diff violates a documented standard: cite the standard (file + the rule); (b) every invariant the standards protect that the diff could break, checked by reading the code: ported code cites a SHA-pinned source URL, no visitor-facing copy written or reworded by the agent (copy comes verbatim from the legacy source or a sanctioned difference's verdict), the legacy author's structure kept unless a stated reason in the plan or a decision says otherwise, no e-commerce or startup plumbing reintroduced, no `../` sibling import (the `@villagekit/*` packages come from npm), every `\"use client\"` justified, no GPL dependency added, imports grouped in the documented order, log levels used as CLAUDE.md says, tests written first where the methodology demands and not weakened to pass, no unbounded waits in tests; (c) any baseline smell you spot: name it and quote the hunk. Distinguish hard violations from judgment calls: documented-standard breaches and invariant violations can be hard, but baseline smells are always judgment calls, and a documented repo standard overrides the baseline. Skip anything tooling enforces; run `pnpm check` if you doubt it was run. Under 400 words, critical first (correctness, invariant violations, things that would mislead future work), each with file:line, and say what you checked and found clean."

**Spec sub-agent prompt** should include:

- The diff command and commit list.
- The path of the plan, the ids of the differences it cites, and the decisions in the area.
- The brief: "Report: (a) requirements the plan asked for that are missing or partial; (b) behavior in the diff that wasn't asked for (scope creep); (c) requirements that look implemented but where the implementation looks wrong; (d) statements in the cited differences and decisions the diff makes false; (e) load-bearing claims about an upstream API (Next, React, Chakra, motion, `@villagekit/*`), a standard, or an algorithm, verified by reading the normative reference (the package's source in `node_modules`, the standard's text), never from memory, and any claim that does not hold; (f) a simpler shape or abstraction that would do the same job, compared first against the legacy author's shape for the same problem (a simpler shape that departs from legacy needs a stated reason in the plan or a decision, and its absence is a finding), then against alternatives you imagine; and anything that will cost the maintainer in years to come; (g) where the change cites a research note, whether the cited entry actually supports the claim. Quote the plan or difference line for each finding. Under 400 words, critical first, each with file:line, and say what you checked and found clean."

**Parity sub-agent prompt** should include:

- The diff command and commit list, the routes the change touches, the ids of the differences the plan cites, and the paths of the screenshot pairs under `audit/<slug>/<width>/{legacy,current}.png` (tell it to run `pnpm audit:pages --routes <file>` against a running `pnpm dev` if the pairs are stale or missing).
- The legacy references: the live site `https://gridkit-landing-villagekit.vercel.app` and the source at `../node-modules/apps/gridkit/` plus `../node-modules/packages/ui-*/` at `fce357d`.
- The sanctioned-deviation rules (the decision that records them, by path).
- The brief: "For every touched route, compare legacy and current on the five axes the ledger tracks (visual, interaction, accessibility, copy, code) by looking at the screenshot pairs at all three widths yourself and reading both sources. Report: (a) every difference the plan claims to close that is still visible or still in the code; (b) every difference the change introduces that no `difference` item records, or that an item records as sanctioned under a rule the rule does not cover; (c) copy in the diff that is neither verbatim legacy nor the verdict of a sanctioned difference; (d) anything the legacy route did that the current route silently drops (a hover state, a focus ring, an aria attribute, a transition, a breakpoint). Cite the screenshot path or file:line on both sides for each finding. Under 400 words, critical first, and say which routes and widths you looked at and found at parity."

### 5. Aggregate

Present the three reports under `## Standards`, `## Spec` and `## Parity` headings, verbatim or lightly cleaned. Do **not** merge or rerank findings, because the axes are deliberately separate (see _Why three axes_).

End with a one-line summary: total findings per axis, and the worst issue _within each axis_ (if any). Don't pick a single winner across axes: that's the reranking the separation exists to prevent.

Verify a finding against the actual files before acting on it; reviewers start cold and can misread. Findings that do not lead to a change now become `// Note(cc): ...` or `// TODO(cc): ...` comments for future readers, or a new `difference` item when they are about the route rather than the code.

## Why three axes

A change can pass two axes and fail the third:

- Code that follows every standard but implements the wrong thing → **Standards pass, Spec fail.**
- Code that does exactly what the plan asked but breaks the project's conventions → **Spec pass, Standards fail.**
- Code that does what the plan asked, cleanly, while the route it ships still differs from legacy in a way nobody recorded → **Standards and Spec pass, Parity fail.** This is the failure mode that produced the rewrite this process exists to undo.

Reporting them separately stops one axis from masking another.
