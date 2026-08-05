# 06 — LinkButton: internal links bypass Next client navigation

**Status:** DONE (2026-08-06)

## Why

`@villagekit/ui`'s `LinkButton` (`ui/src/components/LinkButton.tsx` in the sibling checkout) wraps `Button asChild > Link` with **no NextLink integration**, so every internal-nav CTA on the site renders a plain `<a>` — full-page reload, no client navigation, no prefetch. Legacy used `LinkButton as={NextLink}` at every internal call site (`../node-modules/apps/gridkit/pages/index.tsx:97,184,244,268,343,425`).

Call sites affected (2026-08-03): `app/page.tsx:127,130,193,257,280,398`, `app/not-found.tsx:56-57`, `app/_components/landing/TypingDesignSection.tsx:66`. One site *tries* — `app/_components/SiteHeaderAction.tsx:10` passes `as={NextLink}` — but the reviewer believed `as` lands on the outer **Button**, not the inner Link, making it a no-op (verify!). Either way the pattern is inconsistent across call sites.

## What

All internal `LinkButton` hrefs performing client-side navigation (verified in devtools: no document reload, prefetch on hover/viewport), via one consistent mechanism.

## Steps

- [x] Verify the finding first: run the site, click a landing CTA with the network tab open — a full document fetch confirms the bug. Also test the header "Designs" button to establish whether `SiteHeaderAction`'s `as={NextLink}` actually works (if it does, the fix may be as simple as using that prop everywhere).
- [x] Read `ui/src/components/LinkButton.tsx` and decide the fix location.
- [x] If ui changes: bump + publish `@villagekit/ui`, then `pnpm update @villagekit/ui --latest`, commit `package.json` + lockfile per CLAUDE.md's bump flow. — `../ui` commit `e3cddc3`; 1.2.0 published by Mikey via the tag-triggered CI workflow.
- [x] Update every internal call site to the chosen mechanism; leave external hrefs as plain anchors.
- [x] Verify: client nav (no reload) on all touched CTAs, prefetch behavior, and that styling/recipes are unchanged.

## Notes

**The finding held.** Confirmed by reading Chakra v3's styled factory
(`@chakra-ui/react@3.35.0/dist/esm/styled-system/factory.js`): when `asChild` is set,
`FinalTag` is overwritten by the child's type and `as` is skipped in the prop loop, so it is
dropped entirely. `SiteHeaderAction`'s `as={NextLink}` was indeed a no-op. Verified at runtime
too — a temporary `as="span"` probe still rendered `<a>` before the fix, and `<span>` after.

**The fix, in `@villagekit/ui` 1.2.0:**

- `LinkButton` / `LinkIconButton`: `as` is destructured out of props and applied to the inner
  `Link` (typed as `LinkProps['as']`, `Omit`ted from the Button props it extends). This restores
  the legacy v2 call-site idiom `<LinkButton as={NextLink} href="…">` — v2's component was
  `<Button as={Link} {...props}/>`, where the caller's `as` overrode the inner one.
- `LinkCard`: regained v2's `linkComponent` prop, applied to the `LinkOverlay`. `as` stays
  targeted at the card element, exactly as in v2 — the asymmetry with `LinkButton` is legacy's,
  and it exists because `LinkCard` has two elements worth swapping.
- `LinkIconButton` also gained `rel="noopener noreferrer"` on external links, matching
  `LinkButton` (commit `590feb5` in `../ui` fixed only one of the pair).
- **`LinkCard`'s `rel` was dead code** — found in review. Chakra v3's `LinkOverlay` destructures
  `rel` off its props and never re-applies it (`@chakra-ui/react/dist/esm/components/link/link-box.js:10`),
  so every external card had been shipping `target="_blank"` with no `noopener noreferrer` since
  the v3 migration. `LinkCard` now renders the overlay as `<LinkOverlay asChild><chakra.a …/></LinkOverlay>`
  so its own anchor props survive. Affected live pages: `/legal`, `/subscribe`, `/tools-and-resources`.
- **`MdxLink` routes internal hrefs through `NextLink`** — in-prose links between pages
  (`content/stories/*.mdx`) were reloading the document. `#hash` links stay plain anchors.
- `type="button"` no longer leaks onto the anchor from Chakra's `Button` default.
- `Note(cc)` left on `LinkButton` for the two things that need a major: the `ref` is typed
  `HTMLButtonElement` while the element is an anchor, and the inherited `disabled`/`loading` props
  do nothing on `<a>`.

