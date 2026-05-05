// Autoplay/loop/muted/playsInline video, used in the home-page "one modular
// kit" section. Mirrors `@villagekit/ui`'s Video component (which is gated on
// MediaProvider context this app doesn't wire up); rolling a tiny local copy
// avoids that coupling.

import { Box } from '@villagekit/ui'

import { getCloudinaryUrl, getCloudinaryVideoUrl } from '../../_lib/cloudinary'

interface LandingVideoProps {
  src: string
  posterSrc: string
  title: string
  width: number
  height: number
}

export function LandingVideo(props: LandingVideoProps) {
  const { src, posterSrc, title, width, height } = props

  const posterUrl = getCloudinaryUrl({ src: posterSrc, width })

  return (
    <Box
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
      w="full"
      aspectRatio={`${width} / ${height}`}
    >
      <video
        title={title}
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={getCloudinaryVideoUrl({ src, format: 'webm' })} type="video/webm" />
        <source src={getCloudinaryVideoUrl({ src, format: 'mp4' })} type="video/mp4" />
      </video>
    </Box>
  )
}
