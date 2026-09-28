---
title: "Field required indicator: role presentation to aria-hidden alone by Chakra v3 Field.RequiredIndicator"
status: open
route: shell
axis: accessibility
kind: changed
---
## Legacy

Chakra v2's `FormLabel` (`@chakra-ui/form-control`, `RequiredIndicator`): `<span role="presentation" aria-hidden="true">*</span>` after the label text, `marginStart: 1`; on the live `/subscribe`, after `Preferred name` and `Email`.

## Current

Chakra v3's `Field.RequiredIndicator` (`node_modules/@chakra-ui/react/dist/esm/components/field/field.js`, `FieldRequiredIndicator`): `<span aria-hidden="true">*</span>`, no `role`, after the same two labels in `app/subscribe/SubscribeForm.tsx`. Neither side exposes the asterisk; the accessibility tree is the same (`audit/subscribe/dom/{legacy,current}.aria.yaml`). The same swap as the steps list icons' [[1ea1f9eda079]].

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9); on the shell verdicts plan 77cf83a1285a in the words of the steps list icons' 1ea1f9eda079, a tree the same on both sides.
