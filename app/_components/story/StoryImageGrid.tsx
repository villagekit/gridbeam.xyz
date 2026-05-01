import { SimpleGrid } from '@villagekit/ui'

import { StoryImage } from './StoryImage'

interface StoryImageGridImage {
  src: string
  alt: string
  width: number
  height: number
}

type AspectRatio = 'standard' | 'wide' | 'square' | null

interface StoryImageGridProps {
  images: Array<StoryImageGridImage>
  ariaLabel: string
  columns?: { base: number; md: number }
  aspectRatio?: AspectRatio
}

export function StoryImageGrid(props: StoryImageGridProps) {
  const { images, ariaLabel, columns = { base: 2, md: 3 }, aspectRatio = 'square' } = props

  return (
    <section aria-label={ariaLabel}>
      <SimpleGrid columns={columns} gap="4">
        {images.map((image) => (
          <StoryImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            aspectRatio={aspectRatio}
            isInColumn
          />
        ))}
      </SimpleGrid>
    </section>
  )
}
