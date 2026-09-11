---
title: "Preset field: role group attribute dropped"
status: sanctioned
route: /designs/bed-frame
axis: code
kind: removed
---
## Legacy

`gridkit@v0.9.0 core/parameters/src/presets/index.tsx:67` `<FormControl id="preset" role="group">`.

## Current

`@villagekit/parameters@0.10.0 src/presets/index.tsx:67` `<Field.Root id="preset">`; the tree still shows `group` on both sides.

## Verdict

rule: upgrade (Field.Root exposes the group role itself)

## Log

- 2026-09-12: Template.

- 2026-09-12: Settled-tree evidence (probe on `http://localhost:3000/designs/bed-frame`, plan cf52c388): four `[role=group]` `chakra-field__root` elements, ids `field::preset` and `field::_r_5_`; the ledger capture `current.aria.yaml` can hold the pre-compile placeholder instead, see [[9d4e2e43543e]].
