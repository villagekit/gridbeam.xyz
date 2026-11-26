---
paths:
  - "app/**"
  - "content/**"
---

# The app

## Copy

Visitor-facing copy is the operator's (`ca677697`). No agent writes, rewords or shortens visitor-facing text: copy comes verbatim from the legacy source, or from the verdict of a sanctioned difference.

- No em dash in copy written for this port (`64ee4dfa`). Legacy's own em dashes are kept (`edad0df8`).
- American English spelling on every route (`6fce53c0`).
- Historical posts keep the Grid Kit name (`dcd8df79`).
- Store CTAs ship as "Buy a Grid Beam", linking to `/suppliers` (`5dfd8249`).

## The route and the shell

- A route lives under `app/<path>/`. It consumes the shell (`app/layout.tsx`, `app/theme.ts`, `app/_components/Site*`, `app/_lib/nav.ts`) and the shared components under `app/_components/`.
- A difference that a shell change closes is filed on `shell`, never per route.
- Before shaping an interface, read how the legacy author shaped the same one in `../node-modules`, and take that shape as the default. A helper the current code invented is a difference (the `parity` skill's code family). The legacy author's pattern is the standard a new edge is measured against.
- A drifted route is re-ported from the legacy source and translated: pages router to app router, Chakra v2 to v3, framer-motion to motion. A faithful route is fixed in place. In doubt, re-port (`ee86d68a`).
- The six story pages are `app/stories/<slug>/page.mdx`, under `app/_components/layouts/StoriesLayout.tsx`. The two designs pages sit under `app/designs/layout.tsx`, which mounts `app/_components/layouts/CatalogueLayout.tsx`.
- The subscribe form's modules sit beside its page: `SubscribePage.tsx`, `SubscribeForm.tsx`, `schema.ts`, `types.ts`.
- `app/_components/Toaster.tsx` is the toast store and region copied from the ui sibling, until the publish that exports them. The bump deletes it.
- New media is published from inside `../media` with `pnpm sync-media`. Media assets are published from `media/gridbeam.xyz/` in the media repo, so a Cloudinary public ID carries the `gridbeam.xyz/` prefix (`6b7a97f83ce7`). A re-hosted asset is the same picture unless a difference says otherwise.
- The references, after the legacy author's approach: the Next.js conventions, the Chakra recipes and the react-three-fiber idioms.
- Public exports sit near the top of a module and private helpers further down. A doc comment is one paragraph.

## Logging and the environment

- The levels are `console.error` for breakage, `console.warn` for degraded but recoverable, `console.info` for lifecycle, and `console.debug` for operational and per-entry detail.
- Client-side `console.*` lands in the visitor's browser console, so no debug-level line ships to production.
- No hot path needs throttling.
- `BUTTONDOWN_API_KEY` is typed in `env.d.ts`. With it unset, the subscribe page degrades gracefully.

## Tests

- The 3D canvas is checked by eye on `pnpm dev`.
