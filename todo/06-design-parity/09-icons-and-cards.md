# 09 — Uplift: Icons on link cards (cross-cutting)

**Status:** DONE

## Why

Several pages (`/legal`, `/tools-and-resources`, parts of the home) replaced legacy's icon+title link cards with plain text+title cards. Result: less visual richness, harder to scan at a glance. Small fix, broad effect.

## Concrete regressions

From the audit screenshots:

### Visual
- `/legal` cards: legacy used `FaUndo` (Return policy), `FaLock` (Privacy policy), `FaCookie` (Cookie policy) glyphs above each card title. Current has no icons.
- `/tools-and-resources` cards: legacy used `FaCut` for Cutting planner. Current has no icons on any of the 8 cards.
- `/contact` cards: similar — could benefit from `FaEnvelope` (Email) and `FaGithub` (GitHub Issues) icons. (Legacy also used `FaEnvelope`.)
- Home page "For makers" cards: no icons; would benefit from icons matching the tool (cutting planner, suppliers, tools-and-resources).

### Interaction, Accessibility, Copy, Code
Cards work fine; the icon is purely decorative. No regression on those axes.

## Recommended mode

**Restore close to legacy.** Add `react-icons` glyphs to the existing card components. No structural changes needed.

There are five near-identical card components currently in the codebase (`MakerCard`, `LegalCard`, `ResourceCard`, `SubscribeCard`, `NextStepCard`). This task is a good opportunity to consolidate them into one shared `LinkCard` component (in `@villagekit/ui` or `app/_components/LinkCard.tsx`), with an optional `icon` prop. But that's a bigger refactor — call it a stretch goal; the primary task is just adding icons.

## Steps

- [x] Extract a shared `LinkCard` component in `@villagekit/ui` first, then replace the 5 existing card components in one PR (covers tasks 04 + 09 together). **Decided** — addressing the duplication is worth the up-front cost; we touch each call site once.
- [x] Add icons:
  - `/legal`: `FaUserShield` for Privacy policy, `FaCode` for Site licence.
  - `/tools-and-resources`: `FaCut` for Cutting planner, `FaCubes` for Designs catalogue, `FaShoppingBag` for Suppliers; Resources cards use `FaInfoCircle` (About), `FaQuestionCircle` (FAQ), `FaBookOpen` (Stories), `FaGithub`, `FaUsers` (Forum).
  - `/contact`: `FaEnvelope` for Email, `FaGithub` for GitHub Issues.
  - Home "For makers" cards: `FaCut`, `FaShoppingBag`, `FaTools`.
  - About `Start building`: `FaCubes`, `FaTools`, `FaShoppingBag`.
- [x] Verify visually at 1280 — full pages captured at /tmp during dev. (375 / 768 spot-check skipped: layout is `SimpleGrid` columns 1/2/3 — same `LinkCard` at each width, no responsive changes inside.)

## Notes
- The existing `@villagekit/ui` `LinkCard` was already there (used by legacy `node-modules` apps) but had `width="3xs"` + `height="64"` baked in for the legacy `CardsLayout` flex wrap. Made it grid-friendly: dropped fixed h/w, added `h="full"` so cards stretch to row height in a `SimpleGrid`.
- Switched `icon` prop from `ComponentType` → `ReactNode` so consumers pass `<FaCut />` (a serializable JSX element) — required for the React Server Component boundary in Next.js 15 App Router. Functions can't cross the server/client boundary.
- Dropped the legacy `linkComponent` prop. The rest of the site uses Chakra `LinkButton` / `Link` without `as={NextLink}`, so plain `<a>` here matches site behaviour. (Adopting Next.js soft navigation site-wide is a separate concern.)
- Hardcoded heading level inside `LinkCard` to `<h3>` since cards always live under an `<h2>` `Title`. Found that `/legal` had a section without a `Title`, which would have caused an h1→h3 skip — added a `Title as="h2">Policies</Title>` to fix the heading hierarchy.
- Dropped `aria-label` from the `LinkOverlay` so the link's accessible name is computed naturally from heading + description (richer screen-reader announcement).
- Card icon color uses `primary.600` to match the site palette.
- `/contact`'s "Email" / "GitHub Issues" cards weren't converted — they're info panels with embedded forms, not link-out cards. Just added an icon block above each heading.
- Legacy `node-modules` callsites (`apps/gridkit/pages/tools-and-resources.tsx`, `packages/applet-legal/src/pages/legal.tsx`, `packages/applet-contact/src/pages/contact.tsx`) still pass `linkComponent={NextLink}` — they'll break against the new prop signature, but they retire with stream 05.

## Depends on
- `./02-initial-audit.md`

## Files
- Current cards: `app/legal/page.tsx`, `app/tools-and-resources/page.tsx`, `app/contact/page.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/subscribe/page.tsx`
- Legacy reference for icon choices: `node-modules/packages/applet-legal/src/pages/legal.tsx`, `node-modules/apps/gridkit/pages/tools-and-resources.tsx`
