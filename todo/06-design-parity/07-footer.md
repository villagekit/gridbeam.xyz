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
  - Add the heart-icon slogan: "Created with ♥ by [Village Kit](https://villagekit.com)" — **decided** (legacy phrasing wins).
  - Add the copyright line: `© {new Date().getFullYear()}` at the very bottom.
- [ ] Add a social row with **Village Kit's** accounts (NOT the old `madewithgridkit.*` accounts — those were for the startup). Sourced from `node-modules/apps/villagekit/components/footer.tsx`:
  - GitHub — https://github.com/villagekit
  - Mastodon — https://sunrise.social/villagekit
  - Instagram — https://instagram.com/village_kit
  - X / Twitter — https://x.com/villagekit
  - Facebook — https://facebook.com/villagekit
  - YouTube — https://www.youtube.com/@villagekit
  - discuss.villagekit.com — community forum
  - Email — mailto:hello@mikey.nz
  - Verify each URL still resolves before shipping; the legacy list is from a 2023-era footer.
- [ ] Port the `Social` component pattern from `node-modules/packages/ui-brand/src/components/Social.tsx`, but generalise — it currently lives in the startup-specific `ui-brand` package. The `@villagekit/ui` `Footer` already accepts `children`, so a `<Social ... />` block can be added without changing the layout primitive.
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
