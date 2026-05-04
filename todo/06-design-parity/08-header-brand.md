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

**Restore the legacy cube glyph; update the wordmark to "Grid Beam".** **Decided by Mikey** — re-use the same isometric cube mark from gridkit.nz, paired with a new "Grid Beam" wordmark in place of "Grid Kit". The cube glyph stays; only the text changes.

## Steps

- [ ] Locate the cube SVG in the legacy assets (`node-modules/apps/gridkit/public/` or the `ui-brand` package) and port it to `app/_components/SiteBrand.tsx`. Cite source SHA per the [CLAUDE.md "Citing copied code" convention](../../CLAUDE.md#conventions).
- [ ] Render the wordmark as "Grid Beam" beside the cube. Match the legacy typography (weight, kerning, vertical alignment).
- [ ] Update `app/icon.svg` and `app/apple-icon.png` to use the cube glyph (currently placeholders).
- [ ] Update `app/opengraph-image.tsx` and `app/twitter-image.tsx` so the OG/Twitter cards include the cube + "Grid Beam" wordmark.
- [ ] Verify at 375 / 768 / 1280 — brand should remain legible on mobile.

## Notes
- The cube was originally Grid Kit's brand asset. Mikey (the same founder) is choosing to carry it forward to Grid Beam; that's their call.
- The header colour (`headerColorPalette="accentB"` in `app/layout.tsx`) gives the cream/yellow background — that can stay; this task is about the content of the brand, not the chrome around it.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/_components/SiteBrand.tsx`, `app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`
- Legacy reference (for the cube glyph used for "Grid Kit"): `node-modules/apps/gridkit/public/` (not for direct re-use; reference only)
