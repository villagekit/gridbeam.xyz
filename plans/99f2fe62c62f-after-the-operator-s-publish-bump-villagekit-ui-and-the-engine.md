---
title: "After the operator's publish: bump @villagekit/ui and the engine packages, close the upstream items"
status: todo
tags:
  - attended
blocked_by:
  - 1c74a465996d
  - 1977c9af920c
---
Every difference fixed in `../ui` or `../gridkit` during M2 waits here in `upstream`, since the publishes are deferred to the end of the milestone (decision `28c1a536`). This plan is the operator's until the packages are on npm; then it bumps the site and turns every `upstream` item into `fixed`, or back into `regression` where the publish did not carry the fix.

wants: the operator's publish of `@villagekit/ui` and of every `@villagekit/*` engine package a `blocked_by` slice below changed, to npm.

## Work

- `pnpm update @villagekit/ui --latest` and the same for each engine package the blocking slices changed; commit `package.json` and `pnpm-lock.yaml`.
- The gate, then `pnpm audit:pages` and `pnpm audit:dom` over every route with an `upstream` item; look at the pairs.
- For each `upstream` item (`kipu list --collection difference --status upstream --json`): `kipu fix <id> --outcome "plan <this prefix>"` when the pairs show it closed, else `kipu move <id> regression --from upstream` with a note saying what the pairs still show, and a new slice under the item's route record for it.
- The parity gate `f7a700a3e482` is `blocked_by` this plan; it becomes ready when this finishes.

## Seams under test

None.

## Done when

- `kipu list --collection difference --status upstream` is empty, checked after the moves
- `package.json` pins the published versions and `pnpm-lock.yaml` matches
- `timeout 900 just check` is green

## Log

- 2026-09-25: From the shell split (plan a78b167170b8): the shell's ui slices move the package's API toward the legacy shape (the nav provider taking `usePathname` and a link component, `Footer` taking `socialLinks`, `Provider` taking a `system`, `LinkCard`'s `icon` as a component type, the tuple `FooterSections`, the media components defaulting to legacy's cloud name). Each such slice writes a note here naming the site edits (file, prop, value) this plan's bump commit makes before its gate, since a bump is the commit that adapts to what it buys; the site's video components moving onto the ui `Video` (`b397b0deb1cc`) and `SiteFooter` becoming legacy's thin `footer.tsx` (`ca69d5d2e67c`) are among them.

- 2026-09-26: From the ui framework boundary slice (plan 1c74a465996d, ui commit 4e11d57): the site edits this bump makes, verified by a probe against the sibling on 2026-09-26. (1) New file `app/_components/SiteNav.tsx`, a `'use client'` component: imports `NavContextProvider` and `type NavItemDescriptors` from `@villagekit/ui`, `NextLink` from `next/link`, `usePathname` from `next/navigation`; renders `<NavContextProvider items={items} usePathname={usePathname} linkComponent={NextLink}>{children}</NavContextProvider>` with props `{ items: NavItemDescriptors; children: ReactNode }`. A client wrapper is needed because `app/layout.tsx` is a server component and a hook or a component cannot cross to a client component as a prop. (2) `app/layout.tsx`: drop `NavContextProvider` from the `@villagekit/ui` import, import `SiteNav` from `./_components/SiteNav`, and replace `<NavContextProvider items={navItems}>` and its closing tag with `<SiteNav items={navItems}>` and `</SiteNav>`. With these two edits the nav, the footer's internal links, MDX prose links on story pages and every `LinkCard` route through `NextLink`, and the current route's nav item is selected, as at 1.2.0. Without them the bump ships plain anchors and no selected item. No other call site changes: `as={NextLink}` on `Link`, `LinkButton` and `LinkIconButton`, and `linkComponent={NextLink}` on `LinkCard`, keep working and may stay. The site does not render the ui `Image`, so `MediaProvider`'s new `imageComponent` needs no edit here; the mdx and media slice `bc0407533650` says whether its site half adds `<MediaProvider imageComponent={NextImage}>`.

- 2026-09-26: From the ui brand footer slice (plan 1977c9af920c, ui commit ae593d0): the site edit this bump makes, verified by a probe against the sibling on 2026-09-26 (the thin file is exactly legacy's apps/gridkit/components/footer.tsx shape). app/_components/SiteFooter.tsx: keep the file-top citation of footer.tsx only, the 'use client' directive, the dynamic ssr:false LogoGl import, footerSections and socialLinks as they are; change the import to `import { Footer, type FooterSections, type SocialLinkDescriptor } from '@villagekit/ui'` (dropping Container, HStack, Icon, IconProps, Link, LinkProps, StackProps, Text, VStack, NextLink, React and FaHeart); render `<Footer socialLinks={socialLinks} sections={footerSections}><LogoGl size="12" /></Footer>`; delete the site-local SocialLinkDescriptor, Social, SocialLink and FooterSlogan (the package's Social and credit replace them, with the two sanctioned aria-labels of 6c0e17bf75ca). FooterSections is a 4-tuple in the package, and the site's four sections type-check against it. The footer's internal links and the envelope go through the framework link component the SiteNav wrapper of the boundary note supplies; without it they render as plain anchors. Nothing else in the file changes; the icons and hrefs stay.
