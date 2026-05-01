// Used by next.config.ts as `images.loaderFile`. Runs in both server and
// client contexts during render — cannot be marked `'use client'`. Mirrors
// `getCloudinaryUrl` in ./cloudinary.ts; will be replaced when Stream 02
// task 05 (`@villagekit/ui/media`) lands.

interface CloudinaryLoaderOptions {
  src: string
  width: number
  quality?: number
}

export default function cloudinaryLoader(options: CloudinaryLoaderOptions): string {
  const { src, width, quality = 75 } = options

  const baseUrl = 'https://res.cloudinary.com/villagekit'
  const transformations = `c_limit,dpr_auto,f_auto,fl_alpha,fl_lossy,w_${width},q_${quality}`

  return `${baseUrl}/image/upload/${transformations}/${src}`
}
