---
title: "Select field transition: Chakra v2's common properties over 0.2s removed"
status: open
route: shell
axis: visual
kind: removed
---
## Legacy

Chakra v2's input field base wrote `transitionProperty: common` and `transitionDuration: normal` (the packed v2 theme at 3.3.1, `components/input.js:51-52`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`), which v2's select field took as its own (`components/select.js:238-248`, `...baseStyleField` spreading the input's field): on the live site `/designs` at 375, either `role="menuitem"` select reads `transition: background-color 0.2s, border-color 0.2s, color 0.2s, fill 0.2s, stroke 0.2s, opacity 0.2s, box-shadow 0.2s, transform 0.2s`, so the hover border and the focus ring fade in (the Parity review's probe of plan ad2f5e52f9d8, `scratchpad/verify-probe.mjs`, `legacy.rest.transition`).

## Current

Chakra v3's native select field (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/native-select.js:16-37`, the `outline` variant at `:63`) writes no transition, and the ui recipe (`../ui/src/components/Select.tsx` at `7ee04a9`) none: on `pnpm dev` under the `file:../ui` override, `/designs` at 375, the same selects read `transition: all` at the browser's zero duration, so the border and the ring switch at once. The same on the published `@villagekit/ui@1.2.0`.

## Verdict

## Log

- 2026-09-27: Filed by the Parity review of the ui Select slice [[ad2f5e52f9d8]], which found it beside the background it fixed; not from that change (the readings hold before and after it). Not judged. The mechanism is the package's select recipe, so a fix is a ui slice beside the shell record; handed to [[6bc0d3ba08dc]].
