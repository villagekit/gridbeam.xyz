---
title: "Privacy policy: an MDX document in LegalLayout to inline JSX in hand-composed Sections"
status: regression
route: /legal/privacy-policy
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/legal/privacy-policy.tsx:5` `createPrivacyPolicyPage({ Layout: MainLayout })` from `packages/applet-legal/src/pages/privacy-policy.tsx:10-26`: a factory rendering `<PrivacyPolicyDocument />` (the default export of `packages/applet-legal/src/mdx/privacy-policy.mdx`, 107 lines of Markdown) inside `LegalLayout` (`packages/applet-legal/src/components/LegalLayout.tsx:10-20`: `<Container maxW="container.md"><Stack spacing="4"><MDXProvider components={mdxComponents}>`), the headings, lists and links mapped by `packages/ui-mdx/src`.

## Current

`app/legal/privacy-policy/page.tsx:34-230` `export default function PrivacyPolicyPage()`: the copy as JSX children of `<Heading>`, `<Text>` and `<Span fontWeight="bold">` inside `Main`, `SkipNavContent`, `<Section index={0} maxW="6xl">`, `<Container maxW="3xl">`, `<VStack alignItems="flex-start" gap="6">`; links hand-authored as `<Link as={NextLink}>` or with `target="_blank" rel="noopener noreferrer"`; two `ObfuscatedEmailLink`s (`:192,223`; the helper is the shell item 68b53054e1f4). No `.mdx` under `app/` and no `MDXProvider`, though `@next/mdx` stays wired in `next.config.ts`.

## Verdict

## Log

- 2026-09-12: A consequence for the route: legacy's ui-mdx `a` mapping opened every non-hash link in a new tab, internal ones included (`packages/ui-mdx/src/link.tsx:9-16`); the current page opens only the external ones there. That follows this item and the shell item ecfa31cea5a0.
