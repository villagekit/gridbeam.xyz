---
title: footerSections moved to nav.ts; FooterSections tuple to array
status: upstream
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

- 2026-09-26: The site half is done by the site footer slice (plan [[5e4529a6aeac]]): footerSections lives beside SiteFooter in app/_components/SiteFooter.tsx as legacy's footer.tsx had it, and app/_lib/nav.ts keeps navItems only. The item stays regression for the FooterSections tuple type, which the ui brand footer slice [[1977c9af920c]] owns.

- 2026-09-26: Fixed in ../ui by the ui brand footer slice [[1977c9af920c]], commit ae593d0: src/components/layouts/Footer.tsx exports FooterSections as a tuple again. It is a 4-tuple where legacy's was a 3-tuple, since decision 9f344fbfde9a sanctions four sections; the site's footerSections type-checks against it. Waits on the operator's publish.
