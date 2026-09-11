---
title: MediaContainer and the mdx Image and Video exports removed from the ui mdx module
status: regression
route: shell
axis: code
kind: removed
---
## Legacy

`packages/ui-mdx/src/index.tsx:1-27` exports the MDX `components` map and `Image`, `Video`, `MediaContainer`; `packages/ui-mdx/src/MediaContainer.tsx:1-28` centers and bounds media, used by `ui-mdx/src/Image.tsx:9,21` and `Video.tsx:6,13-17`.

## Current

`@villagekit/ui@1.2.0 src/mdx/index.ts:1-30` exports `mdxComponents` only; no `MediaContainer` anywhere in the package (`grep -rn MediaContainer node_modules/@villagekit/ui/src`); `mdx-components.tsx:1-8` wires `mdxComponents` only.

## Verdict

## Log

- 2026-09-12: Fix lands upstream in `../ui`.
