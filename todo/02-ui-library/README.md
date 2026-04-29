# Stream 02 — UI library (`@villagekit/ui`)

The submodule at `./ui` is already extracted as a public repo (`villagekit/ui`) but is in an inconsistent state: peer-deps say React 19 while runtime depends on Chakra v2 (which targets React 18). It also has only a subset of what gridbeam.xyz needs — page layouts, nav, media components, and MDX overrides still live as separate `node-modules/packages/ui-*` packages.

## Goal

A polished, public, npm-published `@villagekit/ui` on **Chakra v3 + React 19**, with the reusable bits of `ui-page`, `ui-nav`, `ui-media`, and `ui-mdx` folded in. Storybook running, CI in place, CHANGELOG started, ready for the website to consume.

## Tasks

| # | Task | Status |
|---|------|--------|
| 01 | [Resolve React + Chakra version mismatch](./01-version-alignment.md) | DONE |
| 02 | [Migrate to Chakra v3 (theme + multipart components + hooks)](./02-chakra-v3-migration.md) | DONE (storybook smoke deferred) |
| 03 | [Fold in `ui-page` (layout primitives)](./03-fold-ui-page.md) | DONE (storybook stories deferred) |
| 04 | [Fold in `ui-nav` (header, side nav, mobile menu)](./04-fold-ui-nav.md) | DONE (storybook stories deferred) |
| 05 | [Fold in `ui-media` (Image, Video, hooks)](./05-fold-ui-media.md) | TODO |
| 06 | [Fold in `ui-mdx` (MDX component overrides)](./06-fold-ui-mdx.md) | TODO |
| 07 | [Storybook upgrade + Chakra integration](./07-storybook-and-ci.md) | TODO |
| 08 | [Publish to npm with proper CI/CD](./08-publish-npm.md) | TODO |

## Order of attack

01 → 02 are blocking. Once Chakra v3 is in, 03-06 can run in parallel (each is a straightforward port of one ui-* package). 07-08 close out the stream.

## Decisions made

- **Chakra v3** target — locks us out of v2's `extendTheme` and most multipart component APIs.
- **EUPL-1.2** license, already present at `./ui/LICENSE`.
- **`@villagekit` npm scope** retained; package name stays `@villagekit/ui`.
- `ui-brand` and `ui-cookies` are **not** folded in — they're tightly coupled to startup branding and consent flows.
- **Single package** — no splitting into `@villagekit/ui-nav`, etc. One library with deep imports if needed.

## Reference: legacy ui-* packages

| Package | Folded in? | Notes |
|---------|------------|-------|
| `ui` (legacy) | ✓ already extracted | Existing `./ui` is the lift of this. |
| `ui-page` | ✓ task 03 | Generic. MainLayout, ContentLayout, CardsLayout, Section, Row, Column, TableOfContents, headings hooks. |
| `ui-nav` | ✓ task 04 | Generic. NavHeader, NavBar, NavList, NavSide, NavMobileMenu, context. |
| `ui-media` | ✓ task 05 | Image, Video, useImageSizes, useAspectRatio. **Cloudinary URL is hardcoded — abstract it.** |
| `ui-mdx` | ✓ task 06 | MDX component overrides for `a`, `h1-5`, `p`, `ul`, etc. |
| `ui-brand` | ✗ stays in node-modules | Hardcodes Village Kit branding. Reusable `Social` component could be lifted ad hoc later. |
| `ui-cookies` | ✗ stays in node-modules | Tightly coupled to app consent flow. |

## npm name collision: resolved

There's also a `core/ui` package inside `./gridkit/` that publishes as `@villagekit/ui`. Decision: the engine's `core/ui` is being **removed** (Stream 03 task 08), and engine consumers depend on this standalone `@villagekit/ui` instead. After that's done, this library is the sole `@villagekit/ui` on npm.
