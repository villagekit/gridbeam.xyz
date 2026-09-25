---
title: "Site footer in place: ui-brand's social row and slogan, the four sections, the envelope link"
status: done
parent: a78b167170b8
derived_from: a78b167170b8
blocked_by:
  - target: 63e9c753ca55
    strength: soft
tags:
  - "worker:fable"
priority: medium
---
`SiteFooter` renders the social row and the credit block the way legacy's `ui-brand` `Social` and `FooterSlogan` did, the sections are the four decision `9f344fbfde9a` names, and the envelope goes back to the newsletter; the fold of `ui-brand` into `@villagekit/ui` is the ui brand footer slice, which replaces this file's markup at the bump. Record `a78b167170b8`; decisions `ee86d68a`, `2032533f`, `9f344fbfde9a`, `ad5363e4`, `ca677697`.

## Work

- Legacy source: `../node-modules/packages/ui-brand/src/components/Social.tsx` and `Footer.tsx` at `fce357d`; translate Chakra v2 to v3 inside `app/_components/SiteFooter.tsx`, which keeps its place in the tree and its `Footer sections` wrapper from `@villagekit/ui@1.2.0`.
- Social row (`597a889f3b3d`): `HStack as="section"` with gap 4, full width, `justifyContent: flex-end`, `alignItems: baseline`; each link `variant="tertiary"`, a flex row, `flexGrow: 1`; each icon `boxSize="auto"`, `flexGrow: 1`, `maxWidth: 8`, so the icons spread across the row as `audit/_root/1280/legacy.png` shows. The accessible names move back onto the icons (`0bde795aa7ae`): `aria-label={label}` on the icon and the link unnamed, one `img "<label>"` node per icon in the tree. Chakra v3's `Icon` writes `aria-hidden="true"` (`node_modules/@chakra-ui/react/dist/esm/components/icon/icon.js`): check first whether a prop overrides it, else render the react-icons component through `chakra()`; verify in the extracted tree, not the source.
- Heart (`c49a53197086`, `054dc1dfca86`): the `<title>love</title>` exposed as `img "love"` inside the credit paragraph, colour `primary.400`.
- Credit block (`6f13d2474340`, `884d9fcd857c`): `Text variant="tertiary"` at `sm` and `xs`; the Village Kit link at the default variant (primary, no underline), external. The row's and the block's `aria-label`s stay (`6c0e17bf75ca`, sanctioned).
- Envelope (`0a0329d7aa2c`): `href: '/subscribe'`, `label: 'Newsletter'`, `FaEnvelope`, internal.
- Sections: the four decision `9f344fbfde9a` names, with its headings `Explore`, `About`, `Connect`, `Legal` and its membership and order: Explore holds Designs, Stories, Tools and resources, Suppliers; About holds About, FAQ; Connect holds Contact, Newsletter; Legal holds Privacy policy, Site licence. GitHub leaves the sections (`3622c8f99a57`). Link labels are legacy's (`ca677697`) except where the decision's Consequences sanction a change (`4e8bd08861fa`, `cfc422822736`): so `Tools and resources` and `Newsletter` keep their legacy labels although the decision lists the pages as `Tools` and `Subscribe`, and the Outcome says so for the operator. Add a note on `b621ed63954e` and `85abcfd7dc9a` (sanctioned as `Learn` and `Browse`) that the decision's headings supersede the text their titles quote. `footerSections` moves out of `app/_lib/nav.ts` to beside the footer component, as legacy's `apps/gridkit/components/footer.tsx` had it: the site half of `0cdb6015b497`, whose tuple type is the ui brand footer slice's, so the item stays `regression` with a note naming what moved here. `app/_lib/nav.ts` keeps `navItems` only.
- Subscribe's standalone signup box (`ac6579ec16d2`'s verdict) is the subscribe record's slice; here Subscribe is a text link in Connect.
- Closes `597a889f3b3d`, `0bde795aa7ae`, `c49a53197086`, `054dc1dfca86`, `884d9fcd857c`, `6f13d2474340`, `0a0329d7aa2c`.
- Not this slice: the ui `Footer`'s column gap and alignment (`5be1bc658e85`, `999d0ec5a399`), the fold-in (`ca69d5d2e67c`) and the 768 overflow (`fb033121d164`): the ui brand footer slice; the WebGL cube: its own slice.

## Seams under test

None pure.

## Done when

- `audit/_root/dom/current.aria.yaml` (after `pnpm audit:dom`) shows in the footer the four headings `Explore`, `About`, `Connect`, `Legal` with the links named above in that order and no GitHub link among them, one `img` node named for each social icon with the links unnamed, `img "love"` in the credit paragraph, and `link "Newsletter"` to `/subscribe` in the social row
- `audit/_root/1280/current.png` beside `legacy.png`: the social icons spread across the row, the heart pink, the credit text gray as legacy's tertiary
- `grep -c footerSections app/_lib/nav.ts` prints 0
- the seven items are `fixed`, and `0cdb6015b497`, `b621ed63954e` and `85abcfd7dc9a` carry their notes, checked after the fixes
- `timeout 900 just check` is green

## Outcome

