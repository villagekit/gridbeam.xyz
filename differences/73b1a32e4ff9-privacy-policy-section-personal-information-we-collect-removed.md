---
title: Privacy policy section Personal information we collect removed
status: open
route: /legal/privacy-policy
axis: copy
kind: removed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:18-41` "### Personal information we collect": "We collect personal information from you as necessary to carry out our functions including fulfilling orders, running our community platform, and engaging with you through newsletters and other communication activities (such as events or surveys)." / "To effectively carry out our functions we are required to collect and use some personal information. However, we only collect personal information you choose to provide to us, and you can opt out of our communication activities, such as receiving our newsletter, at any time." / "The information we may collect when you engage with us include:" "Your name."; "Your contact details including your address, email address, or phone number."; "Any details required to fulfill an order placed through the website including your billing address, shipping address, payment information (including credit card numbers, Paypal account details, or any details required for other payment methods), and any order specific information (such as the products purchased, quantities, and any notes)."; "Any content you have published on our community platform (including designs, discussion posts, and any other user-generated content)." / "We also collect the following information about your use of our website:" "Your IP address."; "The search terms you used."; "The pages you accessed on our website and the links you clicked on."; "The date and time you visited the site."; "The referring site (if any) through which you clicked to our website."; "Your operating system (such as Windows 10)."; "The type of web browser you use (such as Google Chrome)." / "See our cookies policy for more information about the cookies we use on our website (for example to track and analyse website usage)." (link "cookies policy" to `/legal/cookie-policy`).

## Current

No section of that name; the nearest current sections, "What we don't collect" and "What we do collect", are their own added items (`app/legal/privacy-policy/page.tsx:49-146`).

## Verdict

## Log

- 2026-09-12: Filed per section (heading plus its paragraphs and lists), the text quoted in full, since the route is a wholesale rewrite; a verdict on the section covers its blocks. Flagged in plan 848b026f's Outcome as a convention for the operator.

- 2026-09-12: Rule 2 covers the order-details item and rule 3 the cookies link inside it; the rest names no rule, so the section is the operator's.
