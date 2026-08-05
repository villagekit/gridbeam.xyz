# 19 — `@villagekit/ui` claims Next is optional, but three components hard-require it

**Status:** TODO (lives in `../ui`; found while doing [task 06](./06-linkbutton-nextlink.md))

## Why

`../ui/package.json` declares `next` as a peer dependency with `peerDependenciesMeta.next.optional = true`, and `../ui/README.md` says nothing to contradict it. But three components exported from the package root import Next unconditionally:

- `src/components/layouts/Footer.tsx:4` — `import NextLink from 'next/link'`
- `src/components/nav/NavBar.tsx:4-5` and `nav/NavList.tsx` — `next/link` + `usePathname` from `next/navigation`
- `src/mdx/link.tsx` — `next/link` (added in 1.2.0 by task 06)

A non-Next consumer that imports anything from `@villagekit/ui` fails at module resolution, because the barrel pulls all of these in. The optional flag is a lie today.

## What

The declared dependency surface matches reality — either by making the package genuinely framework-agnostic, or by admitting Next is required.

## Steps

- [ ] Decide the posture. Two coherent options:
  - **Make it true.** Give `Footer`, `NavBar`/`NavList`, and `MdxLink` the same treatment `LinkButton` got in 1.2.0 — a `linkComponent`/`as` prop, or a `LinkComponentProvider` context that consumers set once at the root. `usePathname` in the nav is the harder half: it would need an injected `currentPath` (or an `isSelected` predicate) instead. This is the right answer *if* a non-Next consumer is actually wanted.
  - **Admit it.** Drop `peerDependenciesMeta.next.optional`, make `next` a required peer, and say so in the README. Cheaper, honest, and costs nothing if every consumer is a Next site.
- [ ] Check who actually consumes `@villagekit/ui`: this site, `villagekit.com` (in `../node-modules`), and `../gridkit`'s studio/sandbox. If all are Next, option two is likely right — but the sandbox may be the exception worth checking, since it also runs inside a Tauri app.
- [ ] Whichever way: update `../ui/README.md` and `package.json`, and bump/publish (**publish is gated on Mikey**).

## Notes

- A `LinkComponentProvider` context would also let the site stop repeating `as={NextLink}` at ~30 call sites — worth weighing against the explicitness of the current prop. Legacy passed `as={NextLink}` explicitly everywhere, so the prop approach is the legacy-faithful default; a context is the "re-think from first principles" option and needs a stated reason.
- Not urgent: every current consumer is a Next app, so nothing is broken in practice. This is a correctness-of-metadata task.

## Depends on

- Nothing.

## Files

- `../ui/package.json`, `../ui/README.md`, `../ui/src/components/layouts/Footer.tsx`, `../ui/src/components/nav/*`, `../ui/src/mdx/link.tsx`
