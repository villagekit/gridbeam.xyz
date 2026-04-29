# 04 — Fold in `ui-nav` (header, side nav, mobile menu)

**Status:** DONE (storybook stories deferred — see follow-ups)

## Why
The legacy `node-modules/packages/ui-nav/` has the responsive nav system (NavHeader, NavBar, NavList, NavSide, NavMobileMenu, plus the context hooks). The new website needs it; the current `./ui` only has a single `NavLink`.

## What
The full responsive nav suite lives in `./ui/src/components/nav/`, exported via `./ui/src/index.ts`. Ported to Chakra v3 + React 19. The mobile menu now rides on Chakra v3's `Drawer` (Ark UI dialog) — no more `react-focus-on` runtime dep, no more `Slide`-with-manual-focus-trap pattern.

## Steps
- [x] Copied components to `./ui/src/components/nav/`. Files: `NavHeader`, `NavBar`, `NavList`, `NavSide`, `NavMobileMenu`, plus `context.tsx`, `hooks.ts`, `types.ts`.
- [x] Replaced `useRouter().pathname` with `usePathname` from `next/navigation` (app router). The legacy required consumers to pass `usePathname` through context — this version imports it directly. Cleaner.
- [x] Replaced `constate` with plain React `createContext` + `useContext`. One fewer dependency to ship.
- [x] **Mobile menu rewrite:** `<Slide>` (gone in v3) → `<Drawer.Root placement="start" size="xs">`. Drawer (Ark UI under the hood) handles focus trap, ESC dismissal, aria-modal, and backdrop natively, so we deleted the `react-focus-on` wrapper, the `handleActivation` callback, and the manual `getDisclosureProps`/`getButtonProps` plumbing (those don't exist in v3's `useDisclosure` anyway).
- [x] `useDisclosure` v3 returns `{ open, onOpen, onClose, onToggle, setOpen }` — no `isOpen`, no `getDisclosureProps`. Updated all callsites.
- [x] `colorScheme` prop → `colorPalette` prop. Backgrounds and borders now reference `colorPalette.50`/`colorPalette.200` tokens, not `useTheme().colors[scheme][shade]` index reads.
- [x] `react-icons` retained for `FaBars`/`FaTimes` (already a dep of `./ui`). Wrapped in Chakra v3's `<Icon>`.
- [x] Added `next` as a peer dep on `./ui/package.json` (the lib now imports from `next/link` and `next/navigation`).
- [x] All components carry `'use client'` directives (they use hooks/context).
- [x] Exports added to `./ui/src/index.ts` via `export * from './components/nav'`.
- [x] `tsc --noEmit` clean from the website root.
- [x] `biome check .` clean inside `./ui`.
- [ ] Storybook stories deferred — see follow-ups.

## Notes
- **Drawer over Slide+FocusOn:** Chakra v3 ships full-featured `Drawer.*` components built on Ark UI's accessible dialog primitive. This replaces the v2 pattern of `<Slide>` + `react-focus-on` + manual ESC handling. Less code, better a11y, no extra runtime dep.
- **`usePathname` baked in:** previously consumers had to provide a `usePathname` function via context (so the lib could support both pages-router and app-router). Now the lib hard-imports `usePathname` from `next/navigation`. App-router only. Consumers who don't have an app-router setup can still consume nav by patching the import — but that's out of scope for this site.
- **Drawer placement:** uses `placement="start"`, equivalent to v2's `<Slide direction="left">` (start = left in LTR; auto-flips for RTL).
- **`useTopNavHeight` lives in nav/hooks.ts**, not in the global `./ui/src/hooks/`. It's tightly coupled to the `.top-nav` className that `NavHeader` sets, so co-locating makes sense.
- The existing root-level `NavLink` component (`./ui/src/components/NavLink.tsx`) is consumed by `NavList`/`NavBar` — already unified.

## Follow-ups
- **Storybook stories** for `NavHeader`, `NavBar`, `NavList`, `NavSide`, `NavMobileMenu`. Deferred — the website's `<SiteHeader>` consumes these in real layout, which is the more useful test surface short-term. Stories need full lockfile install + visual review.
- **`react-focus-on` removal**: the package `react-focus-on` was a transitive dep through the legacy ui-nav. With Drawer doing the focus-trap work, we can drop it. Currently no longer imported anywhere in `./ui`.
- **MobileAction prop on NavMobileMenu**: the legacy header conditionally rendered a `MobileAction` *inside* the header bar (next to the menu icon) when the drawer was closed. Kept that. The component still accepts the old `MobileAction` prop on `NavHeader`, but the implementation may want a once-over from a designer.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
