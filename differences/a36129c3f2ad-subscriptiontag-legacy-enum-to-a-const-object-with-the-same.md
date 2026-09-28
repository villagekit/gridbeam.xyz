---
title: "SubscriptionTag: legacy enum to a const object with the same three members, tsconfig erasableSyntaxOnly rejects an enum"
status: open
route: /subscribe
axis: code
kind: changed
---
## Legacy

`packages/applet-subscribe/src/schema.ts:3-7` at `fce357d`: `export enum SubscriptionTag { gridkit = 'Grid Kit', villagekit = 'Village Kit', gridbeam = 'Grid Beam' }`, and `:19` `z.nativeEnum(SubscriptionTag)`.

## Current

`app/subscribe/schema.ts:8-13`: `export const SubscriptionTag = { ... } as const` with the same three members and `export type SubscriptionTag = (typeof SubscriptionTag)[keyof typeof SubscriptionTag]`; `z.nativeEnum` takes the object. `tsconfig.json:20` sets `erasableSyntaxOnly: true` (the scripts run by Node's type stripping, CLAUDE.md, Structure), which rejects an `enum` in every file the root config reads (`tsc`: TS1294). The members' names and values are legacy's.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9) as a code translation the toolchain or a dependency's major forced, the mechanism cited in Current; an agent sanctions nothing, so the operator reads it on the subscribe verdicts plan 91b42a34a79f.
