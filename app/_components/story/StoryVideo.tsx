import { Box } from '@villagekit/ui'

import { getCloudinaryVideoUrl } from '../../_lib/cloudinary'

type AspectRatio = 'standard' | 'wide' | 'square'

interface StoryVideoProps {
  src: string
  title: string
  aspectRatio?: AspectRatio
  isInColumn?: boolean
}

const aspectRatioMap: Record<AspectRatio, string> = {
  standard: '4 / 3',
  wide: '16 / 9',
  square: '1 / 1',
}

export function StoryVideo(props: StoryVideoProps) {
  const { src, title, aspectRatio = 'standard' } = props

  return (
    <Box
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
      width="100%"
      aspectRatio={aspectRatioMap[aspectRatio]}
    >
      {/* biome-ignore lint/a11y/useMediaCaption: silent build/process demo videos — no audio to caption */}
      <video
        title={title}
        controls
        preload="metadata"
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={getCloudinaryVideoUrl({ src, format: 'mp4' })} type="video/mp4" />
      </video>
    </Box>
  )
}
