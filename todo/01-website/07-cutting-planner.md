# 07 — Cutting planner tool

**Status:** TODO

## Why
The cutting planner is one of the most useful things on the legacy site — you give it a list of cuts you need and the stock lengths you have, and it tells you how to cut to minimise waste. Self-contained and immediately useful.

## What
- `app/tools/cutting-planner/page.tsx` — port of the legacy `applet-cutting-planner` as a standalone tool

## Steps
- [ ] Read `node-modules/packages/applet-cutting-planner/` to understand the existing applet's surface (form, algorithm, output rendering).
- [ ] Decide: lift the applet's code into the website (`app/tools/cutting-planner/`) or keep it in `node-modules` as a workspace dep. Recommend lifting in — frees us from `node-modules` and the applet has no other consumers worth preserving.
- [ ] If lifting: extract the cutting algorithm into a pure function (probably already is), put it in `app/tools/cutting-planner/algorithm.ts`. Build the React UI in `page.tsx` using `@villagekit/ui` form components.
- [ ] URL-shareable state — encode inputs into query params so users can share a link to a planned cut.
- [ ] "Print plan" button — print-friendly CSS view of the cut layout.

## Notes
- The legacy `applet-cutting-planner` package is also embedded in the designs detail page (Stream 01 task 06). Make sure the lifted version is reusable as a component, not just a route.
- Inputs: stock lengths (e.g. 2400mm, 1200mm), required cuts (e.g. 4× 800mm, 6× 400mm). Output: visual + textual plan, total waste.
- This page should be linkable from /tools-and-resources and from individual /designs/[id] pages.

## Depends on
- [./02-layout-and-nav.md](./02-layout-and-nav.md)
- [../02-ui-library/02-chakra-v3-migration.md](../02-ui-library/02-chakra-v3-migration.md) — for form components in v3
