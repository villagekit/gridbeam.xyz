---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
argument-hint: "What will the next session be used for?"
---

Write a handoff document summarizing the current conversation so a fresh agent can continue the work. Save to the temporary directory of the user's OS, not the current workspace.

Before writing it, push anything durable into its proper home in the repo: a decision into a decision item, work into a plan, a legacy-versus-current fact into a difference, finished code into a commit. The handoff carries only the ephemeral thread: where the work stands, what was tried, what is next. A handoff that needs to cross machines is a sign something belongs in the repo instead.

Do not duplicate content already captured in other artifacts (plans, decisions, differences, notes, commits, diffs). Reference them by id, path or URL instead.

Include a "suggested skills" section, naming which skills the next agent should call the Skill tool for.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.