**Correction to an earlier note in this file:** the claim that ui's Next dependency "stays
optional" is false — `ui/src/components/layouts/Footer.tsx` and `ui/src/components/nav/NavList.tsx`
already `import` from `next/link` / `next/navigation` unconditionally and are exported from the
package root, so a non-Next consumer breaks at import time today. `MdxLink` now joins them. The
`as`/`linkComponent` props are still the right API (they keep the *call sites* framework-agnostic),
but the optional-peer claim in `../ui`'s `package.json` needs resolving — filed as
[task 19](./19-ui-next-peer-dependency.md).

**Site call sites updated** — internal only, externals deliberately left as plain anchors:
`app/page.tsx` (5 LinkButton + 3 LinkCard), `app/about/page.tsx` (1 + 3), `app/not-found.tsx` (2),
`app/designs/[id]/page.tsx`, `app/suppliers/page.tsx`, `app/legal/page.tsx`,
`app/subscribe/page.tsx`, `app/tools-and-resources/page.tsx` (mapped cards pass
`linkComponent={entry.isExternal ? undefined : NextLink}`),
`app/_components/design/DesignCuttingPlan.tsx`, `app/_components/landing/TypingDesignSection.tsx`.
`SiteHeaderAction.tsx` was already correct and now works.

The sweep was then widened past `LinkButton`/`LinkCard` — plain `<Link href="/…">` in prose had
the same problem and would have left the site half-converted: `app/faq/page.tsx` (7),
`app/suppliers/page.tsx` (5), and `SiteFooter`'s `SocialIconLink` (the `/contact` mail icon).

**Verification** — a Playwright script (`scratchpad/nav-check.mjs`) clicks eleven representative
links (landing hero ×2, landing LinkCard, legal LinkCard, about LinkButton, 404 LinkButton, header
action, faq prose Link, suppliers prose Link, footer social icon, MDX prose link) and counts
`document` requests after each click. Against published 1.1.1: **7/7 full reloads** (the four added
cases came later). Against the fix: **0/11** — all client-side. `rel="noopener noreferrer"` and the
absence of `type=` on anchors were checked by curling the SSR HTML; the `LinkOverlay` `::before`
click-target CSS was diffed and is unchanged. `pnpm lint`, `pnpm typecheck`, `pnpm build` clean in
this repo; `pnpm lint`, `pnpm types`, `pnpm publint` clean in `../ui`.

**Re-verified against the published package (2026-08-06).** The runs described above were first
made against a locally-built `../ui` `dist/` rsynced over the pnpm store copy of 1.1.1 — not a
trustworthy basis for calling this done. After 1.2.0 landed on npm the whole thing was redone from
a clean slate: `rm -rf node_modules`, `pnpm update @villagekit/ui --latest` (now `^1.2.0`, lockfile
pinned to 1.2.0, `linkComponent` confirmed present in the registry tarball's `dist/`), then
`pnpm typecheck`, `pnpm lint`, `pnpm build` — all clean — and `nav-check.mjs` again: **0/11
document requests**. The `rel="noopener noreferrer"` and no-`type=`-on-anchors checks were re-curled
against the same build.

**Scope creep recorded, not fixed:** `LinkCard`'s overlay anchor is empty, so the link has no
accessible name — filed as [task 18](./18-linkcard-accessible-name.md) (Mikey's call: follow-up,
not this release; the resulting biome `useAnchorContent` error is suppressed in `LinkCard.tsx` with
a comment pointing at that task). ui's optional-`next`-peer claim — [task 19](./19-ui-next-peer-dependency.md).
`Link`, `NavLink`, and `LinkOverlay` pass `as` straight through to the Chakra factory and were
never affected.

## Depends on

- Coordination with the `villagekit/ui` release process (Stream 02 is historical/DONE, but the repo's bump-and-publish flow in CLAUDE.md applies).

## Files

- `../ui/src/components/LinkButton.tsx`, `LinkIconButton.tsx`, `LinkCard.tsx`, `CHANGELOG.md`, `package.json` (sibling repo)
- `app/page.tsx`, `app/about/page.tsx`, `app/not-found.tsx`, `app/designs/[id]/page.tsx`, `app/suppliers/page.tsx`, `app/legal/page.tsx`, `app/subscribe/page.tsx`, `app/tools-and-resources/page.tsx`, `app/_components/design/DesignCuttingPlan.tsx`, `app/_components/landing/TypingDesignSection.tsx`
