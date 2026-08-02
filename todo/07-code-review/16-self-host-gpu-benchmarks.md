# 16 — Self-host the detect-gpu benchmark files (drop the unpkg.com request)

**Status:** TODO

## Why

Every design detail page makes a browser request to a third party nobody chose:

```
https://unpkg.com/detect-gpu@5.0.70/dist/benchmarks/<gpu>.json
```

Chain (verified 2026-08-03, all present in the shipped client bundle):

- `app/designs/[id]/page.tsx` → `DesignViewerDynamic`
- `app/_components/design/DesignViewer.tsx` → `ProductProvider` / `ProductKitModule`
- `@villagekit/product-kit/src/view.tsx` → `<Sandbox>`
- `@villagekit/sandbox/src/index.tsx:45` → `useDetectGPU()` (drei), called unconditionally with **no options**
- `detect-gpu`'s default `benchmarksURL` is `https://unpkg.com/detect-gpu@<version>/dist/benchmarks`

So unpkg receives the visitor's IP address and user-agent on every design page view where the WebGL renderer string matches a known vendor prefix (`intel|apple|amd|radeon|nvidia|geforce|adreno` — i.e. most desktop visitors).

This is a privacy leak on a site whose whole pitch is "we collect almost nothing, and you can verify it". Task 02 disclosed it in the privacy policy, which is the honest short-term fix. The right fix is to not make the request.

## What

`@villagekit/sandbox` passes a self-hosted `benchmarksURL` to `useDetectGPU()` so the benchmark JSON is served from the consuming site's own origin. Then this repo's privacy policy loses its unpkg paragraph.

## Steps

- [ ] Reproduce: load `/designs/<any-id>` in a browser with the network tab open and confirm the unpkg request fires (it's conditional on the WebGL renderer string, so check on a machine with a real GPU).
- [ ] In `../gridkit`, change `packages/sandbox` to accept/default a `benchmarksURL` — drei's `useDetectGPU(props)` forwards its argument straight to `getGPUTier`. Decide between: (a) sandbox takes a `benchmarksURL` prop the host site supplies, or (b) sandbox bundles the benchmark JSON itself. (a) is simpler and keeps the bundle small; (b) means consumers get the fix for free.
- [ ] Copy `detect-gpu/dist/benchmarks/*` into whatever serves it (this repo's static assets if we go with (a)) — check the file count and total size first; it's ~a few hundred KB across many small JSON files, and only one is ever fetched per visitor.
- [ ] Version-pin awareness: the default URL embeds the `detect-gpu` version. A self-hosted copy must be refreshed when `detect-gpu` bumps, or the tier data silently goes stale. Note the coupling wherever the files land.
- [ ] Publish `@villagekit/sandbox` — **needs Mikey's go-ahead** (npm publish is decision-gated, same as task 06).
- [ ] Bump the dep here, verify the unpkg request is gone from the network tab.
- [ ] Remove the unpkg paragraph from `app/legal/privacy-policy/page.tsx`, restore "Two third parties" phrasing where it was widened, bump `lastUpdated`.

## Notes

- Fallback behaviour matters: `detect-gpu` degrades gracefully when the benchmark fetch fails (it falls back to a tier estimate), so a wrong/missing `benchmarksURL` won't break the viewer — which also means a broken self-hosted path could go unnoticed. Verify by asserting the request actually hits our origin, not just that the viewer renders.
- Same class of issue as task 06 (`LinkButton`): the fix lives in a sibling package, so it's gated on a release.
- Found during the task 02 review, not in the original 2026-08-03 code review.

## Depends on

- Nothing (but shares the npm-publish gate with task 06 — worth batching the two releases).

## Files

- `../gridkit/packages/sandbox/src/index.tsx`
- `app/legal/privacy-policy/page.tsx` (once fixed)
