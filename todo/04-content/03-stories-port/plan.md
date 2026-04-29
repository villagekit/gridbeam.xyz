# Stories port plan — gridkit.nz → gridbeam.xyz

Per-story port plan for the 6 MDX stories under `node-modules/apps/gridkit/pages/stories/`. Stream 01 task 05 owns placement of the new `.mdx` files (target path: `content/stories/`). This document lists the diff for each, so the placement task can be mechanical.

Classifications come from `01-rebrand-copy/audit.md`. Image src paths are placeholder pending Stream 04 task 02 (image hosting decision).

## Convention for historical posts

For posts kept as historical snapshots (the two newsletters + `building-with-grid-kit`), prepend an editor's banner directly under the metadata export and before the first `<StorySection>`:

```mdx
<StoryEditorialNote>
Originally published [DATE] on gridkit.nz by the Village Kit team. Republished here as a historical record. Where this post says "Grid Kit", the same idea applies to grid beam more generally — the system is what it always was; only the brand has moved.
</StoryEditorialNote>
```

`<StoryEditorialNote>` is a new component for Stream 01 task 05 to add to the story-component set.

---

## 1. `whats-a-grid-unit.mdx` — KEEP, light edits

**Classification:** KEEP. System-focused already. Two body-text mentions to fix.

**Changes:**

| Line | Current | New |
|------|---------|-----|
| 109 | `Grid Panels are another application of Grid Units and one of the essential building blocks of Grid Kit.` | `Grid Panels are another application of Grid Units and one of the essential building blocks of the system.` |
| 134 | `ariaLabel="Carousel of things made with Grid Kit"` | `ariaLabel="Carousel of things made with grid beam"` |
| 297 | `By using a 40mm grid unit, Grid Kit is compatible with many existing components and systems …` | `By using a 40mm grid unit, grid beam is compatible with many existing components and systems …` |

Image alt texts that say "made with grid kit" (e.g. `madewithgridkit-N` filenames) stay — they're describing photos that were tagged that way; tweak only if image filenames are renamed during re-host.

Metadata: keep `title: "What's a Grid Unit"`, `category: 'guide'`. URL stays at `/stories/whats-a-grid-unit`.

---

## 2. `building-with-grid-kit.mdx` — KEEP as historical (rename optional)

**Classification:** KEEP-as-historical. Editor's banner above the body. Optional rename of the file slug; the URL change costs more than it gains.

**Decision recommended:** keep filename + URL (`building-with-grid-kit`) so old links don't break. Slap the editor's banner on top.

**Changes:**

| Line | Current | New |
|------|---------|-----|
| (top) | — | Insert `<StoryEditorialNote>` block per the convention above with date "23 August 2021" |
| 5 | `title: 'Building with Grid Kit'` | unchanged (historical title) |
| 6 | `description: 'A handy guide to get started building with Grid Kit.'` | unchanged (historical) |
| 203 | `…you have now completed the basic steps to get started building with Grid Kit.` | unchanged (historical) |

No body rewrites — the post is preserved as a 2021 voice. The editor's banner explicitly tells the reader the same techniques apply to grid beam as a system.

If the audit's KEEP-as-historical decision is reversed: the rewrite is straightforward — every "Grid Kit" → "grid beam", title → "Building with grid beam", file → `building-with-grid-beam.mdx`.

---

## 3. `how-to-cut-grid-beams.mdx` — KEEP, two link tweaks

**Classification:** KEEP. Practical, system-focused, no startup framing in the body.

**Changes:**

| Line | Current | New |
|------|---------|-----|
| 428 | `For further tips, advice, and inspiration, visit the Grid Kit [discussion board](https://discuss.villagekit.com/).` | `For further tips, advice, and inspiration, visit the [community forum](https://discuss.villagekit.com/).` |

**Forum link caveat (verified 2026-04-30):** `discuss.villagekit.com` is up but its TLS cert is expired — browsers will warn. Either Mikey renews the cert before this story ships, or the link points to GitHub Discussions for `villagekit/gridkit-products` instead. See `../01-rebrand-copy/url-status.md`.

No other changes. Metadata keeps `publishedAt: 2024/11/29`; this is recent and evergreen.

---

## 4. `how-to-furniture-bolts.mdx` — KEEP, three "Grid Kit" → "grid beam" tweaks + one link

**Classification:** KEEP. Practical hardware tutorial. A few "Grid Kit" mentions in the body that should be system-language.

**Changes:**

| Line | Current | New |
|------|---------|-----|
| 90 | `> All Grid Kit furniture bolts use a 4mm hex key.` | `> All grid-beam furniture bolts use a 4mm hex key.` |
| 106 | `With Grid Kit there are a few different scenarios that use different bolt/nut combinations.` | `With grid beam there are a few different scenarios that use different bolt/nut combinations.` |
| 119 | `ariaLabel="Grid of common Grid Kit connections"` | `ariaLabel="Grid of common grid-beam connections"` |
| 386 | `For further tips, advice, and inspiration, visit the Grid Kit [discussion board](https://discuss.villagekit.com).` | `For further tips, advice, and inspiration, visit the [community forum](https://discuss.villagekit.com).` |

