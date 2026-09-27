---
title: "Tabs size lg: Chakra v2's 18px type on 12px by 16px padding to Chakra v3's 16px type on 8px by 18px padding at a fixed 44px height"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's tabs theme at `lg`: the tab `fontSize: lg`, `py: 3`, `px: 4`, with no height, minimum width or gap in the base, and the panel `p: 4` (the packed `@chakra-ui/theme` `dist/components` under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/`, `tabs.js:39-54,67-69,92-98`). The live `/designs/bed-frame` at 1280: each trigger 18px on a 27px line, padded 12px by 16px, 53px tall, `min-width: auto`, `gap: normal`; the list 53px; the panel padded 16px (plan eba62a497d77's probe, the scratchpad's `legacy.json`).

## Current

Chakra v3's tabs recipe at `lg`: `--tabs-height: sizes.11` and `--tabs-content-padding: spacing.4.5`, the trigger `py: 2`, `px: 4.5`, `textStyle: md`, the base trigger `minW` and `height` of `--tabs-height` with `gap: 2`, and the content's top padding of `--tabs-content-padding` (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/tabs.js:33-42,53-58,126-136`). The page under the ui override: each trigger 16px on a 24px line, padded 8px by 18px, 44px tall, `min-width: 44px`, `gap: 8px`; the list 44px; the panel padded 18px 16px 16px (`after.json`). Read beside the variant plan eba62a497d77 restores, and filed on `shell` as that plan said, since the size is the ui recipe's (`../ui/src/components/Tabs.tsx`) and reaches every `Tabs` at `lg`; the site's one consumer is `/designs/bed-frame`.

## Verdict

## Log
