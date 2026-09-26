---
title: "Story data export: metadata to story on the six page.mdx files, the page metadata built from it"
status: open
route: /stories/whats-a-grid-unit
axis: code
kind: changed
---
## Legacy

`apps/gridkit/pages/stories/whats-a-grid-unit.mdx:5-19` at `fce357d` `export const metadata = { title, description, category, url, image, publishedAt, updatedAt }`, the same name on the other five pages; `apps/gridkit/stories.ts:3-8` imports each as `metadata as <name>`; `apps/gridkit/components/layouts/stories.tsx:35-53` turns it into the page's head with `NextSeo` (the title, `shortDescription || description`, the article Open Graph with the cover at width 1200). The pages router read nothing from the export's name.

## Current

Filed at the split of the story pages record [[56e6eb197e6c]] for the shape its page re-port ships: six `app/stories/<slug>/page.mdx` with `export const story = { ... }` (legacy's object, renamed), `export const metadata = getStoryPageMetadata(story)` (the `NextSeo` block's app-router form, `fcdf83c992a1`) and `export default withStoriesLayout(story)`; `app/_lib/stories.ts` importing `story as <name>`. The app router reads a page module's `metadata` export as the page's metadata (`node_modules/next/dist/lib/metadata/resolve-metadata.js:294-303`: `generateMetadata` when it is a function, else `mod.metadata`) and refuses a page module that exports both `metadata` and `generateMetadata` (the SWC check, `"metadata" and "generateMetadata" cannot be exported at the same time`), so under legacy's name the story's object would be read as the page's head: its `title` and `description` (the newsletters' long `description` where legacy's `NextSeo` used `shortDescription`), its `category` as Next's `category` meta, and no article Open Graph. Until the re-port ships, the site reads the six files from `content/stories/` through the `[slug]` route ([[9c48718ec6f8]]), where the name is free.

## Verdict

## Log

- 2026-09-26: Filed at the split of the story pages record [[56e6eb197e6c]] and handed to the operator on the attended verdicts plan [[14be8f377b34]] (decision 40abdb2f222a), the stories index split's shape for e3a2d4d66691: the page re-port [[4331147cc118]] ships the rename by default and adds a note here citing the files when it lands. Not judged by an agent; the state stays until the operator judges it.

- 2026-09-26: Shipped by the page re-port (plan 4331147cc118) as the shape the port rule gives, no verdict having landed: the six files app/stories/whats-a-grid-unit/page.mdx, app/stories/how-to-cut-grid-beams/page.mdx, app/stories/how-to-furniture-bolts/page.mdx, app/stories/building-with-grid-kit/page.mdx, app/stories/2021-winter-newsletter/page.mdx and app/stories/2022-newsletter/page.mdx each export story (legacy's metadata object), metadata built from it by getStoryPageMetadata in app/_components/layouts/StoriesLayout.tsx, and default withStoriesLayout(story); app/_lib/stories.ts and app/page.tsx import story as legacy's stories.ts and index.tsx imported metadata. The item stays open for the operator.
