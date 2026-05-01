// Inline Cloudinary URL builder until Stream 02 task 05 folds `ui-media`
// into `@villagekit/ui`. Mirrors the legacy implementation at
// node-modules/packages/ui-media/src/image.tsx so the eventual extraction
// is a copy-paste.

interface GetCloudinaryUrlOptions {
  src: string
  width: number
  quality?: number
}

export function getCloudinaryUrl(options: GetCloudinaryUrlOptions): string {
  const { src, width, quality = 75 } = options

  const baseUrl = 'https://res.cloudinary.com/villagekit'
  const resourceType = 'image'
  const deliveryType = 'upload'
  const transformations = `c_limit,dpr_auto,f_auto,fl_alpha,fl_lossy,w_${width},q_${quality}`

  return `${baseUrl}/${resourceType}/${deliveryType}/${transformations}/${src}`
}

interface GetCloudinaryVideoUrlOptions {
  src: string
  format?: 'mp4' | 'webm'
}

export function getCloudinaryVideoUrl(options: GetCloudinaryVideoUrlOptions): string {
  const { src, format = 'mp4' } = options

  const baseUrl = 'https://res.cloudinary.com/villagekit'
  const resourceType = 'video'
  const deliveryType = 'upload'

  return `${baseUrl}/${resourceType}/${deliveryType}/${src}.${format}`
}
