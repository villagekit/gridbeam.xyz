---
title: "Gate: the copy grilling"
status: todo
tags:
  - gate
parent: 1783931160f2
blocked_by: c6182c6a8609
---

The operator judges every `open` item on the `copy` axis and every `open` addition, item by item, legacy text and current text side by side, in a grilling session with a Fable agent (the `grilling` skill). Each verdict is written on the item (`kipu sanction`, `kipu move ... regression`, or `kipu dismiss`), and the sanctioned wording is the only non-legacy copy M2 may ship. Decision `ca677697`. This gate is the operator's: an orchestrator stops here.

## Work

Run the grilling from `kipu list --collection difference --status open --filter axis=copy --json`, grouped by route, plus `kipu list --collection difference --status open --filter kind=added --json`. Record each verdict on its item. Where a verdict generalizes (a rule for all newsletter notes, say), record it as a decision and cite it from each item.

## Seams under test

None.

## Done when

- `kipu list --collection difference --status open` prints nothing
- Every `sanctioned` copy item's Verdict quotes the wording to ship
- `kipu verify` is green
