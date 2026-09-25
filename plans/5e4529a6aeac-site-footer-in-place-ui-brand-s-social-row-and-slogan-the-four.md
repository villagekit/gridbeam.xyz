---
title: "Site footer in place: ui-brand's social row and slogan, the four sections, the envelope link"
status: todo
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

## Log
