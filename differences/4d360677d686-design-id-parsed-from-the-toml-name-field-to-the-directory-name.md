---
title: "Design id: parsed from the TOML name field to the directory name"
status: fixed
route: /designs
axis: code
kind: changed
---
## Legacy

`packages/designs/src/index.ts:20-27` `const id = name.split('/')[1]` from `[product].name` (`@villagekit/bed-frame`).

## Current

`scripts/generate-designs-data.mjs:30-34` the id is the `products/<id>` directory name; `meta.name` is carried but never read.

## Verdict

plan 79cec2c9c850

## Log

- 2026-09-28: The generator this item cites as `scripts/generate-designs-data.mjs` is now `scripts/generate-designs-data.ts`, ported to TypeScript with the same behavior (plan d04ec0d664be); read its line numbers against the new file.
