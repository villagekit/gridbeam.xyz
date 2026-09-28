---
title: "Subscribe form Storybook story: stories.tsx not ported, this repo runs no Storybook"
status: open
route: /subscribe
axis: code
kind: removed
---
## Legacy

`packages/applet-subscribe/src/stories.tsx` at `fce357d`: a Storybook story of `SubscribeForm` (`@storybook/react` 6, `package.json:14`).

## Current

Not ported: this repo runs no Storybook, and no rule of `2032533f` names a dev tool. `index.ts`, the package barrel, is the module layout [[fede2033572a]] covers and [[f60ba42d1e34]]'s verdict names.

## Verdict

## Log

- 2026-09-28: Filed open by the subscribe re-port (plan 244b962caae9): a dev tool's file not ported, no rule of 2032533f naming a dev tool; on the subscribe verdicts plan 91b42a34a79f.
