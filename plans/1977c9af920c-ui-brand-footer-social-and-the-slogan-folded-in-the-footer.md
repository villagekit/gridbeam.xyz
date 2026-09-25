---
title: "ui brand footer: Social and the slogan folded in, the footer columns centred with no gap"
status: todo
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by:
  - 1c74a465996d
  - 63e9c753ca55
  - 5e4529a6aeac
  - f8c93eaf4922
  - target: 93ef1234208c
    strength: soft
tags:
  - "worker:fable"
priority: medium
---
`@villagekit/ui`'s `Footer` takes `socialLinks` and renders legacy `ui-brand`'s `Social` row and `Created with ♥ by Village Kit` slogan around `ui-page`'s columns, which are centred with no gap from `md` as legacy's were, and its sections type is the fixed-arity tuple; the site's `SiteFooter` becomes legacy's thin `footer.tsx` at the bump. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `ad5363e4`, `9f344fbfde9a`, `28c1a536`.

## Work

- Legacy source: `../node-modules/packages/ui-brand/src/components/{Footer,Social}.tsx`, `packages/ui-page/src/components/Footer.tsx` and `apps/gridkit/components/footer.tsx` at `fce357d`. Current: `../ui/src/components/layouts/Footer.tsx`, `stories/Footer.stories.tsx`; `app/_components/SiteFooter.tsx` holds the site footer slice's port of the same styles, which this replaces at the bump.
- `ca69d5d2e67c`: `Social` (`SocialLinkDescriptor` with `Icon: ComponentType`, the spread row, the icon carrying the name) and the slogan (`FooterSlogan`, `shouldLinkToCompanyWebsite`) ported into the package around the base `Footer` as `ui-brand`'s `Footer` wrapped `ui-page`'s: one exported `Footer` taking `socialLinks: Array<SocialLinkDescriptor> | null` with `children` between the row and the slogan, or the base and the brand footers as two exports as legacy had two packages; the worker's call, stated in the Outcome. Links go through the framework boundary slice's mechanism.
- `5be1bc658e85`, `999d0ec5a399`: the row's gap `{ base: 8, md: 0 }` and no `alignItems: flex-start` on the row or the columns, so headings and links centre under each other.
- `0cdb6015b497`: `FooterSections` a tuple again; the four sanctioned sections (`9f344fbfde9a`) make it a 4-tuple where legacy's was 3: say so in the Outcome and on the item. The site half (the sections beside the footer component) landed in the site footer slice.
- `fb033121d164`: with the override and the site's nav, brand and footer slices shipped (this slice is `blocked_by` them), capture at 768 (`pnpm audit:pages`): if the shell fits, the item closes with the others; if the four columns at `minWidth: 3xs` still overflow (4 x 224 px exceeds 768), make the smallest change to the ui `Footer` that fits four columns at 768 (a wrap at `md`, a later breakpoint for the row, a smaller minimum), file it as a new `difference` on `shell` (`visual`, `changed`, `open`: an agent never sanctions its own deviation) citing decision `9f344fbfde9a` as the cause, move `fb033121d164` to `upstream` with a note naming the new item, and say in the Outcome that the record's exit demo waits on the operator's verdict of that one item.
- Sibling steps (decision `28c1a536`): the change lands in `../ui` (`src/...`, and `stories/` where a story renders the component), verified there by `pnpm lint`, `pnpm types` and `pnpm build:pkg`, committed there by pathspec (`git -C ../ui add <paths>` then `git -C ../ui commit -- <paths>`, the message citing the legacy source by its SHA-pinned URL where code is ported) and not pushed; seen on this site through an uncommitted override (`pnpm.overrides` `"@villagekit/ui": "link:../ui"` in `package.json`, then `pnpm install`; the sibling's top-level `exports` point at `src/`, so no build is needed for the override), reverted by path before the commit here (`git restore -- package.json pnpm-lock.yaml`, then `pnpm install --frozen-lockfile`) so the commit never carries it; each item this slice closes moves to `upstream` (`kipu move <id> upstream --from regression`) with a note citing the sibling commit; then `kipu relate 99f2fe62c62f blocked_by <this slice>`. The package version stays: the publish is the operator's.
- Bump note: `kipu note 99f2fe62c62f` with the site edit the bump makes: `app/_components/SiteFooter.tsx` to legacy's `footer.tsx` shape (`socialLinks`, `footerSections`, `<LogoGl size="12" />` as children) and nothing else in it.
- Closes (to `upstream`) `ca69d5d2e67c`, `0cdb6015b497`, `5be1bc658e85`, `999d0ec5a399`, and `fb033121d164` if the 768 capture closes it.
- Not this slice: the social row's data and the credit block on the site (the site footer slice); the cube (its site slice).

## Seams under test

None pure.

## Done when

- with the override in place and the site's `SiteFooter` rewritten locally to the thin shape for the check (reverted with the override): `audit/_root/1280/current.png` beside `legacy.png` shows the columns centred with no gap between them, the social row spread, the slogan below; `audit/_root/768/current.png` is 768 px wide; the override then reverted and `git status --porcelain` clean of the probe
- in `../ui`: `pnpm lint`, `pnpm types`, `pnpm build:pkg` and `pnpm build:storybook` are green and the commit there is by pathspec, its hash in each item's note
- the five items are `upstream` (with the new `open` item filed if the four columns needed a change), `99f2fe62c62f` is `blocked_by` this slice and carries the bump note, checked after the moves
- `timeout 900 just check` is green on this site, without the override

## Outcome

## Log

- 2026-09-26: From the framework boundary slice (plan 1c74a465996d, ui commit 4e11d57): the mechanism to follow is the framework context in ../ui/src/framework.tsx, filled by NavContextProvider({ items, usePathname?, linkComponent? }) and read through useFramework() by every composite that renders its own anchors; the leaf link components keep the explicit `as`. The override that shows a sibling change on this site is pnpm.overrides["@villagekit/ui"] = "file:../ui" (link: fails under next dev --turbopack), with pnpm install after each sibling edit, reverted by `git restore -- package.json pnpm-lock.yaml` and `pnpm install --frozen-lockfile` before the commit.
