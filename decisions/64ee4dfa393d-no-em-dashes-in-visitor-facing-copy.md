---
title: No em dashes in visitor-facing copy
status: accepted
date: 2026-09-13
---

## Context

The copy grilling (`e2805adefd47`) surfaced several current-side sentences using an em dash where the legacy site never did (the OG image copy, the 404 heading, `/legal`'s section description). The operator's standing style for prose (CLAUDE.md, "Conventions") already bans em dashes in agent-authored text; the operator extended this to visitor-facing copy itself, without exception.

## Decision

No em dash in any visitor-facing copy, ever: not new copy, not a rewrite of legacy copy, not a generated string. Use a colon, a comma, a period, or two sentences instead. This applies across every route, not just shell.

## Consequences

Any open copy item whose current-side text has an em dash is judged with this in mind: the wording that ships is never the one with the dash. A sanctioned or fixed item's Verdict quoting an em dash is a mistake to catch on review, same as a wrong rule citation.
