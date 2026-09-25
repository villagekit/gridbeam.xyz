---
title: "LinkCard overlay: LinkOverlay isExternal to an asChild chakra.a with explicit target and rel"
status: sanctioned
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:58` `<LinkOverlay as={LinkComponent} href={href} isExternal={isExternal} />`: Chakra v2's `LinkOverlay` turns `isExternal` into `target="_blank" rel="noopener noreferrer"`.

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:46-56` `<LinkOverlay asChild><chakra.a as={linkComponent} href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} /></LinkOverlay>`, with the comment "asChild, because LinkOverlay itself destructures `rel` away and never applies it": `node_modules/@chakra-ui/react/dist/esm/components/link/link-box.js:10` `const { rel, className, ...rest } = props`. Chakra v3's `LinkOverlay` has no `isExternal`.

## Verdict

rule: upgrade (Chakra v3 LinkOverlay drops isExternal and discards rel, link-box.js:10; asChild with explicit target and rel is the change that forces)

## Log

- 2026-09-12: Filed on shell from plan 848b026f.

- 2026-09-26: The story card slice (plan [[e332105c3b52]]) writes the same shape site-side for an external story's overlay, app/_components/stories/Item.tsx:111-119: LinkOverlay asChild around a chakra.a with href, target _blank, rel noopener noreferrer and the title as aria-label, in place of legacy's item.tsx:103 LinkOverlay href isExternal aria-label. The rendered anchor is legacy's (curl of /stories: target and rel on the four external cards), the same Chakra v3 cause this Verdict names, so no item of its own; noted here at the Parity review.
