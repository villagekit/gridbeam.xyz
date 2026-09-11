---
title: Footer WebGL logo cube removed
status: regression
route: shell
axis: visual
kind: removed
---
## Legacy

`apps/gridkit/components/footer.tsx:19,126`: `const LogoGl = dynamic(() => import('@/components/logo/gl'), { ssr: false })`, rendered as `<LogoGl size="12" />` between the social row and the slogan. `apps/gridkit/components/logo/gl.tsx:1-220`: a react-three-fiber `Canvas` with instanced faces and holes, rotating every frame (`useFrame`). Visible in `audit/_root/1280/legacy.png` and `audit/_root/375/legacy.png` (footer); `img "Grid Kit logo"` in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/SiteFooter.tsx:75-114` renders the social row and the credit block only; no logo in the footer. `CubeLogo` (static SVG) appears in the header and the OG image only. Absent from `audit/_root/1280/current.png` and `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log

- 2026-09-12: Not upgrade-forced: `@react-three/fiber` and `three` are current dependencies (`package.json`).
