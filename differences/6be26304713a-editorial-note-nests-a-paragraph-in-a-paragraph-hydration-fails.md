---
title: "Editorial note nests a paragraph in a paragraph: hydration fails on three story routes"
status: regression
route: /stories/building-with-grid-kit
axis: code
kind: changed
---
## Legacy

The legacy story pages hydrate clean; no such element.

## Current

`app/_components/story/StoryEditorialNote.tsx:28-30` renders its children in a `Text` (a `p`); MDX wraps the note's text in its own `<p>` (`content/stories/building-with-grid-kit.mdx:25-27`), giving `paragraph > paragraph` (`audit/stories__building-with-grid-kit/dom/current.aria.yaml:58-60`). In the browser on /stories/building-with-grid-kit, /stories/2021-winter-newsletter and /stories/2022-newsletter (dev server, 1280): "In HTML, <p> cannot be a descendant of <p>. This will cause a hydration error." then "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client."

## Verdict

## Log
