---
title: "Field error text: Chakra v2 FormErrorMessage at sm, 14px, weight 400, to Chakra v3 errorText at xs, 12px, weight medium"
status: regression
route: shell
axis: visual
kind: changed
---
## Legacy

Chakra v2's form-error theme (`@chakra-ui/theme`, `components/form-error.ts`, the `text` part): `fontSize: sm`, `mt: 2`, `color: red.500`; on the live `/subscribe` with `a@b` submitted, `Invalid email` is a `div` at 14px, weight 400, 8px below the input (measured 2026-09-28).

## Current

Chakra v3's field recipe (`node_modules/@chakra-ui/react/dist/esm/theme/recipes/field.js:31-38`): `errorText: { fontWeight: 'medium', color: 'fg.error', textStyle: 'xs' }`; the same text is a `span` at 12px on a 16px line, weight 500. The sibling's `../ui/src/components/FormLabel.recipe.ts:62-65` at `ca72207` writes `display: flex` and `mt: 2` again and no size or weight.

## Verdict

## Log

- 2026-09-28: Filed regression by the subscribe re-port (plan 244b962caae9), read on the form's pairs and measured on both sides: no rule of 2032533f covers a Chakra v3 recipe size, and the sibling's field recipe at ca72207 does not write it. A ui recipe fix in ../ui, the shape of the ui form recipes slice 59fa9072c63f, for a slice the shell verdicts plan 77cf83a1285a mints beside the shell record, blocking the bump plan 99f2fe62c62f.
