---
title: "Field label spacing: Chakra v2's 8px bottom and 12px end margins on a block label to Chakra v3's 6px field gap, the design page's controls two pixels tighter"
status: open
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's `FormLabel` base wrote `marginEnd: 3` and `mb: 2` on a block label (the packed v2 theme at 3.3.1, `components/form-label.js:27-28`, under `~/.nvm/versions/node/v22.3.0/lib/node_modules/@villagekit/screenshot/node_modules/@chakra-ui/theme/dist/`), and v2's `FormControl` was a plain block: on the live `/designs/bed-frame` at 1280 the `Preset` label reads `margin-right: 12px`, `margin-bottom: 8px`, spans its 296px column, and the preset select sits 8px under it in a 72px form control; the `Controls` switch sits 18px under its label in a 62px control (the ui form recipes slice's probe, `scratchpad/s59fa/legacy.json`, `label-gap2.mjs`).

## Current

Chakra v3's field recipe writes no margin on the label and lays the field root out as a flex column with `gap: 1.5`, 6px (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js:13-18`); the engine's `Label` (`node_modules/@villagekit/parameters/dist/components/label.js`) renders the label with `css: { margin: 0 }` inside an `HStack` with `marginBottom: 2`: on `pnpm dev` under the `file:../ui` override the `Preset` label reads `margin-right: 0px`, `margin-bottom: 0px`, 48px wide, the select 6px under it in a 70px field root, and the switch 16px under `Controls` in a 60px root. Two pixels shorter than legacy's controls; the label's width and the columns' own widths are the page's items. The gap is the ui field recipe's (v3's root gap where v2's label carried the margins), for a `../ui` slice beside the shell record; the engine's zeroed margin is read with it.

## Verdict

## Log

- 2026-09-28: From the ui form recipes slice's Parity review (plan 59fa9072c63f): the same mechanism moves the Parts tab's Group same size parts switch on /designs/bed-frame, a row field (app/_components/design/PartsBreakdown.tsx:35-36): legacy's label carries margin 0 12px 8px 0 and the switch sits at x=260 at 1280 and x=196 at 375; current's field root gap of 6px puts it at x=254 and x=190 (the reviewer's audit/_probe59fa/parts.mjs, audit/_review59fa/{legacy,current}-parts-{1280,375}.png). One item for both readings, the field recipe's; the slice 1b4708347ae9 reads the row field too.
