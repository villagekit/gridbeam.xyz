---
title: Editor’s note exposed as a note landmark
status: regression
route: /stories/building-with-grid-kit
axis: accessibility
kind: added
---
## Legacy

No note.

## Current

`app/_components/story/StoryEditorialNote.tsx:23-24` `role="note" aria-label="Editor's note"`; `:38-48` the icon is `aria-hidden` yet carries an svg `<title>Editor's note</title>`; `audit/stories__building-with-grid-kit/dom/current.aria.yaml:58-60` `note "Editor's note"`.

## Verdict

## Log

- 2026-09-25: Regression (story grilling P3, [[dcd8df79a843]]). The editorial note, the originally-on byline and the note component are removed; the historical posts keep "Grid Kit" in their text as legacy published it.
