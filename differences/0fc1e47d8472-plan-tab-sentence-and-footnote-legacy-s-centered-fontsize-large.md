---
title: "Plan tab sentence and footnote: legacy's centered fontSize large/small column at maxWidth md:50% to a full-width, unstyled Text"
status: fixed
route: /designs/bed-frame
axis: visual
kind: changed
---
## Legacy

`apps/gridkit/pages/designs/[id].tsx:181-220` (`fce357d`): the sentence and
footnote sit in a `VStack sx={{ maxWidth: { base: '100%', md: '50%' } }}`
itself centered by the outer `VStack sx={{ width: '100%', alignItems:
'center' }}` (`:181`), the sentence `fontSize="large"` and the footnote
`fontSize="small"`. Measured on the live legacy site at 1280: the column
sits at x 368, width 544.

## Current

`app/_components/design/DesignCuttingPlan.tsx:47-72`: the sentence and
footnote are plain `<Text>` with no `fontSize` or `maxWidth`, inside the
outer `VStack alignItems="stretch"`, full width (measured on `pnpm dev` at
1280: width 1056).

## Verdict

plan 3c448a379ad7

## Log

- 2026-09-28: Found by the Parity review of plan f64fd2900fb3, which explicitly leaves this sentence's size and maxWidth stack to the page re-port ("this slice writes strings and links only"). No rule covers a full-width, unstyled sentence where legacy centers a large one, so regression, for the page re-port [[3c448a379ad7]] to close. The heading's own size and weight need no new item: they are the shell-wide Heading recipe difference already tracked upstream ([[77cd1426ac65]], [[7124898563eb]]), fixed in ../ui and waiting on the bump plan [[99f2fe62c62f]].
