---
title: "Contact heading: Contact us to Get in touch"
status: open
route: /contact
axis: copy
kind: changed
---
## Legacy

`packages/applet-contact/src/pages/contact.tsx:28` `<CardsLayout title="Contact us">` renders `<Title>Contact us</Title>` (`CardsLayout.tsx:21`); `audit/contact/dom/legacy.aria.yaml:22` `heading "Contact us" [level=1]`.

## Current

`app/contact/page.tsx:39` `<Title description="How to reach the gridbeam.xyz maintainer.">Get in touch</Title>`; `audit/contact/dom/current.aria.yaml:23` `heading "Get in touch" [level=1]`.

## Verdict

## Log
