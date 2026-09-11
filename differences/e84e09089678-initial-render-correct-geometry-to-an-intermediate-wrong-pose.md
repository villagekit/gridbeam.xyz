---
title: "Initial render: correct geometry to an intermediate wrong pose for several seconds"
status: regression
route: /designs/5-12-13-triangle-desk
axis: visual
kind: changed
---
## Legacy

`audit/designs__5-12-13-triangle-desk/1280/legacy.png` and a probe at 1 s, 3 s and 6 s after load: the desk draws with its angled legs and separated shelves from the first frame.

## Current

`audit/designs__5-12-13-triangle-desk/{375,768,1280}/current.png` all captured the shelves stacked and overlapping at the top of one leg; the probe shows the wrong pose at 1 s and 3 s and the correct one by 6 s. The same probe on `/designs/bed-frame` and `/designs/shelf-tower` shows no such state.

## Verdict

## Log

- 2026-09-12: Specific to this design's rotated legs; the timing is the template's (raw TypeScript compiled in the browser, the code item on `/designs/bed-frame`).
