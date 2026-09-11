---
title: "Install video: the react-youtube component to a boxed youtube-nocookie iframe"
status: regression
route: /stories/how-to-furniture-bolts
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/how-to-furniture-bolts.mdx:1,326` `<YouTube video="Xidi8xogSSQ" modestBranding showRelatedVideos={false} width='100%' style={{ aspectRatio: '16/9' }} />` from `@u-wave/react-youtube` (`apps/gridkit/package.json:31`).

## Current

`content/stories/how-to-furniture-bolts.mdx:325-342` `<Box width="100%" maxW="3xl" mx="auto" aspectRatio="16/9" borderRadius="xl" boxShadow="md" overflow="hidden"><iframe src="https://www.youtube-nocookie.com/embed/Xidi8xogSSQ?modestbranding=1&rel=0" title="How to install furniture bolts" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></Box>`.

## Verdict

## Log
