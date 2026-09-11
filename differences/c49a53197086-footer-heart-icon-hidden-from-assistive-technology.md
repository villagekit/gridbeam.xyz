---
title: Footer heart icon hidden from assistive technology
status: regression
route: shell
axis: accessibility
kind: changed
---
## Legacy

`packages/ui-brand/src/components/Footer.tsx:57`: `<Icon as={FaHeart} title="love" />` renders `<svg><title>love</title>` without `aria-hidden`; `img "love"` inline in the credit paragraph in `audit/_root/dom/legacy.aria.yaml`.

## Current

`app/_components/SiteFooter.tsx:93-98`: `<Icon ...><FaHeart title="love" /></Icon>`; the wrapper renders `aria-hidden="true"`, so the `<title>love</title>` is not exposed. No `img` node in the `Site credit` region of `audit/_root/dom/current.aria.yaml`.

## Verdict

## Log
