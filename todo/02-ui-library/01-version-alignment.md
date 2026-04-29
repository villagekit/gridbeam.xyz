# 01 — Resolve React + Chakra version mismatch

**Status:** TODO

## Why
`./ui/package.json` currently declares `peerDependencies: { react: ^19.1.0 }` but `dependencies: { @chakra-ui/react: ^2.8.2 }`. Chakra v2 targets React 18; on React 19 it's at best unsupported, at worst broken. We need a coherent target before doing any other work.

## What
A `./ui/package.json` whose React peer-dep, Chakra version, and `@types/react` all line up. Target: **React 19 + Chakra v3**.

## Steps
- [ ] Update `peerDependencies`: `react: ^19`, `react-dom: ^19`.
- [ ] Update `devDependencies`: `@types/react: ^19`, `@types/react-dom: ^19`.
- [ ] Update `dependencies`: `@chakra-ui/react: ^3.x` (latest stable). Drop the v2-specific subpackages (`@chakra-ui/react-types`, `@chakra-ui/skip-nav`, `@chakra-ui/theme`, `@chakra-ui/utils`) — most are absorbed into the v3 main package or replaced.
- [ ] `pnpm install` and resolve any peer-dep conflicts.
- [ ] Smoke-test: `pnpm run lint` and a quick `pnpm run dev` (Storybook) to see what breaks. (Most things will break — that's task 02's problem.)
- [ ] Commit with message acknowledging the next big task.

## Notes
- Chakra v3 dropped a lot of v2's package surface. Many imports that used to come from `@chakra-ui/react-types` etc. are no longer needed because v3's APIs are different.
- After this task, NOTHING in `./ui/src/` will compile. That's expected — task 02 is the actual rewrite.

## Depends on
None — this is the entry point of the stream.
