// Site-side Cloudinary URL helpers.
//
// Image URLs delegate to `@villagekit/ui`'s `getCloudinaryImageUrl`.

import { getCloudinaryImageUrl } from '@villagekit/ui'

export const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'villagekit'

interface GetCloudinaryUrlOptions {
  src: string
  width: number
  quality?: number
}

export function getCloudinaryUrl(options: GetCloudinaryUrlOptions): string {
  return getCloudinaryImageUrl({ cloudinaryName: CLOUDINARY_NAME, ...options })
}
