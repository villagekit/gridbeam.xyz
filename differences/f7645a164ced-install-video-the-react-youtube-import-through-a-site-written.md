---
title: "Install video: the react-youtube import through a site-written use client re-export module"
status: open
route: /stories/how-to-furniture-bolts
axis: code
kind: added
---
## Legacy

`apps/gridkit/pages/stories/how-to-furniture-bolts.mdx:1` at `fce357d` imports the player from the package: `import YouTube from '@u-wave/react-youtube'` (`how-to-cut-grid-beams.mdx:1` the same line, unused). The pages router rendered the MDX on the client, so the class component needed no boundary.

## Current

`app/_components/YouTube.tsx:1,9`: a `'use client'` module whose one export is `export { default } from '@u-wave/react-youtube'`; `content/stories/how-to-furniture-bolts.mdx:1` and `how-to-cut-grid-beams.mdx:1` import `YouTube` from it. The package is a class component with no directive (`node_modules/@u-wave/react-youtube/dist/react-youtube.es.js` extends `React.Component`) and the story MDX modules are evaluated in the server layer (the page renders them and `app/_lib/stories.ts` imports them), where React's server build has no `Component` (`grep -c 'exports.Component' node_modules/next/dist/compiled/react/cjs/react.react-server.production.js` prints 0), so the app router forces the boundary. Legacy's line itself, the props and the rendered iframe are unchanged (`d1fb9b4c176c`, fixed). A rule 4 candidate, filed by the slice that wrote the module and left for the rules to judge.

## Verdict

## Log

- 2026-09-26: The story MDX files moved with the page re-port (plan 4331147cc118): a path content/stories/<slug>.mdx in the text above now reads app/stories/<slug>/page.mdx, the same body at the same lines plus one import line and two export lines after the story object.
