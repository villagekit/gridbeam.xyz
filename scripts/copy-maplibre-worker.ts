#!/usr/bin/env node
// scripts/copy-maplibre-worker.ts
//
// Copies MapLibre GL's worker module and the shared chunk it imports from
// `node_modules/maplibre-gl/dist/` to `public/maplibre/`, where the site serves
// them as static files for the suppliers map (`app/_components/map/Map.tsx`
// names the copy in the map element's `workerUrl` prop).
//
// We do this because MapLibre GL 6 ships as ES modules only and loads its tile
// worker from a real URL beside its own bundle, resolved from `import.meta.url`,
// which inside Next's module graph names a hashed chunk with no worker beside
// it; the worker then fails to load and the map draws no tile. MapLibre's own
// Next.js setup (its docs, Installation, the Turbopack tab) is this copy step
// wired into `predev` and `prebuild`, so the files always match the installed
// version. Both files go, not the worker alone: the worker imports
// `./maplibre-gl-shared.mjs` by relative path. `public/maplibre/` is
// gitignored, generated from `node_modules` at build time.

import { copyFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

const dist = join(
  dirname(createRequire(import.meta.url).resolve('maplibre-gl/package.json')),
  'dist',
)
const dest = join(process.cwd(), 'public', 'maplibre')

mkdirSync(dest, { recursive: true })
for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  copyFileSync(join(dist, file), join(dest, file))
}
console.log(`Copied MapLibre GL's worker and shared chunk to ${dest}`)
