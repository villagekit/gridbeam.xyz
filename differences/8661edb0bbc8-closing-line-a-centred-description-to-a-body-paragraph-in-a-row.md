---
title: "Closing line: a centred Description to a body paragraph in a row"
status: regression
route: /stories/2021-winter-newsletter
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/2021-winter-newsletter.mdx:212-218` `<Description textAs='div'>That's a wrap, thanks for reading! ...</Description>` as a direct child of `StorySection`; `packages/ui-page/src/components/Description.tsx:22-27` `Container maxW="container.lg"`, `textAlign: 'center'`, `fontSize` md/lg; `audit/stories__2021-winter-newsletter/1280/legacy.png`.

## Current

`content/stories/2021-winter-newsletter.mdx:203-211` the sentence as a plain paragraph inside an added `<StoryRow index={0}><StoryColumn index={0}>`, left-aligned at body size; `audit/stories__2021-winter-newsletter/1280/current.png`.

## Verdict

## Log
