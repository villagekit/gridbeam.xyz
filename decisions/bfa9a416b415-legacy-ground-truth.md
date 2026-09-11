---
title: Legacy ground truth
status: accepted
date: 2026-09-11
---
## Context

Parity needs one reference on each axis, and the two candidates could disagree: the live legacy deploy and the legacy source checkout.

## Decision

- The live site `https://gridkit-landing-villagekit.vercel.app` is the visual and interaction truth. Vercel reports it was built from commit `8ebf0ff` of `villagekit/node-modules`.
- The checkout `../node-modules` at `fce357d` (its `origin/main`) is the copy and code truth. `git diff 8ebf0ff fce357d -- apps/gridkit packages` is empty, so the two references agree.
- The 2023 `/order` page, live for a time at `https://gridkit-landing-8wj2weam2-villagekit.vercel.app/order`, is prior art for the suppliers map: `apps/gridkit/components/map/` at `fce357d`, introduced in `f88a93ea` and given a globe projection in `8311c3fa`.
- The shell (what every route shares) is, on the legacy side, `@villagekit/ui` at the version in the legacy lockfile plus the private packages `packages/ui-{page,nav,media,mdx}` and `apps/gridkit/{theme.ts,nav.ts,components/layouts,components/footer.tsx,components/logo}`; on the current side, `@villagekit/ui` at the version in `node_modules` (the `ui-*` packages folded in), `app/layout.tsx`, `app/_lib/nav.ts` and `app/_components/{Site*,CubeLogo,ObfuscatedEmail}.tsx`.
- If the live site and the source ever disagree, the difference is filed with both citations and the operator judges it.

## Consequences

Ported code cites `https://github.com/villagekit/node-modules/blob/fce357d/...`. The checkout stays on disk until the operator declares parity reached.
