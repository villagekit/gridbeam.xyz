---
title: Story card re-ported from the legacy stories Item
status: todo
parent: fd9a92bd8abd
derived_from: fd9a92bd8abd
blocked_by: 6f90e7e24ca6
tags:
  - "worker:fable"
priority: medium
---
The story card is legacy's `components/stories/item.tsx` again, re-ported as `app/_components/stories/Item.tsx` exporting `Item`: a `HoverCardContainer` section named by the title, a `LinkBox` and a `Container maxW="md"`, the cover rendered by the ui media `Image` inline (the verdict of [[656dc6d730d7]]), a `Heading` beside an empty named `LinkOverlay`, the category badge on the palette's `100` shade with `capitalize`, a `showDate` prop, and the focus-within image shadow on a selector Chakra v3 accepts. Its three call sites (`app/page.tsx`, `app/stories/StoriesBrowser.tsx`, `app/stories/StoriesStatic.tsx`) render `Item`; the home passes `showDate={false}` as legacy's `index.tsx:302-303` did. A re-port that decides Chakra v3 shapes, so Fable. Nine items on `/`, filed there where first met and cited by the stories ledger. Record `fd9a92bd8abd`; decisions `ee86d68a`, `2032533f`, `ca677697`.

## Work

- Legacy: `../node-modules/apps/gridkit/components/stories/item.tsx` at `fce357d` (111 lines) and `apps/gridkit/stories.ts:27-32` (`StoryCategoryColors`). Current: `app/_components/StoryCard.tsx`, `app/_lib/stories.ts` (the `StoryMetadata` shape), `app/_components/story/StoryImage.tsx`.
- [[342f8aa75017]]: the file `app/_components/stories/Item.tsx`, `Item` with `metadata` and `showDate = true`; `app/_components/StoryCard.tsx` deleted; the site's `StoryMetadata` shape kept (`slug` and `external` in place of legacy's `url` and `isExternal`, `publishedAt` a string parsed with `new Date`: the catalog's shape is the stories index record's [[753b16d28130]]), so `href` is `/stories/${slug}` or `external.url`; `StoryCategoryColors` added to `app/_lib/stories.ts` as legacy's `stories.ts` had it (`guide: 'primary'`, `inspiration: 'purple'`, `newsletter: 'accentA'`) and the local `categoryLabels` and `categoryPalettes` maps gone.
- [[df00ae405803]]: `<HoverCardContainer as="section" aria-label={title}>` (exported by `1.2.0`). [[e24f5a2979c0]]: the hover and focus styles are the container's, no hand-written `_hover` or `_focusWithin` scale. [[7bb1c0ef2970]]: `<Container maxW="md">`. [[c66129279f12]]: `<Heading size="md">{title}</Heading>` and, after the content, `<LinkOverlay as={NextLink} href=... aria-label={title} />` empty, or for an external story `<LinkOverlay asChild><chakra.a href={external.url} target="_blank" rel="noopener noreferrer" aria-label={title} /></LinkOverlay>`, Chakra v2's `LinkOverlay isExternal` output in the shape `ed16aad27638` sanctions and `1.2.0`'s `LinkCard` uses (`dist/components/LinkCard.js:19-27`), since Chakra v3's `LinkOverlay` drops a `rel` prop (`node_modules/@chakra-ui/react/dist/esm/components/link/link-box.js:10`). [[7d1f5d0a8c9b]]: `<Badge css={{ backgroundColor: `${StoryCategoryColors[category]}.100`, fontSize: 'sm', fontWeight: 'normal' }}>{capitalize(category)}</Badge>`, `capitalize` from `lodash-es` (MIT, legacy's `apps/gridkit/package.json:61`; add `lodash-es` and `@types/lodash-es`, the bump named in the commit). [[2a6f442cbd7f]]: the date only when `showDate`, `toLocaleDateString('en-NZ', { day: 'numeric', month: 'numeric', year: 'numeric' })`. [[656dc6d730d7]]: `<Image type="cloudinary" {...image} className="stories-item-image" sizes={{ base: 'md' }} css={{ aspectRatio: '4 / 3', borderRadius: 'xl', boxShadow: 'md', marginBottom: 4, objectFit: 'cover', width: '100%' }} />` from `@villagekit/ui` (the story metadata's `image.src` is a Cloudinary public id, `content/stories/whats-a-grid-unit.mdx:15-20`); `md` is a size name `1.2.0` knows (`dist/hooks/useSizeWidths.js`), so no `full` is needed here. [[150c408aba5a]]: the focus-within shadow as `css={{ _focusWithin: { '& .stories-item-image': { boxShadow: 'outlineLarge' } } }}` on the `Container`, the nested selector form Chakra v3's `css` accepts, so the console no longer prints `Using kebab-case for css properties in objects is not supported` for a card.
- `app/_components/story/StoryImage.tsx` stays: the story pages' MDX components import it (`app/_components/story/index.ts`), and that use is the story pages record `56e6eb197e6c`'s (its item `09c3946b1912`).
- The same change closes items on `/stories` that describe the card: read [[81fe5de78974]] (the date format), [[2b12ca93bdd3]] (the badge shade) and [[1cfa347f2c9c]] (the external icon's color and size) and fix each whose text this change meets, the Outcome naming them; the ledger is the current state, whichever record's route an item sits on. The icon's exposure, [[2c38c9e6a5da]], is not this slice's to close: its Log asks the operator (rule 5) before legacy's unnamed image is restored, so `Item` renders the icon as legacy's `item.tsx:99` does, line for line, and the item gets a note saying so and stays `regression` for the stories index record's split or verdicts plan.
- Interfaces: consumes the mounted `MediaProvider` (`Shell: MediaProvider mounted for the home's ui Image and Video`); produces `Item` for the page re-port and the stories index record.
- Verify first: `grep -rn 'StoryCard' app` prints exactly the component and its three call sites; `grep -n 'HoverCardContainer' node_modules/@villagekit/ui/dist/index.d.ts` prints the export.
- Not this slice: the row the cards sit in on `/` (the page re-port's [[01bf9692dcea]]); the two fixed cards ([[774792ad37d6]], the page re-port's); the stories index's grid, filters and catalog shape.

## Seams under test

None pure; the proof is the aria tree, the console and the pairs on `/` and `/stories`.

## Done when

- `pnpm audit:dom --routes <a file naming / and /stories>` against a running `pnpm dev`: on `/` each story card is a `region` named by its title holding a `heading` and a `link` each named by the title, shaped as `legacy.aria.yaml`'s; on `/` no card shows a date and on `/stories` every card shows `d/m/yyyy`
- The browser console on `/stories` prints no `kebab-case` warning, and Tab onto a card shows the `outlineLarge` shadow on its image
- `pnpm audit:pages --routes <the same file>` at 375, 768 and 1280 looked at against legacy: the card's `md` width cap, the `primary.100` guide badge, the hover scale
- On `/stories` the external cards' overlay anchors render `target="_blank" rel="noopener noreferrer"` (`curl -s localhost:3000/stories | grep -o '<a[^>]*chakra-linkbox__overlay[^>]*>'`)
- `ls app/_components/stories/Item.tsx` succeeds and `ls app/_components/StoryCard.tsx` fails; `grep -rn 'from .*StoryImage' app/_components/stories` prints nothing
- The nine items are `fixed`, each `/stories` item the Outcome names is `fixed`, and `2c38c9e6a5da` carries its note, checked after the fixes
- `timeout 900 just check` is green

## Outcome

## Log
