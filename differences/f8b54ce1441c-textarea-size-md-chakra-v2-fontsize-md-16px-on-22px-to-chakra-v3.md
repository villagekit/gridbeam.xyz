---
title: "Textarea size md: Chakra v2 fontSize md, 16px on 22px, to Chakra v3 textStyle sm, 14px on 20px"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's textarea theme (`@chakra-ui/theme`, `components/textarea.ts`, size `md` from the input sizes): `fontSize: md`, 16px; on the live `/subscribe`, `How did you find out about us?` types at 16px on a 22px line (measured 2026-09-28).

## Current

Chakra v3's textarea recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/textarea.js:38-43`, size `md`): `textStyle: sm`, 14px on a 20px line. The sibling's `../ui/src/components/Textarea.tsx` at `ca72207` writes no size.

## Verdict

## Log

- 2026-09-28: Filed regression by the subscribe re-port (plan 244b962caae9), read on the form's pairs and measured on both sides: no rule of 2032533f covers a Chakra v3 recipe size, and the sibling's field recipe at ca72207 does not write it. A ui recipe fix in ../ui, the shape of the ui form recipes slice 59fa9072c63f, for a slice the shell verdicts plan 77cf83a1285a mints beside the shell record, blocking the bump plan 99f2fe62c62f.
