---
title: eslint.ignoreDuringBuilds and typescript.ignoreBuildErrors removed
status: regression
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/next.config.mjs:13-17,63-66`: both `true`, each with `// TODO: remove, but for now GitHub Actions build is failing but lint checks are not.`

## Current

`next.config.ts` sets neither; `package.json` `check` runs `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.

## Verdict

## Log

- 2026-09-12: Regression by rule absence only: the legacy author's own comment marks both as TODO-remove. One operator sanction closes it.
