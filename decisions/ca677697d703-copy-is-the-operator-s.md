---
title: Copy is the operator's
status: accepted
date: 2026-09-11
---
## Context

The rebuild rewrote copy in many places with no stated reason, and the operator judged the previous agents' attempt at porting copy not good. The legacy copy was written more carefully than its rewrite.

## Decision

Legacy copy is the default, verbatim, with only the rebrand rule applied. No agent writes, rewords, shortens or "improves" visitor-facing text: headings, paragraphs, labels, placeholders, empty states, alt text, meta descriptions, error messages.

Every copy difference the ledger finds stays `open` until the operator judges it in a grilling, item by item, with the legacy text and the current text side by side. The grilling happens after the ledger is complete, never from a partial list. The verdict of each item is the only source of non-legacy copy a worker may ship.

## Consequences

The copy grilling is a gate between the ledger milestone and the parity milestone. A worker that finds copy missing from both the legacy source and a verdict files a difference and stops that slice's copy work rather than inventing text.
