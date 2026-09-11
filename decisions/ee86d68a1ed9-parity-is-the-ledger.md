---
title: Parity is the ledger
status: accepted
date: 2026-09-11
---
## Context

The gridbeam.xyz rebuild was meant to be a port of the legacy gridkit.nz site: upgrade the dependencies, strip the startup and e-commerce surface, rebrand. In practice pages were redesigned, copy was rewritten and code patterns were replaced, and two audits (screenshots in May 2026, a code review in August 2026) each caught part of the drift without ever enumerating all of it. Unexpected differences kept surfacing because the expected ones were never written down.

## Decision

Parity is defined by a ledger, the `difference` collection: one item per difference between the legacy site and this one, on one route and one of five axes (visual, interaction, accessibility, copy, code). A route is at parity when no item on it is `open` or `regression`. The site is released only when that holds for every route and for the shared shell.

The ledger is filled mechanically (the `parity` skill, Sonnet sub-agents diffing both sides) and judged by rule or by the operator, never by an agent's taste. Additions to the current site count as differences too.

The port strategy follows the ledger. Where a route's current structure has drifted from the legacy author's, the worker starts from the legacy source and translates (pages router to app router, Chakra v2 to v3, framer-motion to motion) and carries over only what the ledger sanctions. Where the current route is a faithful port, the worker closes the listed regressions in place. In doubt, re-port.

The legacy author's code pattern is a documented standard for review: a clean structure that differs from it without a stated reason is a finding.

## Consequences

Every fix cites the difference it closes. Every review carries a Parity axis that looks at the screenshot pairs and both sources. The old task tree under `todo/` is deleted; its findings are re-derived by the ledger rather than trusted.
