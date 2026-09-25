---
title: MediaContainer and the mdx Image and Video exports removed from the ui mdx module
status: upstream
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

- 2026-09-26: Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): src/mdx/MediaContainer.tsx, src/mdx/Image.tsx and src/mdx/Video.tsx are the legacy ui-mdx files translated to Chakra v3, exported from @villagekit/ui/mdx beside mdxComponents with useMediaMaxWidthBreakpoints and their props types. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] moves it to fixed.
