---
title: "LinkButton, LinkIconButton, LinkCard, Footer and Social links: rel noopener noreferrer where legacy rendered noopener or none"
status: regression
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0` `src/components/LinkCard.tsx:21,58` passes `isExternal` to Chakra v2's `LinkOverlay`, which renders `target="_blank" rel="noopener"`; 0.9.0's `LinkButton` and `LinkIconButton` take no `isExternal` and write no `rel`, the caller passing `target` and `rel` as props; `packages/ui-brand/src/components/Social.tsx` and `packages/ui-page/src/components/Footer.tsx` at `fce357d` render their external links through the ui `Link` with `isExternal`, Chakra v2's `noopener`.

## Current

`../ui/src/components/LinkButton.tsx:29`, `LinkIconButton.tsx:26` and `LinkCard.tsx:71` write `rel={isExternal ? 'noopener noreferrer' : undefined}`; `src/components/layouts/Footer.tsx:127,148` and `src/components/Social.tsx:85` write `target="_blank" rel="noopener noreferrer"` directly. The ui `Link` itself renders `isExternal` as `noopener` since the recipes slice, and `MdxLink` since the mdx and media slice; these five are the rest of the same question `d04a1827b838` raised.

## Verdict

## Log

- 2026-09-26: Filed by the ui mdx and media slice [[bc0407533650]] at its Spec review, splitting the last clause of [[d04a1827b838]] out so that item closes on MdxLink alone. The fix is the ui's, one line per component (`isExternal` on the ui `Link`, or `noopener`), no slice owning it; a later ui slice or the bump plan [[99f2fe62c62f]] takes it, or rule 4 is judged on it.

- 2026-09-26: Read by the palette slice (plan c14505b76b6a) and left: its fix is one line in each of five components (LinkButton, LinkIconButton, LinkCard, Footer, Social), not the package theme, so it is outside that slice's shape. No slice owns it: a ui slice the operator mints or the bump plan 99f2fe62c62f takes it, or rule 4 is judged on it.

- 2026-09-26: Handed to the slice [[9e54dca30d48]], minted beside the shell record [[a78b167170b8]] at its finish (decision 40abdb2f222a): one line in each of the five components in ../ui, parked in upstream when it lands.
