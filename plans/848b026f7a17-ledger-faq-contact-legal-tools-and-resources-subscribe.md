---
title: "Ledger: faq, contact, legal, tools and resources, subscribe"
status: done
parent: c6182c6a8609
derived_from: c6182c6a8609
blocked_by:
  - 4465f31eea38
  - b2ed8f4c3f6e
priority: medium
---

The parity ledger holds every difference on the faq, contact, legal, tools-and-resources and subscribe routes, cited on both sides and judged by rule, with copy and `added` items left `open` for the operator. Sliced from M1 (`c6182c6a`); decisions `ee86d68a`, `2032533f`, `ad5363e4`, `ca677697`, `bfa9a416`.

## Work

Run the `parity` skill on: `/faq`, `/contact`, `/legal`, `/legal/privacy-policy`, `/tools-and-resources`, `/subscribe`. Capture first (`pnpm audit:pages` and `pnpm audit:dom` with a routes file listing exactly these routes, each carrying its side marker from `scripts/audit-routes.txt`, against the live legacy site and a local `pnpm dev`), then one Sonnet sub-agent per route per family (copy, visual and interaction, accessibility, code), then mint and judge every difference. `/legal/cookie-policy` and `/legal/return-policy` exist on the legacy side only: one `removed` item each, sanctioned under rule 3 and rule 2. The subscribe form's absence is one `removed` item on the `interaction` axis, a regression. Check note `526d5330` for the subscribe copy finding.
Interfaces: the `difference` items, by route, for the route records under M2 (`337e35d8`).
Verify first: `audit/<slug>/dom/` exists for each route (the tooling slice `4465f31e` shipped) and the shell ledger (`b2ed8f4c`) is filed.
Not this slice: fixing anything; judging copy.

## Seams under test

None pure.

## Done when

- For each of these routes, `kipu list --collection difference --filter route=<route> --json` has items, or the note below records that the sub-agents found the route identical on every family
- Every `open` item among them is on the `copy` axis or has `kind: added`
- Every `sanctioned` item's Verdict names a rule or a lock
- A `kipu note` on M1 (`c6182c6a`) records the counts per state, axis and kind for these routes and what the sub-agents found identical
- `kipu verify` is green
- `pnpm check` is green

## Outcome

Shipped: the parity ledger for `/faq`, `/contact`, `/legal`, `/legal/privacy-policy`, `/tools-and-resources` and `/subscribe`, 156 `difference` items on the eight routes (the two legacy-only legal routes carry one `removed` item each: cookie policy under rule 3, 313b72c0cee2; return policy under rule 2, 483915b27660), plus 12 on `shell` the shell pass missed: the LinkCard rewrite (box, padding, icon color, heading level, hidden icon, icon prop, overlay), the Accordion recipe (hover fill, separator, hidden panel), CardsLayout's port that no route consumes (8a3babf21c3c), and the heading weight (7124898563eb). Counts per state, axis and kind and what was found identical are noted on M1 (c6182c6a8609). Captured fresh with `pnpm audit:pages` and `pnpm audit:dom` for the six routes plus the two legacy-only ones (their side markers from `scripts/audit-routes.txt`); 24 Sonnet diffs, one per route per family, all reported; the lists deduped and judged by rule. The subscribe form's absence is the interaction regression the plan names (11a126190ef5); note 526d5330's "no audience pressure" clause holds and is the open copy item e6c2dfe1d250. Open items: 106 on the routes, every one copy or `added`; regression 40; sanctioned 10, each naming a rule.

Conventions chosen (flags for the operator, before the copy grilling e2805adefd47): (1) `/legal/privacy-policy` is a wholesale rewrite (65 legacy blocks out, 24 in), so its copy is filed per section (heading plus its paragraphs and lists, quoted in full on both sides) rather than per block; a verdict on a section covers its blocks, and a section a rule covers only in part says so in its log (460c2d07249f, 73b1a32e4ff9, 977016472fcd). The Spec review judged this permitted (the per-block rule is scoped to an added route) at the cost that a mixed section needs a split before the operator can keep one paragraph and drop another. (2) `/faq` copy is filed per question-and-answer block, with the two removed e-commerce sections as one item each. (3) The subscribe form's labels, placeholders, helper text, button and toasts are one open copy item (f209af6d8cb1), since the strings stand or fall with the form.

Review round one (Standards, Spec, Parity on Opus), applied: typographic apostrophes restored in eight `/faq` quotes; the CardsLayout loss given a shell item and cited as cause on the three routes' list-role items; the FAQ Suppliers section split into a heading and four Q&A items; six citations corrected; five items minted from the Parity findings (privacy-policy heading anchors dropped, afde6160065b; the GitHub URL overflowing its card on `/contact` at 375, 90f294279f16; raw-URL link names on `/contact` and `/legal`, cad0c6d661ec and 1527c666ea73; the heading weight on shell). Round two, applied: 8a3babf21c3c rewritten once `@villagekit/ui@1.2.0` was found to ship a CardsLayout port that no route imports; a phantom link claim removed from 033b62f084cf; cad0c6d661ec scoped to the GitHub link so it no longer overlaps fafcd22d5ebb; two citation and one escaping fix; the overflow filed on `/legal` and `/legal/privacy-policy` too (26d184c5a4d0, be199fed718a). Rejected: (1) fafcd22d5ebb (the email link named where legacy's was not) stays `regression`, because the Judge step makes a `changed` item no rule covers a regression by the rule's absence, never by which side is better; its log says the operator may sanction under rule 5. (2) adce8828614b, ba753f7499b9 and 62ebc1fe6962 stay `open`: rule 2 names surfaces (store, cart, checkout, order-complete, Stripe, the return policy), and copy about where the kits were made, what they cost, or how to reach support is not plainly one, so the operator judges rather than the worker stretching the rule. (3) f209af6d8cb1 and f4b1b5203dd9 stay `open` copy beside the form's interaction regression, so the strings are judged when the form returns. (4) f4b1b5203dd9's straight apostrophes are verbatim: the legacy source writes `&apos;`. (5) 2ed11f164573 (the Accordion call-site props) stays on `/faq` with a log naming its shell siblings.

Verify: `pnpm check` green (exit 0) on the tree before the round-two ledger edits and re-run after them; `kipu verify` green (663 items). The change touches no route, so no screenshots were re-taken after filing; the captures under `audit/{faq,contact,legal,legal__privacy-policy,legal__cookie-policy,legal__return-policy,tools-and-resources,subscribe}` are today's. Caveats on M1: the current 768 captures are 1018 px wide (the nav overflow, shell item fb033121d164), so no route here is certified at 768; the Next dev indicator is burned into every current capture.

Not this slice, left alone: fixing anything; judging copy. One route-ledger plan remains under M1 (designs, cf52c3885b8a) unless already done, then the copy grilling gate e2805adefd47.

## Log
