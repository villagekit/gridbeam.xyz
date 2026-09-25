---
title: "Mobile menu slide layer: the chakra-slide class removed"
status: open
route: shell
axis: code
kind: removed
---
## Legacy

`packages/ui-nav/src/components/NavMobileMenu.tsx:29` at `fce357d` renders the panel inside Chakra v2's `Slide` (`@chakra-ui/transition`, the version the legacy lockfile pins), whose layer is a `motion.div` carrying `className="chakra-slide"`; the live site's server HTML for `/faq` holds one `class="chakra-slide"` element, the always-mounted layer.

## Current

`../ui/src/components/nav/NavMobileMenu.tsx:47-51` (the nav slice `b0f69896e764`, sibling commit `1cf88ed`): the layer is a bare `motion.div` with the same fixed positioning, variants and transitions, and no class name. Not visible: the class carried no styles on either side, and nothing on the site or in the package selects it.

## Verdict

## Log

- 2026-09-26: Filed at the finish of the shell record [[a78b167170b8]] from the nav slice b0f69896e764's second review, which named it and did not file it; handed to the operator on the attended verdicts plan [[77cf83a1285a]] (decision 40abdb2f222a); the state stays until the operator judges it.
