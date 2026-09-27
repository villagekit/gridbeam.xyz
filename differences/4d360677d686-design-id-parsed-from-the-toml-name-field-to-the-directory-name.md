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
