---
title: "Loading spinner: Loading... screen-reader label to none"
status: upstream
route: /designs/bed-frame
axis: accessibility
kind: removed
---
## Legacy

`apps/gridkit/components/loading.tsx:16` `<Spinner size="xl" />`; Chakra v2's Spinner renders a visually hidden `Loading...` by default.

## Current

`app/_components/design/DesignViewerDynamic.tsx:8-10` `<Spinner size="xl" />`; Chakra v3's Spinner is a bare `span` with no default label and none is passed.

## Verdict

## Log

- 2026-09-12: Template.

- 2026-09-27: Fixed in ../ui at 1dbd172 (plan 65ee8339cb1d): the ui Spinner renders its label, Loading... by default, in a VisuallyHidden span inside the spinning element, Chakra v2's tree. On pnpm dev under the file:../ui override, the spinner during the viewer's loading state on /designs/bed-frame reads a hidden span (position absolute, 1px by 1px, clipped) holding Loading..., the aria tree `text: Loading...`, as the live legacy page reads. Waits on the operator's publish; the bump plan 99f2fe62c62f closes it.