Shipped: the site footer is legacy's `ui-brand` footer again, in place. `app/_components/SiteFooter.tsx` is `apps/gridkit/components/footer.tsx`, `packages/ui-brand/src/components/Footer.tsx` and `Social.tsx` at `fce357d` in one file, on `@villagekit/ui@1.2.0`'s `Footer sections` wrapper: `footerSections` beside the component as legacy had it, the `SocialLinkDescriptor` shape (`Icon: React.ComponentType`, `isExternal: boolean`), `Social` (`HStack as="section"` gap 4, full width, `justifyContent: flex-end`, `alignItems: baseline`), `SocialLink` (`variant="tertiary"`, a flex row with `flexGrow: 1`; the icon `as={SocialIcon}`, `boxSize="auto"`, `flexGrow: 1`, `maxWidth: 8`, `aria-label` on the icon and the link unnamed) and `FooterSlogan` (`Text variant="tertiary"` at `sm` and `xs`, the heart `primary.400` with `<title>love</title>`, the Village Kit link at the default variant, external). The Chakra v3 translations: `spacing` to `gap`, `sx` to style props, `isExternal` to `target` and `rel` (the ui `Link` grows `isExternal` in the recipes slice), and `aria-hidden={undefined}` on both icons, since Chakra v3's `Icon` writes `aria-hidden="true"` before spreading its props (`icon.js`) and an undefined value removes the attribute; the heart takes the `asChild` form (`<Icon><FaHeart title="love" /></Icon>`) because v3's `IconProps` no longer merges the `as` component's props and has no `title`. The sections are decision `9f344fbfde9a`'s four with its headings: Explore (Designs, Stories, Tools and resources, Suppliers), About (About, FAQ), Connect (Contact, Newsletter), Legal (Privacy policy, Site licence); GitHub leaves the sections. The envelope is `Newsletter` to `/subscribe`. `app/_lib/nav.ts` keeps `navItems` only. Closed: `597a889f3b3d`, `0bde795aa7ae`, `c49a53197086`, `054dc1dfca86`, `884d9fcd857c`, `6f13d2474340`, `0a0329d7aa2c`, and `ae5770b0348f`, filed and closed in flight (below). Notes on `0cdb6015b497` (the site half done, the tuple type the ui brand footer slice's), `b621ed63954e` and `85abcfd7dc9a` (the decision's headings supersede the text their titles quote).

For the operator: the link labels stay legacy's where the decision lists a page by its name without a sanctioned label change, so `Tools and resources` (not `Tools`) and `Newsletter` (not `Subscribe`) ship, the record's Log call 2.

Proof: `audit/_root/dom/current.aria.yaml` after `pnpm audit:dom` shows in the `contentinfo` the four headings in order with the links named above and no GitHub link among them, one `img "<label>"` per social icon inside a link whose name is the icon's, `img "love"` inside the credit paragraph, and `link "Newsletter"` to `/subscribe` in the social row; two render probes with `react-dom/server` (deleted after) showed the `as` and `asChild` forms both emit an svg with `<title>love</title>` and no `aria-hidden`; the screenshot pairs at 375, 768 and 1280 looked at: the icons spread across the row at 32px, the heart pink, the credit gray, the Village Kit link teal; a Playwright measurement gives the icons 32px on both sides at 1280 and 768, and the heart's top 1px below its paragraph's top on both sides in a 21px line; `grep -c footerSections app/_lib/nav.ts` prints 0; `timeout 900 just check` green; `kipu verify --warnings-as-errors` green.

Deviations and facts found in flight:
- Filed `da830eb83c42`, `regression`: the social row's `Container` is Chakra v3's (`maxWidth: 8xl`, responsive padding) where legacy's was Chakra v2's (`maxW: prose`, 600px rendered), so the icons spread over 1110px at 1280 against legacy's 558px. Pre-existing and unrecorded; the Container is the package's and the markup here is legacy's bare `<Container>`, so the fix is the ui side's (the brand footer slice `1977c9af920c` or the recipes slice `45d6f5634a11`), not a site-side `maxW`.
- Filed and closed `ae5770b0348f`, `regression`, found by the Spec review: Chakra v3's icon recipe adds `verticalAlign: middle`, which Chakra v2's `Icon` at `@chakra-ui/icon@3.2.0` never set, so the heart sat 4.3px down where legacy's sits 1px; `verticalAlign="baseline"` on the heart is the one change the upgrade forces, with a comment naming the constraint.
- The heart takes the `asChild` form where `SocialLink` keeps legacy's `as={SocialIcon}`: v3's `IconProps` (`HTMLChakraProps<'svg'>`) has no `title`, so `as={FaHeart} title="love"` fails to type-check; both forms render the same svg (the render probe).
- Legacy's `shouldLinkToCompanyWebsite` prop is dropped: one caller, always true; the fold-in slice decides whether the package keeps it.
- The pink and gray literals differ between the sides (`primary.400` is Chakra v2's `rgb(237,100,166)` on legacy and v3's `rgb(244,114,182)` here; `gray.600` likewise): the palette slice `c14505b76b6a`'s, not this one's.

- Filed `1c6d12f592b3`, `regression`, found by the Parity review and pre-existing: Chakra v2's link base gave every `Link` a 0.15s ease-out color transition, which `@villagekit/ui@1.2.0`'s `linkRecipe` and Chakra v3's link recipe both lack, so hover colors snap site-wide; the fix is the ui `Link` recipe's (the recipes slice `45d6f5634a11`).
- A note on `6c0e17bf75ca` (sanctioned) refreshes its Current: the social row is `as="section"` again, a `region`, not a `navigation`.

Findings dropped: the Parity review's claim that the credit link's hover color is new here. Measured with the legacy cookie banner removed, legacy's `Village Kit` link hovers from `rgb(0,163,196)` to `rgb(151,38,109)`, Chakra v2's `primary.700`, exactly as `@villagekit/ui@0.9.0`'s `linkTheme` base `_hover` says; the current side does the same in v3's shades, which `72b776cb0d3f` records. The Standards review's `StackProps['width']` and the `[[<id>]]` citations in the notes were applied.

## Log
