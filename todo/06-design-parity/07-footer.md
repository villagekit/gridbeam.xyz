# 07 — Uplift: Footer (cross-cutting)

**Status:** TODO

## Why

Every page shares the footer. Legacy footer had social-media icons (Mastodon, Bluesky, Instagram, X, Facebook, Threads, YouTube, TikTok, GitHub, email), a "Created with ♥ by Village Kit" slogan with a heart-icon flourish, and a "© 2026" copyright. Current footer has only 4 columns of links + a single line of plain text. Three concrete losses, applies to every page.

## Concrete regressions

From every audit screenshot at the bottom of the page (e.g. `audit/_root/1280/{legacy,current}.png`):

### Visual
- ⚠️ Lost: row of social-media icons (10 icons in the legacy bottom area).
- ⚠️ Lost: "Created with ♥ by Village Kit" slogan, with `<Icon as={FaHeart} ...>` accent.
- ⚠️ Lost: copyright year ("© 2026").

### Interaction, Accessibility, Copy, Code
The 4-column link structure is fine. The 4th column ("Legal") is a sensible addition. The footer composition through `@villagekit/ui`'s `Footer` component is clean.

## Recommended mode

**Restore close to legacy** for the slogan and copyright (pure visual loss). Make the social row optional/conditional — the gridbeam.xyz site doesn't have its own social presence yet, but Village Kit's accounts could be linked.

## Steps

- [ ] In `app/_components/SiteFooter.tsx`:
  - Add the heart-icon slogan: "Built by [Village Kit](https://villagekit.com)" with a heart accent. (Update wording to fit the educational/non-commercial framing — "Created with ❤ by" is fine; "Built and maintained by" might fit better.)
  - Add the copyright line: `© {new Date().getFullYear()}` at the very bottom.
- [ ] Decide on the social row:
  - Option A: list Village Kit's social accounts (Mastodon, GitHub, etc.) — community pointers.
  - Option B: omit until gridbeam.xyz has its own accounts; add later.
  - **Confirm with the user before adding** — adding social handles is an editorial decision.
- [ ] If Option A is chosen, port the `Social` component pattern from `node-modules/packages/ui-brand/src/components/Social.tsx`, but generalise — it currently lives in the startup-specific `ui-brand` package. The `@villagekit/ui` `Footer` already accepts `children`, so a `<Social ... />` block can be added without changing the layout primitive.
- [ ] Verify at 375 / 768 / 1280 — footer should not become too tall on mobile.

## Notes
- The `@villagekit/ui` `Footer` component already takes `sections` + `children`, so adding the slogan/copyright/social as children doesn't require changes to the library — just to `SiteFooter.tsx`.
- The heart icon is a small detail but the kind of warmth this site has lost across the board. Worth restoring.
- Copyright year: use `new Date().getFullYear()` so it auto-updates.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/_components/SiteFooter.tsx`, `app/_lib/nav.ts`
- Legacy: `node-modules/packages/ui-page/src/components/Footer.tsx` (base) + `node-modules/packages/ui-brand/src/components/Footer.tsx` (extends with social + slogan)
