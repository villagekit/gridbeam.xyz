---
title: "LinkCard icon prop: a component type to a rendered element"
status: regression
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
