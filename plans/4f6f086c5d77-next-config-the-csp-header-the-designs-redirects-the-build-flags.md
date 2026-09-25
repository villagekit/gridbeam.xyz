---
title: "next.config: the CSP header, the designs redirects, the build flags, the plugin pipeline's surviving pieces"
status: done
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
- `headers()`: the CSP verbatim on `/(.*)` (`bbc17e86b941`). It has to reach the visitor on Cloudflare: check that `@opennextjs/cloudflare` at the pinned version honors the Next config's `headers()` (its `node_modules` source), and confirm with `pnpm preview` and `curl -I`.
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

Shipped: `next.config.ts` re-ported from `../node-modules/apps/gridkit/next.config.mjs` at `fce357d`: the `cspHeader` template and `headers()` on `/(.*)` verbatim (`bbc17e86b941`); the four designs redirects with `permanent: false` (`6cd4e9b2641b`), the store redirects left out (`206a60875a2b`); `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true` with the legacy author's comment on each (`230ce4ee4848`), which the gate's own `pnpm lint` and `pnpm typecheck` keep honest; one operator sanction under rule 5 drops both. The one translation: legacy's sync `redirects()` is `async redirects()`, since `NextConfig.redirects` is typed `() => Promise<Redirect[]>` at next 15.5.18 (`node_modules/next/dist/server/config-shared.d.ts:822`). The single-element `flatMap` and the bare `// TODO:` comments are legacy's shape, kept.

Verified: in dev, `curl -sI localhost:3000/` prints `Content-Security-Policy: default-src *;    script-src 'self' 'unsafe-eval' 'unsafe-inline' https: data: blob:;    style-src 'self' 'unsafe-inline';`, the live legacy value byte for byte; `/creations` and `/ideas` are 307 to `/designs`, and `/creations/shelf-tower` and `/ideas/shelf-tower` 307 to `/designs/shelf-tower`. On Cloudflare: `@opennextjs/cloudflare@1.19.11` bundles `@opennextjs/aws@4.0.2`, whose routing handler loads the build's `routes-manifest.json` and applies its headers (`getNextConfigHeaders`) and redirects (`handleRedirects`) before rendering (`dist/core/routingHandler.js:80,85`, `dist/core/routing/matcher.js:71,242`). `pnpm preview` (`opennextjs-cloudflare build && opennextjs-cloudflare preview`) printed `Compiled successfully`, `OpenNext build complete.` and `[wrangler:info] Ready on http://localhost:8787`, then served the header on `/`, `/designs/shelf-tower`, `/icon.svg`, `/robots.txt`, `/sitemap.xml` and the 404, and the same four 307s with the same `Location`. The files the ASSETS binding serves ahead of the Worker (`/favicon-32x32.png`, `/site.webmanifest`, `/browserconfig.xml`, `/_next/static/chunks/*.js`) carry no header where Vercel sent it on every path: filed as `920b8de82d4f`, `open`, the Parity review's finding, for the rules to judge against the hosting decision `91cbeac8`.

CSP evidence: a Playwright probe loaded every route in `scripts/audit-routes.txt` on the live legacy site and on the current dev server and collected `securitypolicyviolation` events after load, network idle and a scroll to the bottom: zero violations on every route on both sides, the harness proven on the current home page by injecting a Google Fonts stylesheet and a `data:` image, which it reported as `style-src-elem` and `img-src` violations. Cloudinary images, the self-hosted `next/font` files, the WebGL canvas and the design pages' in-browser compile need no source legacy did not list, so no difference is filed for the value. The suppliers map is the suppliers record's to check when it lands: a stylesheet from a CDN falls outside `style-src 'self'`.

`createNextConfig` (`e0824769af3d`), piece by piece, also written as a note on the item: `pageExtensions` present; `@next/mdx`'s `providerImportSource: '@mdx-js/react'` overtaken by the app router, rule 4: `@next/mdx@15.5.18` defaults `providerImportSource` to `next-mdx-import-source-file` (`node_modules/@next/mdx/index.js:12,21`) and resolves it to the root `mdx-components.tsx` ahead of `@mdx-js/react` in the webpack branch (`:31-36`) and to `@vercel/turbopack-next/mdx-import-source` in the Turbopack branch the build runs (`:50-67`); the option would still be honored if passed, but the app router's mechanism is `mdx-components.tsx`, which exists, and `@mdx-js/react`'s provider is a client context. The monorepo `transpilePackages` discovery has no `packages/` to read, so the hand list stays; the `lodash` to `lodash-es` alias and `modularizeImports` have nothing to act on, `package.json` naming no lodash package (`lodash-es` reaches the store only under `@villagekit/ui` and the engine); svgr is `turbopack.rules['*.svg']` from the header brand slice. `@next/bundle-analyzer` (`ANALYZE=true`) and `DuplicatePackageCheckerPlugin` (`DEDUPE=true`) are not restored: both are webpack plugins (`@next/bundle-analyzer@15.5.18` depends on `webpack-bundle-analyzer` alone), and `next build --turbopack` never runs a `webpack` config (`node_modules/next/dist/build/index.js` takes the `turbopackBuild` branch; `dist/lib/turbopack-warning.js:172-175` only warns when a `webpack` key stands beside no `turbopack` key). They come back only through a webpack build (`next build` without `--turbopack`, plus a webpack svgr rule), a bundler choice no decision records, so by this plan's own rule the item stays `regression` with the note, for the operator to sanction under rule 5 or to decide the bundler. Three items fixed; one waits; one filed.

Reviews (Standards, Spec, Parity on Opus): no critical finding. Applied: the port citation moved to line 1; `honours` to `honors` in this plan's Work; the `@next/mdx` account corrected to cite both branches; the ASSETS finding filed. Dropped: none. Flags: the `transpilePackages` comment carried over says the published packages ship TypeScript sources at their top-level exports, but every `@villagekit/*` package at the pinned versions resolves `.` to `dist/index.js` (the shell record's Log flagged the same line in CLAUDE.md); whether each package still needs transpiling is a per-package build test for a later slice; `@mdx-js/react` sits in `package.json` with no importer in `app/` or `mdx-components.tsx`; the live legacy site's `strict-transport-security` and `x-robots-tag` come from Vercel, noted on the release record `a4df2bf79395`. No visual gate: the change touches no route's markup or styles, so the screenshot pairs did not run. Docs: CLAUDE.md's Commands table is unchanged, `pnpm preview` being a check this slice ran once, not a standing gate.

## Log
