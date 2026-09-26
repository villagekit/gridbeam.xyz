---
title: Unused legacy MDX imports and commented-out links dropped
status: fixed
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

plan eeeb3813

## Log

- 2026-09-12: Route set to the first MDX named; the same dead imports and comments exist in the 2021 and 2022 newsletters and building-with-grid-kit, dismissed with this item.

- 2026-09-12: Re-judged after review: a code difference, not a diff artifact, and no rule covers it. Restoring the unused imports would fail Biome; a fix plan should ask the operator (rule 5).

- 2026-09-26: Handed to the operator on the attended verdicts plan [[14be8f377b34]] at the split of the story pages record [[56e6eb197e6c]] (decision 40abdb2f222a), as the M1 note above asks. Two corrections to that note: Biome reads no .mdx file (biome check on a story file reports no file processed), so restoring the imports costs nothing at the gate; and one of them, the 2021 newsletter's import of VideoWrapper from ui-mdx, names an export the package never had at fce357d, so it has no form that resolves. The inline MDX slice [[eeeb3813939b]] restores the rest by default and closes the item with a note unless a verdict lands first. The state stays until the operator judges it.

- 2026-09-26: No verdict had landed when the inline MDX slice [[eeeb3813939b]] ran, so legacy's form ships where it resolves: how-to-cut-grid-beams.mdx imports YouTube (from the site's client module app/_components/YouTube.tsx), Link and RasterImage (from @villagekit/ui), getCloudinaryUrl (from @/app/_lib/cloudinary) and StoryImageGrid, none rendered; 2021-winter-newsletter.mdx imports Box and ImageCarousel (from @/app/_components/ImageCarousel) and 2022-newsletter.mdx ImageCarousel, none rendered; building-with-grid-kit.mdx carries legacy's two commented-out /todo links verbatim, at the planning image and at the end of the nuts and bolts sentence. The one line with no form that resolves, 2021's import of VideoWrapper from ui-mdx, is not written: the package never exported it at fce357d (the grep in the plan prints that import alone), so the line would fail the build. Biome reads no .mdx, and next build resolves every restored import (the gate is green). The state moves to fixed with this slice; a later verdict that wants the imports dropped again supersedes it by a note and a new state.
