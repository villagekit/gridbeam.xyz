---
title: "BlockSection icon: aria-hidden added beside role presentation by Chakra v3's Icon"
status: open
route: shell
axis: accessibility
kind: added
---
## Legacy

`packages/ui-page/src/components/BlockSection.tsx:30` at `fce357d` renders `<Icon as={BlockSectionIcon} role="presentation" boxSize="4" />`; live legacy site, `/stories/how-to-cut-grid-beams`, the tip's `svg` carries `role="presentation"` and no `aria-hidden`.

## Current

`../ui/src/components/layouts/BlockSection.tsx:34-36` renders Chakra v3's `Icon`, which writes `aria-hidden="true"` on the `svg` (`node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js:22`) beside the `role="presentation"` the component passes; `pnpm dev`, the same tip's `svg` carries both. The accessibility tree is identical on both sides (`audit/stories__how-to-cut-grid-beams/dom/{legacy,current}.aria.yaml`), the attribute alone differs.

## Verdict

## Log

- 2026-09-26: Found at the Parity review of the ui mdx and media slice [[bc0407533650]], which renders BlockSection on the story tips; pre-existing in the 1.2.0 component. A rule 4 (upgrade-forced) candidate for the operator: Chakra v3's Icon hides itself by default, and the tree is the same.
