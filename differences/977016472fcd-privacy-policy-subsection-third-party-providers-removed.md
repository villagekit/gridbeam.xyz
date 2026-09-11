---
title: Privacy policy subsection Third party providers removed
status: open
route: /legal/privacy-policy
axis: copy
kind: removed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:43-55` "#### Third party providers": "We use some third party providers to manage some of our engagement and ordering processes, such as newsletters and payment processing. Where we do this, any personal information you provide (such as your email address) may also be collected and stored by this provider and you should also check their privacy statements when using those services." / "We use the following third party providers:" / "**Buttondown**" / "We use Buttondown to deliver our newsletters. Read Buttondown's privacy policy." (link to `https://buttondown.email/privacy`) / "**Stripe**" / "We use Stripe to process payments for orders placed on our website. Read Stripe’s privacy policy." (link to `https://stripe.com/nz/privacy`).

## Current

No such subsection; the current "Third parties" section is its own added item (`app/legal/privacy-policy/page.tsx:148-184`).

## Verdict

## Log

- 2026-09-12: Filed per section (heading plus its paragraphs and lists), the text quoted in full, since the route is a wholesale rewrite; a verdict on the section covers its blocks. Flagged in plan 848b026f's Outcome as a convention for the operator.

- 2026-09-12: Rule 2 covers the Stripe half; the Buttondown half names no rule (the newsletter stays, CLAUDE.md "Key decisions").
