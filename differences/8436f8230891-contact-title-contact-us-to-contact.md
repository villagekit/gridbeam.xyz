---
title: "Contact title: Contact us to Contact"
status: open
route: /contact
axis: copy
kind: changed
---
## Legacy

`packages/applet-contact/src/pages/contact.tsx:28` `<CardsLayout title="Contact us">`, which `packages/ui-page/src/components/layouts/CardsLayout.tsx:19` passes to `<NextSeo title={title} />`; rendered `<title>Grid Kit: Contact us</title>` on `https://gridkit-landing-villagekit.vercel.app/contact`.

## Current

`app/contact/page.tsx:18,22-30` `const title = 'Contact'` as `metadata.title`, `openGraph.title` and `twitter.title`; rendered `<title>Contact — gridbeam.xyz</title>` on `http://localhost:3000/contact`.

## Verdict

## Log

- 2026-09-12: The title template is the shell item 1c8b7461acb1.
