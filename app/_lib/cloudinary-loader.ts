// Used by next.config.ts as `images.loaderFile`. Runs in both server and
// client contexts during render — cannot be marked `'use client'` and
// cannot use React hooks/context. The cloud name is build-time-injected via
// the `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` env var (Next.js inlines `NEXT_PUBLIC_*`
// vars in both bundles).

import { getCloudinaryImageUrl } from '@villagekit/ui'

import { CLOUDINARY_NAME } from './cloudinary'

interface CloudinaryLoaderOptions {
  src: string
  width: number
  quality?: number
}

export default function cloudinaryLoader(options: CloudinaryLoaderOptions): string {
  return getCloudinaryImageUrl({ cloudinaryName: CLOUDINARY_NAME, ...options })
}
