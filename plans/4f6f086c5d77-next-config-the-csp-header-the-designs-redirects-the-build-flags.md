---
title: "next.config: the CSP header, the designs redirects, the build flags, the plugin pipeline's surviving pieces"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by: f8c93eaf4922
tags:
  - "worker:fable"
priority: medium
---
`next.config.ts` carries what legacy's `next.config.mjs` and `createNextConfig` carried and the migration does not forbid: the Content-Security-Policy header, the `/creations` and `/ideas` redirects, the two build flags with the legacy author's comment, and a stated account of each `createNextConfig` piece. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f` (rule 4 covers only what the migration forces), `91cbeac8`.

## Work

- Legacy source: `../node-modules/apps/gridkit/next.config.mjs` and `packages/dev-next-config/src/index.mjs` at `fce357d`; current: `next.config.ts`.
- `headers()`: the CSP verbatim on `/(.*)` (`bbc17e86b941`). It has to reach the visitor on Cloudflare: check that `@opennextjs/cloudflare` at the pinned version honours the Next config's `headers()` (its `node_modules` source), and confirm with `pnpm preview` and `curl -I`.
- `redirects()`: `/creations`, `/ideas` to `/designs` and `/creations/:slug`, `/ideas/:slug` to `/designs/:slug`, `permanent: false` (`6cd4e9b2641b`); the store redirects stay out (`206a60875a2b`).
- `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true` with the legacy author's comment (`230ce4ee4848`): a regression by the rule's absence, and the gate's own `pnpm lint` and `pnpm typecheck` keep the checks; the item's Log says one operator sanction closes it instead, so the Outcome says so again and the operator can drop both by sanctioning.
- `createNextConfig` (`e0824769af3d`), piece by piece in the Outcome: `@next/mdx`'s `providerImportSource` (the app router's `mdx-components.tsx` is its mechanism, rule 4); the monorepo `transpilePackages` discovery (no workspace here; the hand list stays); `@next/bundle-analyzer` and `DuplicatePackageCheckerPlugin` (webpack plugins: restore them behind `ANALYZE` and `DEDUPE` if the pinned Next runs a `webpack` config beside Turbopack, else state that the build's Turbopack is the migration's path and what the plugins would need); the `lodash` to `lodash-es` alias (no lodash dependency here: `grep lodash package.json`); svgr (the header brand slice's Turbopack rule). The item closes when every piece is restored or its absence is upgrade-forced and stated; it stays `regression` with a note if a piece could be restored and is not.
- Closes `bbc17e86b941`, `6cd4e9b2641b`, `230ce4ee4848`, `e0824769af3d`.
- Verify first: what `next build --turbopack` at the pinned version does with a `webpack` key (the build's own warning).
- Docs: CLAUDE.md, Commands, if `pnpm preview` becomes part of a check.

## Seams under test

None pure.

## Done when

- `curl -sI localhost:3000/ | grep -i content-security-policy` prints the legacy value, and the same against `pnpm preview`
- `curl -sI localhost:3000/creations/shelf-tower` is a 307 to `/designs/shelf-tower`, and `/ideas` to `/designs`
- `grep -c "ignoreDuringBuilds: true\|ignoreBuildErrors: true" next.config.ts` prints 2
- the four items are `fixed`, or `e0824769af3d` carries the note, checked after the fixes
- `timeout 900 just check` is green

## Outcome

## Log
