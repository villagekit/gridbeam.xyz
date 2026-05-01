import { Box } from '@villagekit/ui'
import NextImage from 'next/image'

type AspectRatio = 'standard' | 'wide' | 'square' | null

interface StoryImageProps {
  src: string
  alt: string
  width: number
  height: number
  aspectRatio?: AspectRatio
  isInColumn?: boolean
  priority?: boolean
}

const aspectRatioMap: Record<Exclude<AspectRatio, null>, string> = {
  standard: '4 / 3',
  wide: '16 / 9',
  square: '1 / 1',
}

export function StoryImage(props: StoryImageProps) {
  const {
    src,
    alt,
    width,
    height,
    aspectRatio = 'standard',
    isInColumn = false,
    priority = false,
  } = props

  const sizes = isInColumn ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 1024px, 100vw'

  const aspectRatioValue = aspectRatio == null ? undefined : aspectRatioMap[aspectRatio]

  return (
    <Box
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
      position="relative"
      width="100%"
      aspectRatio={aspectRatioValue}
    >
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  )
}
