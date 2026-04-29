# 01 — Resolve React + Chakra version mismatch

**Status:** DONE

## Why
`./ui/package.json` currently declares `peerDependencies: { react: ^19.1.0 }` but `dependencies: { @chakra-ui/react: ^2.8.2 }`. Chakra v2 targets React 18; on React 19 it's at best unsupported, at worst broken. We need a coherent target before doing any other work.

## What
A `./ui/package.json` whose React peer-dep, Chakra version, and `@types/react` all line up. Target: **React 19 + Chakra v3**.

## Steps
- [x] Update `peerDependencies`: `react: ^19`, `react-dom: ^19`.
- [x] Update `devDependencies`: `@types/react: ^19`, `@types/react-dom: ^19`.
- [x] Update `dependencies`: `@chakra-ui/react: ^3.x` (latest stable). Drop the v2-specific subpackages (`@chakra-ui/react-types`, `@chakra-ui/skip-nav`, `@chakra-ui/theme`, `@chakra-ui/utils`) — most are absorbed into the v3 main package or replaced.
- [x] `pnpm install` and resolve any peer-dep conflicts.
- [x] Smoke-test: `pnpm run lint` and a quick `pnpm run dev` (Storybook) to see what breaks. (Most things will break — that's task 02's problem.)
- [x] Commit with message acknowledging the next big task.

## Notes
- Chakra v3 dropped a lot of v2's package surface. Many imports that used to come from `@chakra-ui/react-types` etc. are no longer needed because v3's APIs are different.
- After this task, NOTHING in `./ui/src/` will compile. That's expected — task 02 is the actual rewrite.
- Bumped to `@chakra-ui/react@^3.35.0` (latest stable as of 2026-04-30). `pnpm install` clean — React 19.1 + react-dom 19.1 + Chakra v3 with no peer-dep conflicts.
- Smoke-test `pnpm run lint`: only failure is a preexisting Biome format complaint on `package.json` `files` field (unrelated to this change). No new errors introduced. Storybook smoke not run — every consumer in `src/` and `stories/` imports v2-shape Chakra surface that no longer exists, so storybook is expected to fail until task 02 lands the rewrite.

## Depends on
None — this is the entry point of the stream.
