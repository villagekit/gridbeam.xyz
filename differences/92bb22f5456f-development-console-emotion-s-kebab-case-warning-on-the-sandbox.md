---
title: "Development console: emotion's kebab-case warning on the sandbox's hover key and the ui HoverCardContainer's class key"
status: upstream
route: /designs/bed-frame
axis: code
kind: added
---
## Legacy

The live `/designs/bed-frame` and `/designs/5-12-13-triangle-desk` at 1280 log no styling warning: the Playwright capture of every console error and warning (the scratchpad's `probe.mjs` and `probe3.mjs`, the re-port's probes) reads Matomo's CORS failures, a 429 and WebGL driver messages alone. Chakra v2 took the engine's `sx` keys as written.

## Current

On `pnpm dev`, `/designs/bed-frame` and `/designs/5-12-13-triangle-desk` log `Using kebab-case for css properties in objects is not supported. Did you mean :hover, :focusWithin?`, emotion's development serializer (`@emotion/serialize@1.3.3`, under Chakra v3's styled runtime) on the sandbox's `'&:hover, &:focus-within'` key (`@villagekit/sandbox@0.10.0 dist/index.js`, `../gridkit/core/sandbox/src/index.tsx:87`), and `/designs` logs the same with `.uiHoverCard` for the ui `HoverCardContainer`'s `'.ui-hover-card'` selector keys (`@villagekit/ui@1.2.0 dist/components/HoverCard.js:58-61`). Development only: emotion emits it under `process.env.NODE_ENV !== 'production'`, so nothing reaches a visitor, and the styles apply. Both keys are a package's; a fix belongs in `../gridkit` and `../ui`, never here. Read by the page re-port (plan 3c448a379ad7), which introduced neither: the sandbox's key fires on every design page, the ui's on the catalog.

## Verdict

## Log

- 2026-09-28: Moved to upstream at the design pages record's finish (plan [[0bc88eaf5493]], decision 28c1a536): both keys are fixed in the siblings already. The sandbox's key on every design page is the published 0.10.0's, which reads ':hover, :focus-within' in node_modules/@villagekit/sandbox/dist/index.js (the message's own suggestion, :hover, :focusWithin, is the camelCase form of that key); the sibling at 15dc73a (the sandbox slice [[1e2fbba70884]], the fix of [[941bd045b043]]) writes '&:hover, &:focus-within', a selector Chakra v3 reads as one, and that slice's probe under the sandbox tarball override read no kebab-case line for the sandbox on /designs/bed-frame at 1280 and 375. The Current's citation of ../gridkit/core/sandbox/src/index.tsx:87 names the fixed line by mistake. The ui HoverCardContainer's keys on /designs (the design page's frame is a HoverCard, which carries none) are [[7877c267268c]]'s, fixed at ../ui 2e2d68c (the slice [[8235bd4bea81]]). The bump plan [[99f2fe62c62f]] carries both checks already (the sandbox slice's note: no kebab-case line naming :hover or :focusWithin; the HoverCardContainer slice's note: the console on /designs holds no kebab-case line); it reads the console on /designs/bed-frame and /designs/5-12-13-triangle-desk too, then moves this to fixed.
