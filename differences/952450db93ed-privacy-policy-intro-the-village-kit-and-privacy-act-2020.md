---
title: "Privacy policy intro: the Village Kit and Privacy Act 2020 preamble with key messages to one paragraph"
status: open
route: /legal/privacy-policy
axis: copy
kind: changed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:3-16`: "This privacy policy describes how Village Kit collects, uses, stores, and shares your personal information." / "The Privacy Act 2020 requires us to tell you certain things about the personal information we need to carry out our functions. This is where we explain our privacy practices and why you can trust us to handle your personal information." / "In this policy we explain what personal information we collect and how we use or share it. We also explain about the way we store and protect personal information and your rights to access and correct it." / "In short, here are a few key privacy messages to note:" then six list items: "We only collect personal information where this is necessary to carry out our functions."; "We store most of our data (including your personal information) on a secure Amazon Web Services cloud platform in the Sydney Region."; "We use reasonable technical and process controls to protect our data."; "We use some third party providers to manage some of our engagement and ordering processes including Buttondown and Stripe."; "You can ask us for a copy of your personal information at any time or request us to correct any personal information we hold about you."; "We will only use and share personal information where necessary to carry out the functions for which we collected it, or if required by law."

## Current

`app/legal/privacy-policy/page.tsx:43-47` `<Text fontSize="lg">` "gridbeam.xyz is a non-commercial educational site. The short version of this policy is: we collect almost nothing. The longer version explains the few exceptions." ("we collect almost nothing" bold).

## Verdict

## Log

- 2026-09-12: Filed per section (heading plus its paragraphs and lists), the text quoted in full, since the route is a wholesale rewrite; a verdict on the section covers its blocks. Flagged in plan 848b026f's Outcome as a convention for the operator.
