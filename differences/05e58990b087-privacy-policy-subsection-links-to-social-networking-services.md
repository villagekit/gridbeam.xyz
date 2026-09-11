---
title: Privacy policy subsection Links to social networking services removed
status: open
route: /legal/privacy-policy
axis: copy
kind: removed
---
## Legacy

`packages/applet-legal/src/mdx/privacy-policy.mdx:57-63` "#### Links to social networking services": "We use social networking services such as Facebook, Twitter, Instagram, and YouTube to communicate with the public about our work. When you communicate with us using these services, the social networking service may collect your personal information for its own purposes." / "These services may track your use of our website on those pages where their links are displayed. If you are logged in to those services (including any Google service) while using our site, their tracking will be associated with your profile with them. See our cookies policy for more information." (link to `/legal/cookie-policy`) / "These services have their own privacy statements which are independent of ours. They do not have any access to the personal information we hold on our systems."

## Current

No such subsection in `app/legal/privacy-policy/page.tsx`.

## Verdict

## Log

- 2026-09-12: Filed per section (heading plus its paragraphs and lists), the text quoted in full, since the route is a wholesale rewrite; a verdict on the section covers its blocks. Flagged in plan 848b026f's Outcome as a convention for the operator.
