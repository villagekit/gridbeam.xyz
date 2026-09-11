---
title: "Email link accessible name: an unnamed overlay to the address as link text"
status: regression
route: /contact
axis: accessibility
kind: changed
---
## Legacy

`@villagekit/ui@0.9.0 src/components/LinkCard.tsx:58` `<LinkOverlay ... />` with no children: `audit/contact/dom/legacy.aria.yaml:27-28` an unnamed `link` (`/url: mailto:hello@madewithgridkit.com`); the `aria-label` on the `HoverCard` wrapper (`:40`) does not name the anchor.

## Current

`app/_components/ObfuscatedEmail.tsx:16` `<a href="mailto:${addr}">${addr}</a>`: `audit/contact/dom/current.aria.yaml:30-31` `link "hello+gridbeam@mikey.nz"`.

## Verdict

## Log

- 2026-09-12: Regression by the rule's absence; the current link is named where the legacy one was not, which the operator may weigh under rule 5.
