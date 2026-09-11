---
title: Privacy policy section Contact us to Contact
status: open
route: /legal/privacy-policy
axis: copy
kind: changed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:105-107` "### Contact us": "If you cannot find the information you need, or you have concerns about the way we are managing your personal information, then please contact us at any time." (link "contact us" to `/contact`).

## Current

`app/legal/privacy-policy/page.tsx:218-224` `<Heading as="h2" size="lg">Contact</Heading>`: "Questions about this policy? Email hello+gridbeam@mikey.nz." (the address via `ObfuscatedEmailLink`).

## Verdict

## Log

- 2026-09-12: Filed per section (heading plus its paragraphs and lists), the text quoted in full, since the route is a wholesale rewrite; a verdict on the section covers its blocks. Flagged in plan 848b026f's Outcome as a convention for the operator.
