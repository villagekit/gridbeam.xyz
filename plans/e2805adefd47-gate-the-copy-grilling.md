---
title: "Gate: the copy grilling"
status: done
tags:
  - gate
parent: 1783931160f2
blocked_by: c6182c6a8609
---

The operator judges every `open` item on the `copy` axis and every `open` addition, item by item, legacy text and current text side by side, in a grilling session with a Fable agent (the `grilling` skill). Each verdict is written on the item (`kipu sanction`, `kipu move ... regression`, or `kipu dismiss`), and the sanctioned wording is the only non-legacy copy M2 may ship. Decision `ca677697`. This gate is the operator's: an orchestrator stops here.

## Work

Run the grilling from `kipu list --collection difference --status open --filter axis=copy --json`, grouped by route, plus `kipu list --collection difference --status open --filter kind=added --json`. Record each verdict on its item. Where a verdict generalizes (a rule for all newsletter notes, say), record it as a decision and cite it from each item.

## Seams under test

None.

## Done when

- `kipu list --collection difference --status open` prints nothing
- Every `sanctioned` copy item's Verdict quotes the wording to ship
- `kipu verify` is green

## Log

- 2026-09-25: Home route closed: 53 items judged, 52 regressions (legacy verbatim with the rule 1 swap) and one rule 2 sanction. Three decisions minted: American English ([[6fce53c0a18e]]), legacy em dashes exempt ([[edad0df805f0]]), store CTAs ([[5dfd824923c9]]). Next: /suppliers.

- 2026-09-25: Suppliers route closed: 33 items, all regressions to the decision's shape ([[8b5e51fcaf61]]): title, map with the Locations list, cards with name (linked), location and a metric/imperial label. Grid Kit stays listed; Gridbeam Supply is in Willits, California. Three wordings pending the operator's confirmation (system label, Grid Kit entries, the Willits location line). Next: /about.

- 2026-09-25: Suppliers wordings confirmed (Metric/Imperial; Grid Kit Wellington only; Willits, California). About route closed: 32 items, all regressions to legacy verbatim with the rule 1 swap; the intro block and the two added sections go. Next: /faq.

- 2026-09-25: FAQ route closed: 30 items. Legacy's three sections return (Product, Sustainability, Support); ten answers ship legacy verbatim with the swap, five in the company's voice ship in the operator's words, contact-support returns, the price and manufacturing questions go under rule 2, the seven added questions go. Next: /legal/privacy-policy.

- 2026-09-25: Privacy policy route closed: 26 items. The legacy Privacy Act policy returns with the store, Stripe, payment and cookie lines cut under rules 2 and 3; the seven added sections go; the title keeps "Privacy policy". Two wordings pending the operator (the entity now that Village Kit is not a company; storage on Cloudflare and the email provider). Next: /tools/cutting-planner.

- 2026-09-25: Privacy wordings confirmed (Mikey Williams, mikey.nz; Cloudflare; Google Workspace). Cutting planner route closed: 23 items, legacy's labels and captions verbatim, the intro, summary, share links and print removed; the title keeps "Cutting planner". Next: /designs/bed-frame and /designs.

- 2026-09-25: Designs index and design page template closed: 38 items, all regressions to legacy. The index keeps its fixed 14 filters, legacy's strings and a single grid; the design page keeps legacy's labels, the Settings and Cutting plan headings and the footnote, with the Plan tab's headline cut to "Requires Nx Sgu (grid unit) beams." under rule 2. Next: /tools-and-resources.

- 2026-09-25: Tools and resources, subscribe and contact closed: 40 items, all regressions to legacy. Tools keeps its one card; subscribe keeps "Subscribe to Grid Beam", the sentence, the form's strings and the success state; contact keeps "Contact us" and the email card linking to hello+gridbeam@mikey.nz in the href only. Next: /legal and the stories family.

## Outcome

Done 2026-09-25. All 313 open items judged across every route, in nine grilling commits from `824a52b` to this one; `kipu list --collection difference --status open` prints nothing; every sanctioned copy item's Verdict quotes the wording that ships; `kipu verify` is green.

The operator's standing call, set on the home round and applied everywhere after: change as little as makes sense. Legacy verbatim is the target, with "Grid Kit" swapped to "grid beam" and nothing else, so nearly every rewrite from the first port is a regression back to the legacy text. The exceptions carry a rule: the store surfaces and promises (rule 2), cookies (rule 3), and a handful of operator calls (page titles where legacy set none; "FAQ"; the five FAQ answers rewritten out of the company's voice; the privacy policy's entity and storage lines; the suppliers page reduced to the decision's shape with a Metric/Imperial label).

Decisions minted: American English ([[6fce53c0a18e]]), legacy em dashes exempt ([[edad0df805f0]]), store CTAs as "Buy a Grid Beam" ([[5dfd824923c9]]), historical posts keep the name ([[dcd8df79a843]]); earlier in the gate, no em dashes ([[64ee4dfa393d]]), the nav shape ([[c21b7e35f0c7]]), the 404 page ([[dc1a7a98373f]]), the footer sections ([[9f344fbfde9a]]).

Ledger at close: 635 regression, 112 sanctioned, 2 dismissed. M2 (slicing the route records to fix the regressions) is the next phase and waits for the operator's go.
