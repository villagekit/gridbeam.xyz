---
title: "LinkCard icon prop: a component type to a rendered element"
status: upstream
route: shell
axis: code
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:18,29,50` `icon: React.ComponentType`, required, rendered as `<Icon as={IconComponent} />`; call sites pass `icon={FaCut}` (`apps/gridkit/pages/tools-and-resources.tsx:14`), `icon={FaEnvelope}` (`packages/applet-contact/src/pages/contact.tsx:18`), `icon={FaUndoAlt}` (`packages/applet-legal/src/pages/legal.tsx:28`).

## Current

`@villagekit/ui@1.2.0 src/components/LinkCard.tsx:19,34-38` `icon?: ReactNode`, optional and guarded with `icon != null &&`, rendered as `<Icon>{icon}</Icon>`; call sites pass `icon={<FaUserShield />}` (`app/legal/page.tsx:56`), `icon: <FaCut />` (`app/tools-and-resources/page.tsx:53`), `icon={<FaEnvelope />}` (`app/subscribe/page.tsx:67`). Chakra v3's `Icon` still accepts `as` (`node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js`), so the shape change is not forced.

## Verdict

## Log

- 2026-09-12: Filed on shell from plan 848b026f.

- 2026-09-26: Fixed in ../ui as commit a4ef8ed on its main (not pushed; the push goes with the operator's publish, decision 28c1a536): src/components/LinkCard.tsx re-ported from @villagekit/ui@0.9.0 by plan [[1cc03cfabcf2]]. Waits in upstream for the bump plan [[99f2fe62c62f]].
