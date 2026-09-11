---
title: "Decision tree: RasterImage with sizes and quality to StoryImage"
status: regression
route: /stories/how-to-furniture-bolts
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/how-to-furniture-bolts.mdx:309` `<RasterImage type='cloudinary' sizes={{ base: 'full', md: 'container.lg' }} quality={90} width={1200} height={693} />` (no radius or shadow).

## Current

`content/stories/how-to-furniture-bolts.mdx:308` `<StoryImage aspectRatio={null} width={1200} height={693} />` (radius xl and shadow md from `app/_components/story/StoryImage.tsx:39-40`, no `sizes` or `quality`). Both sides render the image at its natural ratio once loaded (992px wide on the live site, 960px on the dev server at 1280).

## Verdict

## Log
