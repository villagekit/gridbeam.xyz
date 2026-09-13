---
title: Top nav promotes About and Tools, Contact stays footer-only
status: accepted
date: 2026-09-13
---

## Context

Legacy's top nav held `Designs`, `Store`, `Stories`; About, Contact and Tools-and-resources were footer-only. `Store` drops (rule: no e-commerce, `2032533f`), which leaves room. The current build promoted all three of About, Contact and Tools to the top nav; the copy grilling (`e2805adefd47`) reviewed the three together.

## Decision

Top nav: `Designs`, `Tools`, `About`, `Stories`. Contact stays a footer-only link, as in legacy; it doesn't need top-level billing.

## Consequences

`71dcfc2bdf8a` (Tools) and `9d1f2b7ae565` (About) are sanctioned against this decision. `df63dc24c8aa` (Contact in the top nav) is a regression: a closing plan removes it from `app/_lib/nav.ts`'s top-level entries, leaving its existing footer entry (`cfc422822736`) as the only one.
