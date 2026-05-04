# 08 — Uplift: Header brand (cross-cutting)

**Status:** DONE

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

- [x] Ported the cube SVG to `app/_components/CubeLogo.tsx` as a pure JSX React component, citing the legacy source pinned to SHA `fce357d`. Inlined (vs SVGR import) so the same component can be re-used by `app/opengraph-image.tsx` (which runs through Satori's edge runtime and can't use SVGR's webpack loader).
- [x] `SiteBrand.tsx` now renders cube + "Grid Beam" wordmark via `<HStack><CubeLogo /><Heading size="xl">Grid Beam</Heading></HStack>` — flat sizes matching legacy (`size="10"` cube, `size="xl"` wordmark).
- [x] `app/icon.svg` and `app/apple-icon.png` already had the cube glyph — verified visually, no change needed.
- [x] `app/opengraph-image.tsx` updated to import the shared `CubeLogo` and render "Grid Beam" wordmark at fontSize 120 (was "gridbeam.xyz" at 96). `app/twitter-image.tsx` re-exports the OG image — no change needed.
- [x] Verified at 375 / 768 / 1280 (snapshots in `/tmp/header-shots/`). 1280 and 375 render cleanly. 768 shows the brand correctly but the nav crops the last item ("Contact") — pre-existing nav-pressure issue from having 6 top-nav items vs legacy's 3, **not** a brand-task concern.

## Notes
- The cube was originally Grid Kit's brand asset. Mikey (the same founder) is choosing to carry it forward to Grid Beam; that's their call.
- The header colour (`headerColorPalette="accentB"` in `app/layout.tsx`) gives the cream/yellow background — that can stay; this task is about the content of the brand, not the chrome around it.
- `CubeLogo` accepts `ariaLabel: string | null`. When `null` (decorative), the SVG renders with `aria-hidden="true"` — the surrounding `Link`'s text "Grid Beam" provides the accessible name. When a string is passed, the SVG renders with `role="img" aria-label={…}` for standalone use.
- The cube SVG inline in `CubeLogo.tsx` carries a `biome-ignore lint/a11y/noSvgWithoutTitle` for the decorative case; the rule doesn't recognise `aria-hidden` as a valid alternative to `<title>`.
- Brand `pr={{ base: 0, md: 4 }}` adds 16px right padding from md+ so "Grid Beam" doesn't visually run into the first nav item ("About") at 768. At base (mobile) the brand is centred, so no padding needed.
- Follow-up (not in scope): at 768 the 6-item top nav overflows its flex region and the last item gets cut off. Either reduce nav items at md, push the hamburger breakpoint to lg, or add horizontal scrolling on the nav. Track separately if needed.

## Depends on
- `./02-initial-audit.md`

## Files
- Current: `app/_components/SiteBrand.tsx`, `app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`
- Legacy reference (for the cube glyph used for "Grid Kit"): `node-modules/apps/gridkit/public/` (not for direct re-use; reference only)