Same forum-link caveat as story 3 (TLS cert expired on `discuss.villagekit.com`). No metadata changes.

---

## 5. `2021-winter-newsletter.mdx` — KEEP as historical, full archive

**Classification:** KEEP-as-historical. The voice is unmistakably the 2021 Village Kit team; preserving it is the point.

**Changes:**

| Line | Current | New |
|------|---------|-----|
| (top) | — | Insert `<StoryEditorialNote>` block per the convention above with date "winter 2021" |
| body | many "Grid Kit" / "we" / "our website" mentions | **unchanged** — historical voice |
| 41 | `…we’re extending the public domain modular construction system called Grid Beam …` | unchanged (this is **gold** — already credits grid beam) |
| 61 | `the prototype at [play.gridbeam.xyz](https://play.gridbeam.xyz)` | unchanged if play.gridbeam.xyz still works; otherwise drop the link inline ("the prototype we shipped at play.gridbeam.xyz") |
| 183 | `Make sure to check all of these out at [www.gridkit.nz](https://gridkit.nz)!` | unchanged (historical CTA — context makes clear this was the 2021 site) |

Verify: HEAD-check `play.gridbeam.xyz` and `gridkit.nz` at port time. Both may be retired by Stream 05.

Metadata: `publishedAt` should be set to a date in winter 2021 if not already. (Confirmed: legacy file has no `publishedAt`/`updatedAt` for this one — set both to 2021-08-15, matching the season the post describes.)

---

## 6. `2022-newsletter.mdx` — KEEP as historical, full archive

**Classification:** KEEP-as-historical. Same treatment.

**Changes:**

| Line | Current | New |
|------|---------|-----|
| (top) | — | Insert `<StoryEditorialNote>` block per the convention above with date "December 2022" |
| body | many "Grid Kit", "we", "our website" mentions | **unchanged** — historical voice |
| 177 | `[landing page](https://www.gridkit.nz)` | unchanged (historical) |
| 189 | `[design catalogue](https://www.gridkit.nz/designs)` | unchanged (historical) |
| 24 | `alt: 'Grid Kit Christmas Tree'` | unchanged (image describes the actual artefact) |

`publishedAt` likely set already from frontmatter; verify before port.

---

## Cross-cutting changes (apply to all 6 files)

### Image `src` paths

After Stream 04 task 02 lands, every `src='v1/gridkit.nz/...'` becomes the new path. Suggested global find-and-replace at port time:

```sh
# Within each story:
find . -name '*.mdx' -exec sed -i 's|v1/gridkit.nz/|<NEW_PATH_PREFIX>|g' {} +
```

Replace `<NEW_PATH_PREFIX>` with whatever Stream 04 task 02 settles on (e.g. `v1/gridbeam.xyz/`).

### MDX components (Stream 01 task 05 owns)

The new website needs these components ported from `node-modules/packages/ui-mdx` and the legacy `components/story/`:

- `<StorySection>`, `<StoryRow>`, `<StoryColumn>`
- `<StoryImage>`
- `<StoryImageGrid>`
- `<StoryVideo>`
- `<VideoWrapper>` (only used in the 2021 newsletter — confirm)
- `<StoryEditorialNote>` (new — for the 3 historical pieces)
- `withStoriesLayout` (HOC pattern; consider whether app-router pages need a different layout shape)

### Internal link updates

| From | To |
|------|----|
| `/store/...` | `/suppliers` (general) or specific design at `/designs/...` |
| `https://discuss.villagekit.com/` | unchanged if alive; else GitHub Discussions for `villagekit/gridkit-products` |
| `/stories/how-to-furniture-bolts` | unchanged (path stays) |

No `/store/` links in the 6 stories' bodies (only in the homepage and FAQ).

### Metadata pass for each ported story

- Confirm `publishedAt` and `updatedAt` exist; backfill where missing.
- Update `image.src` after Stream 04 task 02.
- Add `originallyPublishedOn: 'gridkit.nz'` field to the 3 historical pieces — Stream 01 task 05 can render this as a small line under the title.

---

## Open items

1. **Slug for `building-with-grid-kit.mdx`.** Default plan: keep slug, add editor's banner. Confirm with Mikey if a redirect from `/stories/building-with-grid-beam` to the kept slug is also desired.
2. **Forum link.** HEAD-check `discuss.villagekit.com` at port time — if 200, leave links; if dead, point at GitHub Discussions.
3. **`play.gridbeam.xyz` reference.** Same.
4. **`<StoryEditorialNote>` styling.** A subtle tinted box probably suits the tone — Stream 01 task 05 owns the visual.

## Status

Plan v1, 2026-04-30. Six stories surveyed; per-story diff written; cross-cutting concerns enumerated. Stream 01 task 05 can pick this up directly when the new MDX pipeline + image hosting are in place.
