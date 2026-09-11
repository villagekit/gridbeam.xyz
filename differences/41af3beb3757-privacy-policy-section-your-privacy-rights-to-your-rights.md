---
title: Privacy policy section Your privacy rights to Your rights
status: open
route: /legal/privacy-policy
axis: copy
kind: changed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:91-93` "### Your privacy rights": "The Privacy Act gives you rights to request access to and correction of the personal information we hold about you. Please contact us to exercise any of these rights, including the right to complain about our privacy practices." (link "contact us" to `/contact`).

## Current

`app/legal/privacy-policy/page.tsx:186-206` `<Heading as="h2" size="lg">Your rights</Heading>`: "You can ask us what data we hold about you and request correction or deletion. The quickest way is to email hello+gridbeam@mikey.nz or open an issue at github.com/villagekit/gridbeam.xyz/issues. The same channels are linked from the contact page." (the address via `ObfuscatedEmailLink`; the issues link to `https://github.com/villagekit/gridbeam.xyz/issues`) / "If you live in the European Union, the United Kingdom, or another jurisdiction with equivalent rules, the same rights apply under GDPR or your local equivalent."

## Verdict

## Log

- 2026-09-12: Filed per section (heading plus its paragraphs and lists), the text quoted in full, since the route is a wholesale rewrite; a verdict on the section covers its blocks. Flagged in plan 848b026f's Outcome as a convention for the operator.
