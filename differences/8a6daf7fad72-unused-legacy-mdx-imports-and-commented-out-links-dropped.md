---
title: Unused legacy MDX imports and commented-out links dropped
status: regression
route: /stories/how-to-cut-grid-beams
axis: code
kind: removed
---
## Legacy

`apps/gridkit/pages/stories/how-to-cut-grid-beams.mdx:1-5` imports `YouTube`, `Link`, `RasterImage`, `getCloudinaryUrl`, `StoryImageGrid` and uses none; `2021-winter-newsletter.mdx:1,3,5` `Box`, `VideoWrapper`, `ImageCarousel`; `2022-newsletter.mdx:1-11` `ImageCarousel`; `building-with-grid-kit.mdx:81,176` two commented-out `/todo` links.

## Current

Each `content/stories/*.mdx` imports only what it renders; the comments are gone.

## Verdict

dead imports and source comments with no rendered or executable effect

## Log

- 2026-09-12: Route set to the first MDX named; the same dead imports and comments exist in the 2021 and 2022 newsletters and building-with-grid-kit, dismissed with this item.

- 2026-09-12: Re-judged after review: a code difference, not a diff artifact, and no rule covers it. Restoring the unused imports would fail Biome; a fix plan should ask the operator (rule 5).
