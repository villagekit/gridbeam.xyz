// Site-side Cloudinary URL helpers.
//
// Image URLs delegate to `@villagekit/ui`'s `getCloudinaryImageUrl`. The
// video URL builder stays local because the legacy ui-media `Video`
// component generates a different URL shape (per-format `<source>` with
// shared transformations) than the site's `StoryVideo`, which uses
// per-format full URLs without transformations. Stream 04 task 02 will
// replace the hardcoded cloud name with an env var.

import { getCloudinaryImageUrl } from '@villagekit/ui'

const CLOUDINARY_NAME = 'villagekit'

interface GetCloudinaryUrlOptions {
  src: string
  width: number
  quality?: number
}

export function getCloudinaryUrl(options: GetCloudinaryUrlOptions): string {
  return getCloudinaryImageUrl({ cloudinaryName: CLOUDINARY_NAME, ...options })
}

interface GetCloudinaryVideoUrlOptions {
  src: string
  format?: 'mp4' | 'webm'
}

export function getCloudinaryVideoUrl(options: GetCloudinaryVideoUrlOptions): string {
  const { src, format = 'mp4' } = options
  return `https://res.cloudinary.com/${CLOUDINARY_NAME}/video/upload/${src}.${format}`
}
