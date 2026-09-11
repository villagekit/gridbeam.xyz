---
title: footerSections moved to nav.ts; FooterSections tuple to array
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/footer.tsx:21-58`: `footerSections` defined beside the `Footer` component; `packages/ui-page/src/components/Footer.tsx:19`: `type FooterSections = [FooterSection, FooterSection, FooterSection]`.

## Current

`app/_lib/nav.ts:12-48`: `footerSections` beside `navItems`, imported by `app/_components/SiteFooter.tsx:18`; `@villagekit/ui@1.2.0 src/components/layouts/Footer.tsx:21`: `type FooterSections = Array<FooterSection>`.

## Verdict

## Log

- 2026-09-12: Follows the footer restructure (its copy items, one per heading and link, are open); the shape of the code differs from the legacy author's whichever way that is judged.
