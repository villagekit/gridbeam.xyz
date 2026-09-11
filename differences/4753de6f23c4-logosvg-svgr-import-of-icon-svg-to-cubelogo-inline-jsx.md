---
title: LogoSvg (svgr import of icon.svg) to CubeLogo (inline JSX)
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`apps/gridkit/components/logo/svg.tsx:1-18`: `import Content from '@/public/icon.svg'` (a React component via `next-plugin-svgr`, typed by `apps/gridkit/custom.d.ts:1-7`), sized with `BoxProps['width']`, `role="img" aria-label="Grid Kit logo"` (`:15`).

## Current

`app/_components/CubeLogo.tsx:1-63`: the same paths hand-authored as JSX, `size: number | string`, `ariaLabel?: string | null`. No svgr plugin or `*.svg` module declaration in the repo.

## Verdict

## Log
