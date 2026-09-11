---
title: next-superjson-plugin removed
status: sanctioned
route: shell
axis: code
kind: removed
---
## Legacy

`apps/gridkit/next.config.mjs:23-25`: `experimental.swcPlugins: [['next-superjson-plugin', {}]]`, serialising pages-router data props.

## Current

No `swcPlugins` or superjson in `next.config.ts` or `package.json`.

## Verdict

rule: upgrade (the app router has no getServerSideProps payload to serialise)

## Log
