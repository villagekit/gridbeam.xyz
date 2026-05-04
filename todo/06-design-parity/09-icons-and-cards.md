# 09 — Uplift: Icons on link cards (cross-cutting)

**Status:** TODO

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

- [ ] Decide whether to extract a shared `LinkCard` component or just add an `icon` prop to each existing component. Lean toward extraction — five copies of the same card is the bigger code smell. If extraction, do it before adding icons so we only touch each call-site once.
- [ ] Add icons:
  - `/legal`: `FaUserShield` for Privacy policy, `FaCode` for Site licence (or similar — pick fitting glyphs from `react-icons/fa`).
  - `/tools-and-resources`: `FaCut` for Cutting planner, `FaCubes` for Designs catalogue, `FaShoppingBag` for Suppliers; plus glyphs for the Resources cards (About: `FaInfoCircle`, FAQ: `FaQuestionCircle`, Stories: `FaBookOpen`, GitHub: `FaGithub`, Forum: `FaUsers`).
  - `/contact`: `FaEnvelope` for Email, `FaGithub` for GitHub Issues.
  - Home "For makers" cards: same glyphs as on `/tools-and-resources`.
- [ ] Verify visually at 375 / 768 / 1280 — icons shouldn't break on small screens.

## Notes
- This is a small touchup. Could ship as one PR covering all four pages.
- Card icon size: legacy used `boxSize="6"` (24 px); a similar size works in the new design system.
- The `react-icons/fa` glyphs should already be available — used elsewhere in the codebase.

## Depends on
- `./02-initial-audit.md`

## Files
- Current cards: `app/legal/page.tsx`, `app/tools-and-resources/page.tsx`, `app/contact/page.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/subscribe/page.tsx`
- Legacy reference for icon choices: `node-modules/packages/applet-legal/src/pages/legal.tsx`, `node-modules/apps/gridkit/pages/tools-and-resources.tsx`
