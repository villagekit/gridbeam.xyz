---
title: "Story pages: the operator's verdicts"
status: todo
tags:
  - attended
parent: 337e35d86920
derived_from: 56e6eb197e6c
---
The differences on the story routes that the story pages record `56e6eb197e6c` cannot close by rule: four `regression` items whose M1 note asks for the operator's call before legacy's form is restored (rule 5), and one `open` code item the split filed for the name the app router forces on the story pages (a rule 4 candidate). Decision `40abdb2f222a`: the record's split minted this plan beside it, so that a verdict given before the components, the inline MDX and the page slices run shapes them; each of those slices ships legacy's form for an unjudged item (the faq split's call) and closes it, so a verdict on a `regression` item is wanted before its slice runs or not at all, while the `open` item waits; an item a slice's review files later for the operator is added to the list below by the slice's note and by the finish, which mints no second plan; the parity gate `f7a700a3e482` is `blocked_by` this plan, so the operator's review of the site comes after their verdicts. Each item keeps its state until the operator judges it.

wants: the operator's verdicts on the items below.

## Work

For each item, read it (`kipu show <id>`), then: `kipu sanction <id> --outcome -` or `kipu dismiss <id> --outcome -` with the verdict naming the rule or the call; or leave a `regression` item as it is and let the slice that names it ship legacy's form, or move the `open` one to `regression` (`kipu move <id> regression --from open`) with a slice minted for the shape wanted. No verdict text is written by an agent (`2032533f`, `ca677697`).

- [[0e005a229aee]] (`open`, code, changed): the story data export on the six `page.mdx` files is `story` where legacy's was `metadata`, with a `metadata` built from it by a helper, because Next reads a page module's `metadata` export as the page's metadata (`node_modules/next/dist/lib/metadata/resolve-metadata.js:294-303`) and refuses `generateMetadata` beside it, so legacy's name on a page module would be read as the page's head (its `title` and `description`, the newsletters' long description where legacy's `NextSeo` used `shortDescription`; its `category` as Next's `category` meta; no article Open Graph). Filed at the split for the shape the page re-port (`Story pages re-ported as six page.mdx routes under legacy's StoriesLayout, the [slug] route, the catalog lookup and content/stories gone`) ships. Sanctioned under rule 4, the one change the app router forces on legacy's six pages, or is another shape wanted (the current `[slug]` route over `content/stories/`, whose item [[9c48718ec6f8]] the re-port closes)?
- [[0e4002cba0a5]] (`regression`, accessibility, removed): legacy's `story-image-grid.tsx:40-48` renders `numRows` by `numColumns` cells over five images on `/stories/how-to-furniture-bolts`, so the sixth cell is a `RasterImage` with no `src`, an unnamed `img` after the five (`audit/stories__how-to-furniture-bolts/dom/legacy.aria.yaml:71`); the current grid maps the images alone. The components slice (`Story components re-ported from legacy's components/story, with the mdx overrides, the Tip and every story call site`) ports legacy's grid line for line and the cell returns: Next 15.5 renders it `unoptimized` without throwing (`node_modules/next/dist/shared/lib/get-img-props.js:276-280`) and logs `Image is missing required "src" property` to the browser console in development (`node_modules/next/dist/client/image-component.js:150`). Sanctioned under rule 5 (the grid skips a missing image, the tree then five `img`s), or legacy's form kept and the item closed by the slice?
- [[e834d73bbbd5]] and [[5d81b89c4799]] (`regression`, accessibility, changed): legacy's carousels expose `react-responsive-carousel`'s defaults, buttons named `previous slide / item` and `next slide / item`, indicators named `slide item`, and the loop's cloned first and last slides (`apps/gridkit/components/image-carousel.tsx:93-146`), twenty buttons and thirty-seven indicators on the 2022 newsletter; the current grids expose one named region per gallery. The components slice restores the carousels for the interaction items ([[d090ce55d1bc]], [[2bb459b9f5db]]) and the library's names and clones return with them. Sanctioned under rule 5 (the names and clones bettered, which the accessibility pass after M2 would do, note `eeba2a65cee4`), or legacy's form kept and the items closed by the slice?
- [[8a6daf7fad72]] (`regression`, code, removed): legacy's MDX carried unused imports (`how-to-cut-grid-beams.mdx:1-5`, `2021-winter-newsletter.mdx:1,3,5`, `2022-newsletter.mdx:1-11`) and two commented-out `/todo` links (`building-with-grid-kit.mdx:81,176`); the current files import what they render. The M1 note's premise that restoring them fails Biome does not hold (Biome reads no `.mdx`); one line, 2021's `import { VideoWrapper } from '@villagekit-private/ui-mdx'`, names an export the package never had and cannot be written. The inline MDX slice (`Story pages: the install video on react-youtube, the creations intro and the closing line as Descriptions, and the unused legacy imports restored in the MDX`) restores the rest by default. Sanctioned under rule 5 (the imports stay dropped: no rendered effect, and one of them never resolved), or legacy's form kept and the item closed by the slice?

## Seams under test

None.

## Done when

- Every item above is `sanctioned`, `dismissed`, `fixed` by the slice that names it, or `regression` with a slice minted for the shape wanted; `kipu list --collection difference --filter route=/stories/whats-a-grid-unit --status open` prints nothing (checked when this plan is finished)
- `kipu verify --warnings-as-errors` is green

## Outcome

## Log

- 2026-09-26: Added by the components slice (plan [[373320c95e55]]): [[94b21887102b]] (open, accessibility, changed, /stories/2021-winter-newsletter, shared with /stories/2022-newsletter): legacy's carousel indicators are in the accessibility tree as img "slide item" (four before each gallery's previous button), while Chakra v3's Icon writes aria-hidden="true" on the same line of the re-ported ImageCarousel, so the current tree holds an empty list; the buttons, clones and clicks are legacy's. The same mechanism as [[89301ca8a1fc]] and [[1ea1f9eda079]], which the shell's and the home's verdicts plans hold. Sanctioned under rule 4 (Chakra v3's Icon default), or the site writes aria-hidden={false} on the indicator (a site-side line the carousel slice would own) and the item moves to regression?

- 2026-09-26: Also from the components slice (plan [[373320c95e55]]), after its Parity review: [[fee183274ff6]] is the 2022 newsletter's twin of [[94b21887102b]] above (open, the same question, one item per route). Two regression items the review found on the restored galleries, [[e5f7c103b8bf]] and [[f2e4bf3755c7]] (visual, the carousel arrows' chevron 20px at a 14px button font where legacy's is 16px at 16px, Chakra v3's button recipe _icon size, which the ui recipes slice 2bd0169a6dda keeps), are not this plan's: the fix is the button recipe's _icon in ../ui, a ui slice for the story pages record's finish to mint beside the shell record, blocking the bump plan.
