import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// No incrementalCache — gridbeam.xyz has no ISR or fetch-cache.
// Add r2IncrementalCache here if ISR is introduced later.
export default defineCloudflareConfig({})
