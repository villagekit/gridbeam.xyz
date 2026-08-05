import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

// The test targets are pure TypeScript — bin packing, the share-link codec, catalogue
// derivation. No jsdom, no testing-library: add them when a component actually needs
// rendering, not before.
export default defineConfig({
  resolve: {
    // Mirrors the `@/*` path mapping in tsconfig.json.
    alias: { '@': dirname(fileURLToPath(import.meta.url)) },
  },
  // No `include`: vitest's default picks up `*.test.*` anywhere outside node_modules, so a test
  // added under `scripts/` or a future directory can't be silently skipped.
  test: {
    environment: 'node',
  },
})
