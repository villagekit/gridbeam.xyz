---
title: "Field helper text: Chakra v2 FormHelperText at sm, 14px, to Chakra v3 helperText at xs, 12px on a 16px line"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's form theme (`@chakra-ui/theme`, `components/form.ts`, the `helperText` part): `fontSize: sm`, `mt: 2`; on the live `/subscribe`, `What should we call you?` is a `div` at 14px in `gray.600`, 8px below the input (`audit/subscribe/1280/legacy.png`, measured 2026-09-28).

## Current

Chakra v3's field recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js:39-42`): `helperText: { color: 'fg.muted', textStyle: 'xs' }`; the same text is a `span` at 12px on a 16px line (`audit/subscribe/1280/current.png`). The sibling's `../ui/src/components/FormLabel.recipe.ts:58-61` at `ca72207` writes the helper text's `display: block` and `mt: 2` again and no size, so the size stays 12px after the publish. The color is the palette's ([[72b776cb0d3f]]).

## Verdict

## Log

- 2026-09-28: Filed regression by the subscribe re-port (plan 244b962caae9), read on the form's pairs and measured on both sides: no rule of 2032533f covers a Chakra v3 recipe size, and the sibling's field recipe at ca72207 does not write it. A ui recipe fix in ../ui, the shape of the ui form recipes slice 59fa9072c63f, for a slice the shell verdicts plan 77cf83a1285a mints beside the shell record, blocking the bump plan 99f2fe62c62f.
