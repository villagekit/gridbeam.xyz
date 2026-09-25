---
title: "Footer: ui-brand Footer and Social replaced by a site-local SiteFooter"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Footer.tsx:21-65`: a brand `Footer` that adds `<Social socialLinks />` and a `FooterSlogan` (`Created with ♥ by Village Kit`, `© year`) around `ui-page`'s `Footer`; `packages/ui-brand/src/components/Social.tsx:1-83`: the generic social row; `apps/gridkit/components/footer.tsx:123-129`: the site passes `socialLinks`, `sections` and `<LogoGl />`.

## Current

`@villagekit/ui@1.2.0 src/components/layouts/Footer.tsx:28-61` renders `sections` and `children` only (no `Social`, no slogan; `ui-brand` was not folded in). `app/_components/SiteFooter.tsx:20-131` defines its own `SocialLinkDescriptor`, `SocialIconLink` and the slogan inline.

## Verdict

## Log

- 2026-09-26: Fixed in ../ui by the ui brand footer slice [[1977c9af920c]], commit ae593d0: src/components/layouts/Footer.tsx is the brand footer (socialLinks, children between the row and the credit, shouldLinkToCompanyWebsite) around a private BaseFooter, and src/components/Social.tsx is legacy's Social with SocialLinkDescriptor exported. Waits on the operator's publish; the bump plan [[99f2fe62c62f]] thins app/_components/SiteFooter.tsx to legacy's footer.tsx shape.
