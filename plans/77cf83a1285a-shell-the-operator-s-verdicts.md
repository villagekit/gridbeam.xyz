---
title: "Shell: the operator's verdicts"
status: todo
parent: 337e35d86920
derived_from: a78b167170b8
tags:
  - attended
---
The fourteen differences on `shell` that the shell record `a78b167170b8` could not close by rule: nine `open` items an agent may not judge (rebranded copy under rule 1, rule 4 candidates where the upgrade changed a shape, one layout call with more than one fitting answer, two library internals of Chakra v2's `Slide` the port left behind) and five `regression` items whose fix is a call between alternatives or a rule 5 sanction. Decision `40abdb2f222a`: the record finished with these handed on here; the parity gate `f7a700a3e482` is `blocked_by` this plan, so the operator's review of the site comes after their verdicts. Each item keeps its state until the operator judges it.

wants: the operator's verdicts on the items below.

## Work

For each item, read it (`kipu show <id>`), then: `kipu sanction <id> --outcome -` or `kipu dismiss <id> --outcome -` with the verdict naming the rule or the call; or leave it `regression` (moving an `open` one with `kipu move <id> regression --from open`) and mint a slice for the fix beside the shell record (`--parent 337e35d86920`, `derived_from a78b167170b8`, tagged `worker:<model>`; a fix in `../ui` follows decision `28c1a536` and blocks the bump plan `99f2fe62c62f`). No verdict text is written by an agent (`2032533f`, `ca677697`).

- [[065852f6e813]] (`open`, copy, changed): `og:site_name`, `og:url` and the manifest's `start_url` read `Grid Beam` and `https://gridbeam.xyz` where legacy had `Grid Kit` and `https://gridkit.nz`. Is the rebrand (rule 1) sanctioned on all three values, or does one keep legacy's?
- [[13f1a23487f3]] (`open`, copy, changed): `og:video:alt` reads `Assembly of a coffee table made from grid beam` where legacy read `made from Grid Kit`, rule 1 applied literally at the split. Is that the string, or `made from Grid Beam`, or legacy's kept?
- [[1eddda919812]] (`open`, code, changed): the `QueryParamProvider` adapter is site-written (`app/_components/NextQueryParamAdapter.tsx`) where legacy used `next-query-params`' pages adapter, since the library's app adapter fails the static prerender or client-renders every route. Sanctioned under rule 4 (upgrade-forced), or is one of the alternatives dropped in plan `531b810f2dbd`'s Outcome wanted?
- [[89301ca8a1fc]] (`open`, accessibility, added): Chakra v3's `Icon` writes `aria-hidden="true"` beside `BlockSection`'s `role="presentation"`; the accessibility tree is identical on both sides. Sanctioned under rule 4, or `aria-hidden={undefined}` on the icon in `../ui`, as the footer's icons do?
- [[920b8de82d4f]] (`open`, code, removed): the files the Cloudflare ASSETS binding serves ahead of the Worker (`public/`, `/_next/static/`) carry no `Content-Security-Policy` where Vercel sent it on every path. Sanctioned under the hosting decision `91cbeac8`, or `run_worker_first` in `wrangler.jsonc` for those paths, at a Worker invocation per static file?
- [[abb4c0b4f849]] (`open`, code, changed): Next 15.5 streams the head metadata into `<body>` for a user agent it does not treat as a bot; bots get it in `<head>` as legacy's did. Sanctioned under rule 4, or an `htmlLimitedBots` setting in `next.config.ts`?
- [[c9ea22823a23]] (`open`, visual, changed): the four footer columns' minimum width is `44` (11rem) between md and lg where legacy's three were `3xs` at every width, so four fit 768 (the row 704px against 672px). Sanctioned as the consequence of decision `9f344fbfde9a`'s four sections, or the row stacking until lg, or a wrap at md?
- [[e403eeab87ea]] (`open`, code, removed): the mobile menu's slide layer carries no `chakra-slide` class where Chakra v2's `Slide` put one on its `motion.div`; no style or selector reads it on either side. Sanctioned under rule 4 (the v2 `Slide` is framer-motion code the port translated to `motion`, decision `ee86d68a`), or the class name written on the layer?
- [[eca6acde1370]] (`open`, code, removed): the slide layer has no `AnimatePresence` wrapper where Chakra v2's `Slide` had one that ran nothing on an always-mounted layer. Sanctioned under rule 4, or the wrapper written around the layer?
- [[1d2562d6b3bc]] (`regression`, visual, changed): the wordmark wraps at 768, the header 108px to legacy's 63px, the sum of the four-item nav (`c21b7e35f0c7`), the header action (`e48df8d1ce98`) and the longer wordmark on legacy's brand shape. Which fix: `whiteSpace: nowrap` on the wordmark, a tighter nav gap, a narrower action at md; or sanctioned under rule 5?
- [[2f91880a9f4a]] (`regression`, code, removed): `app/_components/logo/index.tsx` no longer re-exports `gl`, keeping three, drei and the resize polyfill out of every route's server render and client bundle, where legacy's barrel re-exported both. The one-line re-export (legacy's shape, at that cost), or a sanction under rule 5?
- [[e0824769af3d]] (`regression`, code, changed): `createNextConfig`'s bundle analyzer and duplicate-package checker are webpack plugins that `next build --turbopack` never runs; the other pieces are present or overtaken. Sanctioned under rule 5, or a webpack build (`next build` without `--turbopack`, plus a webpack svgr rule) to bring them back?
- [[ee7575aea3ae]] (`regression`, accessibility, changed): one toast region, `Notifications, bottom (alt+T)`, where Chakra v2 mounted six, one per placement. Sanctioned under rule 4, or six toasters, one per placement, which reproduce the count but not the names?
- [[f40107b60034]] (`regression`, visual, changed): Chakra v3's radius token scale (`sm` 0.25rem, `xs`, `2xs`, `4xl`, `l1` to `l3`, no `base`) where legacy kept v2's; the controls the site renders already round on v2's scale through the ui's recipes. Sanctioned under rule 4 on the residue, or the scale rewritten in `../ui`, which moves every v3 recipe reading `l2` further from v2?

## Seams under test

None.

## Done when

- Every item above is `sanctioned`, `dismissed` or `regression` with a slice minted for its fix; `kipu list --collection difference --filter route=shell --status open` prints nothing (checked when this plan is finished)
- `kipu verify --warnings-as-errors` is green

## Outcome

## Log

- 2026-09-26: From the home's MediaProvider slice (plan [[6f90e7e24ca6]]): two more shell items for the operator. [[afe50ab5c7aa]] (open, code, added): the site mounts MediaProvider in SiteProvider with the cloud name from app/_lib/cloudinary.ts, inside ChakraProvider and around QueryParamProvider, because the published 1.2.0 media components throw without the context and the home's re-ports render the ui Image and Video; legacy's ui-media hard-coded the cloud and its _app.tsx mounted no such provider. Sanctioned under rule 4 (the context is the upgrade's shape), or a sibling change that removes the need (the mdx and media slice's ui commit 1c3e3e8 already defaults the name to villagekit, so after the publish the mount is only the imageComponent wiring)? [[0efe45924dbe]] (open, code, added, was sanctioned): its verdict (the provider not mounted, the loader file being the one call site) is overtaken by the mount and superseded by the item above; the operator re-judges it, dismissed as superseded or sanctioned again.

- 2026-09-26: From the home record's finish (plan [[fd9a92bd8abd]]): two more shell items for the operator, filed by the ui press slice [[8a869061bce7]] after this plan was written. [[c14d1a8d177f]] (open, interaction, changed): the header action anchor at 1280 takes focus on mousedown on the live legacy site and shows the outline ring while pressed; here Find a supplier does not (document.activeElement stays body), while the mobile menu toggle, a button, focuses on press on both sides. What in Chakra v2's button made the anchor mouse-focusable was not read. Sanctioned under rule 4, or a regression whose cause a slice reads first? [[53f8a05a03fa]] (open, interaction, changed): Chakra v3 guards every _hover style with @media (hover: hover), so a pointer that cannot hover never shows a button's hover fill, border or scale, where legacy's unguarded &:hover showed them through the browser's sticky hover after a tap. Sanctioned under rule 4 (the guard is Chakra v3's on purpose), or a regression re-ported by writing the hover states in ../ui without it?
