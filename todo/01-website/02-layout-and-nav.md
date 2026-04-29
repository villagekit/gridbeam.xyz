# 02 — Root layout, header, footer, mobile nav

**Status:** DONE

## Why
Every page on the site needs the same shell: site header with logo and nav, footer with links and credits, responsive mobile menu. Building this once correctly saves time on every later page.

## What
`app/layout.tsx` renders the site shell via `MainLayout` from `@villagekit/ui` (folded in by Stream 02 tasks 03+04), with full SEO metadata, viewport, theme-color, and a skip-to-main-content link.

## Steps
- [x] Defined nav: About, Designs, Stories, Suppliers, Tools, Contact (all top-location). Lives in `app/_lib/nav.ts`.
- [x] `SiteBrand` (the brand slot) — links to `/`, renders "gridbeam.xyz" in the heading font.
- [x] `SiteHeaderAction` — a "Subscribe" `LinkButton` to `/subscribe`.
- [x] `SiteFooter` — uses `@villagekit/ui`'s parameterised `<Footer>` with four sections: Learn, Browse, Connect, Legal. Tagline as the children slot.
- [x] Mobile menu — `NavMobileMenu` (Drawer-based) is rendered inside `NavHeader`. Includes an explicit close X button in the drawer body, plus backdrop and ESC dismissal (Drawer defaults).
- [x] Logo asset — text-only "gridbeam.xyz" as placeholder; SVG/PNG follow-up under Stream 04.
- [x] SEO metadata via `export const metadata` (Next.js metadata API): title template `"%s — gridbeam.xyz"`, description, OpenGraph (site, type=website, locale=en, URL), Twitter (summary_large_image), robots index+follow, applicationName.
- [x] Viewport via `export const viewport`: `width=device-width, initialScale=1, themeColor=#fffbea`.
- [x] Responsive breakpoints from the lib match legacy (`base`, `md`, `lg`). `NavBar` hides at `base`, shows at `md`+. Mobile drawer is the inverse.
- [x] `SkipNavLink` rendered before `MainLayout` in `app/layout.tsx`; `SkipNavContent` marks the home page's main element.
- [x] Verified via `pnpm dev` + curl: HTTP 200, all expected nav/footer links present, metadata in `<head>` correct, header/footer/skip-nav in DOM, no console errors. `pnpm -w run build` and `pnpm -w run typecheck` both clean.

## Notes
- **`MainLayout` over a hand-rolled column flex.** `app/layout.tsx` uses the `MainLayout` component from `@villagekit/ui`, passing `HeaderBrand`/`HeaderAction`/`Footer` as slots. This exercises the lib's API on real ground.
- **Source-import workspace pattern.** The website resolves `@villagekit/ui` to `./ui/src/index.ts` directly via the `exports` field — no `dist/` build needed for dev.
- **No cookie banner.** No analytics → no consent flow needed. Re-evaluate if/when Plausible or similar lands.
- **Drawer-based mobile menu.** Replaces the legacy `<Slide>` + `react-focus-on` with Chakra v3's `Drawer.*` (Ark UI dialog). Built-in focus trap, ESC key, aria-modal, backdrop dismissal. Has an explicit close X inside the drawer body so users can dismiss without finding the (now backdrop-covered) hamburger.
- **`AnchorHeading` scroll offset.** The lib's `AnchorHeading` uses `topNavHeight` directly as `scrollMarginTop` — anchor links land just below the sticky nav.

## Follow-ups
- **Logo asset** — currently text-only. Stream 04 (content) will provide the gridbeam.xyz SVG/raster logo.
- **Favicon** — Next 15 logs a 404 for `/favicon.ico` on every dev request. Add when Stream 04 provides one.
- **Visual QA at desktop/tablet/mobile widths** — done via SSR markup inspection, not a real browser. A pre-launch pass (Stream 05 task — TBD) should walk every breakpoint in a real browser.

## Depends on
- [./01-bootstrap-nextjs.md](./01-bootstrap-nextjs.md)
- [../02-ui-library/03-fold-ui-page.md](../02-ui-library/03-fold-ui-page.md)
- [../02-ui-library/04-fold-ui-nav.md](../02-ui-library/04-fold-ui-nav.md)
