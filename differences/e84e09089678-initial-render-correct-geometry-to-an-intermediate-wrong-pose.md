---
title: "Initial render: correct geometry to an intermediate wrong pose for several seconds"
status: fixed
route: /designs/5-12-13-triangle-desk
axis: visual
kind: changed
---
## Legacy

`audit/designs__5-12-13-triangle-desk/1280/legacy.png` and a probe at 1 s, 3 s and 6 s after load: the desk draws with its angled legs and separated shelves from the first frame.

## Current

`audit/designs__5-12-13-triangle-desk/{375,768,1280}/current.png` all captured the shelves stacked and overlapping at the top of one leg; the probe shows the wrong pose at 1 s and 3 s and the correct one by 6 s. The same probe on `/designs/bed-frame` and `/designs/shelf-tower` shows no such state.

## Verdict

plan 9d1770a4cd9e. Probed after the compile at 1280 on `pnpm dev`: three fresh loads with a screenshot at 1 s, 3 s and 6 s, then a 400 ms series from 0.4 s to 8 s on both sides, two loads each (Playwright at 1280 on fresh contexts, the viewer frame clipped, the shots compared side by side on a contact sheet). The desk draws its angled legs and separated shelves from its first drawn frame, about 2.0 s after navigation on the dev server (legacy's live deploy at about 1.2 s), and then turns under the viewer's auto-rotate as legacy does, the geometry the same on both sides through the whole series. The auto-rotate advances once per rendered frame (drei's OrbitControls calling update with no time delta, the same code on both sides), so the angle at a given moment follows the frame rate and not a fixed offset. The stacked and overlapping shelves the M1 captures caught are one angle of that rotation, the shelves seen edge-on, which both sides pass through between about 2 s and 4 s after navigation in the series: a capture lands in that window or not depending on when the side's first draw came and how fast it has turned since, and the M1 side drew several seconds later than legacy. A screenshot pair of this route can still differ by the rotation's angle when the two captures are not at the same offset from each side's first draw.

## Log

- 2026-09-12: Specific to this design's rotated legs; the timing is the template's (raw TypeScript compiled in the browser, the code item on `/designs/bed-frame`).
