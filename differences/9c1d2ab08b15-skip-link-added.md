---
title: Skip link added
status: open
route: shell
axis: accessibility
kind: added
---
## Legacy

No skip link: `@villagekit/ui@0.9.0 src/index.ts:325-327` re-exports `SkipNavLink`/`SkipNavContent` but nothing in `apps/gridkit` or `packages/` renders them; `audit/_root/dom/legacy.aria.yaml` starts at `banner`.

## Current

`app/layout.tsx:71`: `<SkipNavLink>Skip to main content</SkipNavLink>`; routes render `<SkipNavContent />` (e.g. `app/page.tsx:101`). First node of `audit/_root/dom/current.aria.yaml`: `link "Skip to main content"` to `#chakra-skip-nav`.

## Verdict

## Log
