# 02 — Root layout, header, footer, mobile nav

**Status:** TODO

## Why
Every page on the site needs the same shell: site header with logo and nav, footer with links and credits, responsive mobile menu. Building this once correctly saves time on every later page.

## What
An `app/layout.tsx` that renders the site shell using the layout primitives from `@villagekit/ui` (folded in from legacy `ui-page` and `ui-nav`), with sensible defaults for SEO meta + viewport.

## Steps
- [ ] Define the nav structure. Initial pages (from streams 01 tasks 03–10):
  - About
  - Designs
  - Stories
  - Suppliers
  - Tools (cutting planner)
  - Contact
- [ ] Build a `<SiteHeader>` component that consumes `NavHeader`/`NavBar`/`NavList` from `@villagekit/ui`.
- [ ] Build a `<SiteFooter>` component (do NOT use `@villagekit-private/ui-brand`'s `Footer` — it's hardcoded for Village Kit. Build a plain footer here.)
- [ ] Mobile menu: use the `NavMobileMenu` lifted from `ui-nav` (folded in by Stream 02 task 04).
- [ ] Add the gridbeam.xyz logo asset (placeholder for now if final isn't ready).
- [ ] Set up SEO defaults via Next.js metadata API (title template, Open Graph, Twitter card, favicon).
- [ ] Set up the viewport / theme-color meta.
- [ ] Confirm the responsive breakpoints match what the legacy site used (`base`, `md`, `lg`).
- [ ] Add a "Skip to main content" link for accessibility (Chakra has `SkipNavLink`/`SkipNavContent`).
- [ ] Verify on desktop, tablet, mobile widths.

## Notes
- Reference the legacy app's `_app.tsx` and `pages/_document.tsx` (in `node-modules/apps/gridkit/`) for the existing shell pattern, but rewrite from scratch — it's tangled with cookie banners, Matomo, Sentry that we don't want.
- Don't include a cookie banner — without analytics, we shouldn't need one. Revisit if we add analytics later.

## Depends on
- [./01-bootstrap-nextjs.md](./01-bootstrap-nextjs.md)
- [../02-ui-library/03-fold-ui-page.md](../02-ui-library/03-fold-ui-page.md)
- [../02-ui-library/04-fold-ui-nav.md](../02-ui-library/04-fold-ui-nav.md)
