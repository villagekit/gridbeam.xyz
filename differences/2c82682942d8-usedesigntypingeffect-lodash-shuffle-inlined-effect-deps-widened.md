---
title: "useDesignTypingEffect: lodash shuffle inlined, effect deps widened, nextDesign unused"
status: regression
route: /
axis: code
kind: changed
---
## Legacy

`apps/gridkit/hooks/useDesignTypingEffect.tsx:2,22-24,35-77` `shuffle` from `lodash-es`; the timer effect depends on `[designs, pause]`; the caller reads all three tuple elements (`pages/index.tsx:400,449-457`).

## Current

`app/_components/landing/useDesignTypingEffect.ts:1,84,97-108` cites the port; a local Fisher-Yates `shuffle`; deps `[designs, pause, loop, playbackRate]`; `nextDesign` is returned (`:90-94`) but the only caller drops it (`TypingDesignSection.tsx:30`).

## Verdict

## Log
