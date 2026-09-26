---
title: "Stories page: one pages-router file to a server page.tsx and a client StoriesPage.tsx"
status: open
route: /stories
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories.tsx:10-42` at `fce357d`: one file, `StoriesPage` calling `useBreakpointValue` for the stack's spacing, mounting `StoriesContextProvider`, rendering `NextSeo` beside the page's tree, with `getLayout`.

## Current

Filed at the split of the stories index record (plan `ca353de8b645`), for the page re-port to meet: the app router exports `metadata` from a server file only, and legacy's page calls a hook and mounts a provider, which a server file cannot, so the re-port writes two files, the server `app/stories/page.tsx` (`metadata`, rendering the page) and the client `app/stories/StoriesPage.tsx` (legacy's body line for line). The same shape as [[091a47cb93e7]] on `/`, `open` on the home's verdicts plan `8bb4a4380264`.

## Verdict

## Log

- 2026-09-26: Filed at the split of the stories index record [[ca353de8b645]] for the page re-port [[278fb531e229]] to meet (the two files exist once it ships; its Done when notes their paths here), and handed to the operator on the attended verdicts plan [[239f17128896]] (decision 40abdb2f222a); the state stays until the operator judges it.

- 2026-09-26: Shipped by the page re-port (plan [[278fb531e229]]) in legacy's form, no verdict having landed: app/stories/page.tsx (11 lines, the server file: metadata title Stories at lines 5-7 and the default export rendering StoriesPage at lines 9-11) and app/stories/StoriesPage.tsx (30 lines, the client file under the ported-from header: useBreakpointValue at line 10, StoriesContextProvider around the Title, the Container 8xl, the menubar Box and the VStack of Filters and List at lines 13-28). The state stays open for the operator on [[239f17128896]].
