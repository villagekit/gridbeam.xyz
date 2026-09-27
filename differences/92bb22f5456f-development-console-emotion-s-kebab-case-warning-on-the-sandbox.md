---
title: "Development console: emotion's kebab-case warning on the sandbox's hover key and the ui HoverCardContainer's class key"
status: open
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
