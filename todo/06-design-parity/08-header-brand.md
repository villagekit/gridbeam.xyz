# 08 — Uplift: Header brand (cross-cutting)

**Status:** TODO

## Why

Legacy header had a cube logo + "Grid Kit" wordmark — a visual brand mark visible on every page. Current header is just plain text "gridbeam.xyz" — no glyph, no typographic distinction. Reads as a URL, not a brand. Applies to every page.

## Concrete regressions

From every audit screenshot at the top of the page (e.g. `audit/_root/1280/{legacy,current}.png`):

### Visual
- ⚠️ Lost: brand mark / logo. Legacy had a small isometric cube glyph beside the wordmark.
- ⚠️ Lost: typographic warmth of the "Grid Kit" wordmark. "gridbeam.xyz" is the domain rendered as plain text — functional but cold.

### Interaction, Accessibility, Copy, Code
Header behaviour (sticky, hamburger menu on mobile) is fine on both. The link to home from the brand is present on both.

## Recommended mode

**Restore (or re-think) the brand mark.** Two paths, **both should be discussed with the user before implementation:**

1. **Build a new gridbeam.xyz mark.** A small geometric glyph that hints at the 40 mm grid (perforated beam in isometric, a 40 mm hole, a tri-joint silhouette). One-time design task; the icon then lives at `app/_components/SiteBrand.tsx` and is reused in favicons, OG images, etc.
2. **Use only the wordmark, but design it.** "**gridbeam**.xyz" with the "gridbeam" in the heading-font weight and ".xyz" in a lighter / smaller / tinted treatment. Gives the URL typographic identity without requiring a glyph.

The legacy cube glyph was specific to "Grid Kit" — it can't be lifted directly because the brand is now "gridbeam.xyz", not "Grid Kit". This is genuinely a new design problem, not a "restore the legacy" one.

## Steps

- [ ] Discuss with the user which path (mark + wordmark, or wordmark-only) to take. Don't proceed without confirmation — brand is editorial.
- [ ] If glyph: design and produce the SVG; add to `app/_components/SiteBrand.tsx`; export as a primary brand asset (favicon, OG image, possibly nav).
- [ ] If wordmark-only: rework `SiteBrand.tsx` to render "**gridbeam**.xyz" with weight/colour treatment. Both halves should share a common base typography but be visually distinguishable.
- [ ] Update `app/icon.svg` and `app/apple-icon.png` to reflect the new mark (currently they're placeholders).
- [ ] Update `app/opengraph-image.tsx` and `app/twitter-image.tsx` to include the new mark.
- [ ] Verify at 375 / 768 / 1280 — brand should remain legible on mobile.

## Notes
- This is a brand decision and should not be made unilaterally by an implementor. Always confirm the direction with Mikey first.
- The Grid Kit cube glyph from the legacy site is an asset of the closed startup; it shouldn't be re-used unmodified for gridbeam.xyz even though the open-source repo contains it.
- The header colour (`headerColorPalette="accentB"` in `app/layout.tsx`) gives the cream/yellow background — that can stay; this task is about the content of the brand, not the chrome around it.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/_components/SiteBrand.tsx`, `app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`
- Legacy reference (for the cube glyph used for "Grid Kit"): `node-modules/apps/gridkit/public/` (not for direct re-use; reference only)
