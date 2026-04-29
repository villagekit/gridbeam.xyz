# 04 — Fold in `ui-nav` (header, side nav, mobile menu)

**Status:** TODO

## Why
The legacy `node-modules/packages/ui-nav/` has the responsive nav system (NavHeader, NavBar, NavList, NavSide, NavMobileMenu, plus the context hooks). The new website needs it; the current `./ui` only has a single `NavLink`.

## What
The full responsive nav suite lives in `./ui/src/components/nav/` (or similar), exported from `src/index.ts`, ported to Chakra v3 + React 19. Story coverage for each.

## Steps
- [ ] Copy components from `node-modules/packages/ui-nav/src/` into `./ui/src/components/nav/`.
- [ ] Convert any class-name-based active-link logic to use Next.js's `usePathname` (app router). The legacy version probably uses `next/router` (pages router).
- [ ] Replace `constate` (legacy) with React's built-in context API — one fewer dependency to ship.
- [ ] Update imports for Chakra v3.
- [ ] Replace `react-icons` usage if Chakra v3 has its own icon system in flux. (`react-icons` is fine; just confirm.)
- [ ] `react-focus-on` for the mobile menu — keep; it's the right primitive for focus trap.
- [ ] Stories: `NavHeader.stories.tsx`, `NavBar.stories.tsx`, `NavList.stories.tsx`, `NavSide.stories.tsx`, `NavMobileMenu.stories.tsx`.
- [ ] Document the data shape that consumers feed in (nav links, brand slot, etc).
- [ ] Add to `src/index.ts` exports.

## Notes
- `constate ^3.3.2` was used to share nav state between header and mobile menu. React Context + a custom hook is enough.
- The existing `NavLink` component in `./ui/src/components/NavLink.tsx` should be unified with the nav suite — probably becomes the link primitive used inside `NavList`.

## Depends on
- [./02-chakra-v3-migration.md](./02-chakra-v3-migration.md)
