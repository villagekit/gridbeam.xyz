---
title: "Subscribe form useForm: one type to the schema input, context and output types, @hookform/resolvers 5 types the resolver by input and output apart"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/component.tsx:42-44` at `fce357d`: `useForm<SubscriptionFormData>({ resolver: zodResolver(subscriptionFormSchema) })`, `@hookform/resolvers` 3 (`package.json:13`), which typed the resolver by one type.

## Current

`app/subscribe/SubscribeForm.tsx:41` `useForm<SubscriptionFormInput, unknown, SubscriptionFormData>(...)` and `app/subscribe/types.ts:14` `SubscriptionFormInput = z.input<typeof subscriptionFormSchema>`. `@hookform/resolvers` 5.9.1 (`node_modules/@hookform/resolvers/zod/dist/zod.d.ts`) types the resolver by the schema's input and output apart, and the schema's `.default('')` fields make them differ, so the one-type form no longer compiles (TS2322). The submit handler and the request data keep legacy's `SubscriptionFormData`.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9) as a code translation the toolchain or a dependency's major forced, the mechanism cited in Current; an agent sanctions nothing, so the operator reads it on the subscribe verdicts plan 91b42a34a79f.
