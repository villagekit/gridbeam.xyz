---
title: Grid Beam to grid beam in the hero image alt
status: regression
route: /stories/how-to-cut-grid-beams
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/how-to-cut-grid-beams.mdx:52` `alt="A person cutting a Grid Beam with a handsaw"` (the metadata alt at `:15` is already lowercase).

## Current

`content/stories/how-to-cut-grid-beams.mdx:44` `alt="A person cutting a grid beam with a handsaw"`.

## Verdict

rule: rebrand

## Log

- 2026-09-12: Re-judged after review: rule 1 keeps the "Grid Beam" wordmark in Title Case and lowercases "Grid Kit"; lowercasing "Grid Beam" in an alt is the operator's call. Left open.

- 2026-09-25: Regression (story grilling P5). Ships as legacy verbatim: "A person cutting a Grid Beam with a handsaw" (the Title Case wordmark, rule 1).
