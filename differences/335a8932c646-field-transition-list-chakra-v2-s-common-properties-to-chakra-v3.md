---
title: "Field transition list: Chakra v2's common properties to Chakra v3's common token, which adds translate"
status: open
route: shell
axis: code
kind: changed
---
## Legacy

Chakra v2's `transitionProperty: common` token was `background-color, border-color, color, fill, stroke, opacity, box-shadow, transform` (the packed v2 theme at 3.3.1, `foundations/transition.js:27`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`), which v2's input, select and link bases wrote: on the live site `/designs` at 375, either `role="menuitem"` select reads `transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform` (the probe of plan 6bc0d3ba08dc, `scratchpad/chevron-legacy.json`).

## Current

Chakra v3's `common` token is `background-color, border-color, color, fill, stroke, opacity, box-shadow, translate, transform` (`node_modules/@chakra-ui/react/dist/esm/preset-base.js:977`), one property more, and the ui recipes write the token where v2's wrote it (`../ui/src/components/Select.tsx`, the native select field, and `Link.tsx:46`, the link): on `pnpm dev` under the `file:../ui` override, `/designs` at 375, the same selects read the nine-property list (`scratchpad/chevron-after.json`). Nothing on the site sets `translate` on a field or a link, so nothing on screen moves; the reading is the computed list alone. One item on `shell`, since the token reaches every ui recipe that writes it.

## Verdict

## Log

- 2026-09-27: Filed by the Parity review of the ui Select slice [[6bc0d3ba08dc]], which wrote v3's token over a literal copy of v2's list, the choice the link recipe made before it (the recipes slice [[45d6f5634a11]]). Not judged.
