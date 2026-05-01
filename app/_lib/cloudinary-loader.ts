// Used by next.config.ts as `images.loaderFile`. Runs in both server and
// client contexts during render — cannot be marked `'use client'` and
// cannot use React hooks/context. Stream 04 task 02 will replace the
// hardcoded cloud name with an env var.

import { getCloudinaryImageUrl } from '@villagekit/ui'

interface CloudinaryLoaderOptions {
  src: string
  width: number
  quality?: number
}

export default function cloudinaryLoader(options: CloudinaryLoaderOptions): string {
  return getCloudinaryImageUrl({ cloudinaryName: 'villagekit', ...options })
}
