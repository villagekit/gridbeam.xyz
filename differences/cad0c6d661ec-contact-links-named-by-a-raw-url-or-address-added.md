---
title: Contact GitHub Issues link named by its raw URL added
status: open
route: /contact
axis: accessibility
kind: added
---
## Legacy

The one legacy link is unnamed (`audit/contact/dom/legacy.aria.yaml:27-28`); no link on the route carries a URL as its name.

## Current

`audit/contact/dom/current.aria.yaml:34-35` `link "github.com/villagekit/gridbeam.xyz/issues"` (`app/contact/page.tsx:95-102`): the visible URL is the accessible name. The email link's name is the `changed` item fafcd22d5ebb on this route; the same pattern is filed on `/legal` (1527c666ea73) and `/legal/privacy-policy` (972c76e1cfd8).

## Verdict

## Log
