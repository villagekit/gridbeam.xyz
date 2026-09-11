---
name: research
description: Investigate a question against high-trust primary sources and capture the findings as a cited Markdown survey in the repo. Use when the user wants a topic researched, docs or API facts gathered, or reading legwork delegated to sub-agents.
---

# Research

Fan the reading out to sub-agents, then synthesize it yourself.

1. **Split the question.** One sub-agent per sub-question or source family (a spec, a vendor's docs, a competing system). One is fine when the question is narrow. Spawn them as background agents on Opus so you keep working while they read.

2. **Each sub-agent** investigates against **primary sources** (official docs, source code, specs, first-party APIs), never a secondary write-up of them, following every claim back to the source that owns it. Where the claim is about an upstream package, the agent reads its source in `node_modules/<package>` and cites the package, version, and path; where it is about the legacy site, the agent reads `../node-modules` at `fce357d` and cites the path. It returns its findings with a citation per claim and marks anything it could not verify as unverified.

3. **You synthesize.** Write one Markdown survey from the reports: corrected, load-bearing claims each cited to a primary source, unverified quotes left out. Save it in `research/` as `YYYYMMDD-<topic>-synthesis.md`, and open it with what it is: what ran, what commissioned it, what it feeds, caveats for whoever extends it. Add the entry to the session index, `research/README.md`.

4. **Close** by naming what the survey feeds (a grilling, a decision in `decisions/`, a plan in `plans/`).
