---
title: "Header logo: separate named image to hidden decoration inside the link"
status: regression
route: shell
axis: accessibility
kind: changed
---
## Legacy

`apps/gridkit/components/layouts/main.tsx:83-87`: `<LogoSvg size="10" />` is a sibling of the `NavLink`; `apps/gridkit/components/logo/svg.tsx:15`: `<Content role="img" aria-label="Grid Kit logo" />`. `img "Grid Kit logo"` then `link "Grid Kit"` in `audit/_root/dom/legacy.aria.yaml:3-4`.

## Current

`app/_components/SiteBrand.tsx:14-25`: the logo sits inside the `Link` and `:21` passes `ariaLabel={null}`, which `app/_components/CubeLogo.tsx:12-15` turns into `aria-hidden`. Only `link "Grid Beam"` in `audit/_root/dom/current.aria.yaml`; no image node.

## Verdict

## Log
