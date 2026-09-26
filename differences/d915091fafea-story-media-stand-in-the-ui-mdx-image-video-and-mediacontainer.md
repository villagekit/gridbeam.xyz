---
title: "Story media stand-in: the ui mdx Image, Video and MediaContainer and the full and container.lg sizes to a site-local module and pixel literals until the ui publish"
status: upstream
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`packages/ui-mdx/src/index.tsx:25-27` at `fce357d` exports `Image`, `MediaContainer`, `useMediaMaxWidthBreakpoints` and `Video` from `packages/ui-mdx/src/{Image,MediaContainer,Video}.tsx`, and the story components import them: `apps/gridkit/components/story/story-image.tsx:1` (`Image`), `story-video.tsx:1` (`Video`, `VideoProps`), `story-image-carousel.tsx:1` (`MediaContainer`, `useMediaMaxWidthBreakpoints`). The size names: `story-image.tsx:29-32` and `story-video.tsx:15-18` write `{ base: 'full', md: ['container.lg', 2] }` in a column, `story-image-carousel.tsx:18` the same, `story-image-grid.tsx:32-35` `['full', numColumns]` and `['container.lg', numColumns]`, and `pages/stories/how-to-furniture-bolts.mdx:309` `sizes={{ base: 'full', md: 'container.lg' }}` on the decision tree's `RasterImage`; `@villagekit/ui@0.9.0` `src/hooks/useSizeWidths.ts` holds `full` as `100%` and `container.lg` as `1024px`, and `packages/ui-media/src/hooks.ts:86-96,116` resolves them to `100.00vw` and `512.00px`.

## Current

The published `@villagekit/ui@1.2.0` exports neither the mdx media components (`node_modules/@villagekit/ui/dist/mdx/index.d.ts` lists the eleven map components only, [[d750c0a47839]]) nor the two size names (`dist/hooks/useSizeWidths.js:5-18` names `3xs` to `8xl`, and `dist/components/media/hooks.js:52` throws `Unexpected size value` on any other, [[252edab16c7a]]); both are in the sibling `../ui` at 1c3e3e8. So `app/_components/story/media.tsx` is a port of the three legacy files onto 1.2.0's media `Image` and `Video`, read by `app/_components/story/StoryImage.tsx:10`, `StoryVideo.tsx:2` and `StoryImageCarousel.tsx:5`; and the literals stand in for the names: `StoryImage.tsx:35-36` and `StoryVideo.tsx:16-17` `{ base: '100%', md: ['1024px', 2] }`, `StoryImageCarousel.tsx:18` the same, `StoryImageGrid.tsx:34-35` `['100%', numColumns]` and `['1024px', numColumns]`, `content/stories/how-to-furniture-bolts.mdx:312` `sizes={{ base: '100%', md: '1024px' }}`. The rendered `sizes` attribute is identical on both sides on every story image (the probe of 2026-09-26 over the six routes at 1280 and 375: `(min-width: 768px) 512.00px, 100.00vw` in a column, `(min-width: 768px) 341.33px, 33.33vw` on the grids, `(min-width: 768px) 1024.00px, 100.00vw` on the decision tree), the home's [[152511f71ef4]] and the about's [[36dc54eb5955]] being the same mechanism.

## Verdict

## Log

- 2026-09-26: Fixed in ../ui commit 1c3e3e8 (plan [[bc0407533650]]): src/mdx exports Image, Video, MediaContainer and useMediaMaxWidthBreakpoints again ([[d750c0a47839]]) and src/hooks/useSizeWidths.ts names full and container.lg again ([[252edab16c7a]]). Filed by the components slice (plan [[373320c95e55]]), the about's mechanism ([[36dc54eb5955]]) widened from a literal to a module. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] deletes media.tsx, imports from @villagekit/ui/mdx, swaps the literals back to full and container.lg and moves this to fixed.

- 2026-09-26: The story MDX files moved with the page re-port (plan 4331147cc118): a path content/stories/<slug>.mdx in the text above now reads app/stories/<slug>/page.mdx, the same body at the same lines plus one import line and two export lines after the story object.
