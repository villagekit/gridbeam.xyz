---
title: "Email card: a LinkCard to a hand-built full-width VStack card"
status: regression
route: /contact
axis: visual
kind: changed
---
## Legacy

`packages/applet-contact/src/pages/contact.tsx:16-21` `<LinkCard title="Email us" icon={FaEnvelope} ...>`: the shared 224 by 256 px dashed `HoverCard` with the icon in the text color (`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:37-58`); `audit/contact/375/legacy.png` keeps that size at phone width.

## Current

`app/contact/page.tsx:53-82` `<VStack alignItems="center" gap="4" p="8" bg="white" borderRadius="xl" boxShadow="sm">` with `<Icon w="8" h="8" color="primary.600">`, an h3, a secondary paragraph and the email link styled by a `css` prop (`:67-80`: `primary.600`, bold, `xl`, 2 px underline); the GitHub card beside it uses `p="6"` and `gap="3"` (`:84`). Both stretch to `3xl` and to the viewport at 375 (`audit/contact/375/current.png`). Not the `@villagekit/ui@1.2.0` `LinkCard`.

## Verdict

## Log
