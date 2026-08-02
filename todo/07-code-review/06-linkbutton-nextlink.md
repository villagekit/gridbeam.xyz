# 06 — LinkButton: internal links bypass Next client navigation

**Status:** TODO (touches `../ui`; npm publish needs Mikey's go-ahead)

## Why

`@villagekit/ui`'s `LinkButton` (`ui/src/components/LinkButton.tsx` in the sibling checkout) wraps `Button asChild > Link` with **no NextLink integration**, so every internal-nav CTA on the site renders a plain `<a>` — full-page reload, no client navigation, no prefetch. Legacy used `LinkButton as={NextLink}` at every internal call site (`../node-modules/apps/gridkit/pages/index.tsx:97,184,244,268,343,425`).

Call sites affected (2026-08-03): `app/page.tsx:127,130,193,257,280,398`, `app/not-found.tsx:56-57`, `app/_components/landing/TypingDesignSection.tsx:66`. One site *tries* — `app/_components/SiteHeaderAction.tsx:10` passes `as={NextLink}` — but the reviewer believed `as` lands on the outer **Button**, not the inner Link, making it a no-op (verify!). Either way the pattern is inconsistent across call sites.

## What

All internal `LinkButton` hrefs performing client-side navigation (verified in devtools: no document reload, prefetch on hover/viewport), via one consistent mechanism.

## Steps

- [ ] Verify the finding first: run the site, click a landing CTA with the network tab open — a full document fetch confirms the bug. Also test the header "Designs" button to establish whether `SiteHeaderAction`'s `as={NextLink}` actually works (if it does, the fix may be as simple as using that prop everywhere).
- [ ] Read `ui/src/components/LinkButton.tsx` and decide the fix location. Two candidate shapes — pick with intent:
  - **Fix in `@villagekit/ui`** (preferred if the component is meant for Next sites): accept the framework link via composition. Since ui shouldn't depend on Next, the clean pattern is an `as`/`linkComponent` prop that reaches the inner `Link`, or `asChild` pass-through so callers compose `<LinkButton asChild><NextLink …>`. Look at how legacy's `ui-page` LinkButton did it (`as={NextLink}` worked there — port that mechanism) and how Chakra v3 recommends `asChild` composition.
  - **Fix at call sites only** if ui already supports a working mechanism that the site just isn't using.
- [ ] If ui changes: bump + publish `@villagekit/ui` (**ask Mikey before publishing** — publish is a gated action), then `pnpm update @villagekit/ui --latest`, commit `package.json` + lockfile per CLAUDE.md's bump flow.
- [ ] Update every internal call site to the chosen mechanism; leave external hrefs (if any use LinkButton) as plain anchors.
- [ ] Verify: client nav (no reload) on all touched CTAs, prefetch behavior, and that styling/recipes are unchanged.

## Notes

- Wiggle room: the "no-op" claim about `SiteHeaderAction` is an inference from reading how rest props flow — the verify step exists because if `as` *does* reach the inner Link, this whole task collapses to "use `as={NextLink}` consistently".
- Check other `@villagekit/ui` link-ish components while in there (`Link`, `LinkCard`, nav components) for the same gap — the site's `LinkCard` usages would have the identical problem if they render raw anchors. Scope creep is fine to *record* here, not necessarily to fix in one PR.
- villagekit.com (or other ui consumers) may not use Next — don't hard-import `next/link` inside ui.

## Depends on

- Coordination with the `villagekit/ui` release process (Stream 02 is historical/DONE, but the repo's bump-and-publish flow in CLAUDE.md applies).

## Files

- `../ui/src/components/LinkButton.tsx` (sibling repo)
- `app/page.tsx`, `app/not-found.tsx`, `app/_components/landing/TypingDesignSection.tsx`, `app/_components/SiteHeaderAction.tsx`
