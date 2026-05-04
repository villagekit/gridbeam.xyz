# 07 — Uplift: Footer (cross-cutting)

**Status:** DONE

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

- [x] In `app/_components/SiteFooter.tsx`:
  - Added the heart-icon slogan: "Created with ♥ by [Village Kit](https://villagekit.com)".
  - Added the copyright line: `© {new Date().getFullYear()}` at the very bottom.
- [x] Added a social row with **Village Kit's** accounts (NOT the old `madewithgridkit.*` accounts). All 8 URLs verified HTTP 200:
  - Email — `/contact` (preserves the obfuscated-email pattern; no raw mailto)
  - Mastodon — https://sunrise.social/@villagekit (legacy `/villagekit` form is 404; `/@villagekit` is the canonical Mastodon profile path)
  - Instagram — https://instagram.com/village_kit
  - X / Twitter — https://x.com/villagekit
  - Facebook — https://facebook.com/villagekit
  - YouTube — https://www.youtube.com/@villagekit
  - GitHub — https://github.com/villagekit
  - discuss.villagekit.com (`FaUsers` icon — added vs legacy)
- [x] Inlined `SocialIconLink` as a small helper in `SiteFooter.tsx` instead of porting a generic `Social` component. Single use site; can extract later if a second consumer appears.
- [x] Verified at 375 / 768 / 1280 (snapshots in `/tmp/footer-shots/`). Mobile fits all 8 icons in one centred wrapping row; footer doesn't grow excessively tall.

## Notes
- The `@villagekit/ui` `Footer` component already takes `sections` + `children`, so adding the slogan/copyright/social as children didn't require changes to the library — just to `SiteFooter.tsx`.
- The heart icon is a small detail but the kind of warmth this site has lost across the board. Worth restoring.
- Copyright year: uses `new Date().getFullYear()` so it auto-updates.
- Heart icon: rendered via `<Icon display="inline-block" verticalAlign="-0.125em" boxSize="3.5" color="primary.500"><FaHeart title="love" /></Icon>` — matches legacy's `title="love"` for SVG accessibility (gives the decorative heart an accessible name without duplicating via `aria-label`).
- Social icons: dropped the legacy `title={label}` attribute on the `<Link>` wrapper to avoid a hover tooltip duplicating the `aria-label` content. `aria-label` on the link is enough for screen-reader and tooltip behaviour.
- Email icon: links to `/contact` (which already uses `ObfuscatedEmail`) rather than a raw `mailto:` per the task spec — matching the spec exactly would defeat the existing email-obfuscation defense. Label is "Email" since the icon glyph + destination together convey the intent.
- Dropped the previous "gridbeam.xyz — open-source educational site about grid beam construction." tagline. The slogan + copyright now carry the closing voice; the tagline was redundant with the rest of the page.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/_components/SiteFooter.tsx`, `app/_lib/nav.ts`
- Legacy: `node-modules/packages/ui-page/src/components/Footer.tsx` (base) + `node-modules/packages/ui-brand/src/components/Footer.tsx` (extends with social + slogan)
