---
title: "Closing link: the Grid Kit discussion board to the community forum"
status: fixed
route: /stories/how-to-cut-grid-beams
axis: copy
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/how-to-cut-grid-beams.mdx:428` "For further tips, advice, and inspiration, visit the Grid Kit [discussion board](https://discuss.villagekit.com/)."

## Current

`content/stories/how-to-cut-grid-beams.mdx:421` "For further tips, advice, and inspiration, visit the [community forum](https://discuss.villagekit.com/)." (same href).

## Verdict

plan edf6cccdfbf6

## Log

- 2026-09-25: Regression (story grilling P4). Ships as "For further tips, advice, and inspiration, visit the Village Kit [discussion board](https://discuss.villagekit.com)." (legacy's link extent and href; rule 1 names Village Kit as the maker).

- 2026-09-26: Applied with the href as legacy wrote it at `../node-modules/apps/gridkit/pages/stories/how-to-cut-grid-beams.mdx:428` at `fce357d`, with the trailing slash; the verdict line quotes it without, the visible text is the same either way.
