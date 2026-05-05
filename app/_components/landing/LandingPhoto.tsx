// Static rounded-corner photo used in landing sections (sustainability,
// community, etc.) where there's no carousel or video — just a single image
// next to a copy block. Sibling to `LandingVideo` and `ImageCarousel`.

import { Box } from '@villagekit/ui'
import NextImage from 'next/image'

interface LandingPhotoProps {
  src: string
  alt: string
  width: number
  height: number
}

export function LandingPhoto(props: LandingPhotoProps) {
  const { src, alt, width, height } = props
  return (
    <Box
      position="relative"
      w="full"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      aspectRatio={`${width} / ${height}`}
    >
      <NextImage src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" />
    </Box>
  )
}
