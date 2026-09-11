---
title: Contact meta description added where legacy inherited the site default
status: open
route: /contact
axis: copy
kind: added
---
## Legacy

`CardsLayoutProps` takes only `title` (`packages/ui-page/src/components/layouts/CardsLayout.tsx:9-12`) and passes no `description` to `NextSeo`, so the route inherits the site default from `apps/gridkit/pages/_app.tsx:49`.

## Current

`app/contact/page.tsx:19-20,24,27,30` `description = 'Email the maintainer or open an issue on GitHub. Suppliers, contributors, and curious folks all welcome.'` as `metadata.description`, `openGraph.description` and `twitter.description`.

## Verdict

## Log
