// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/story/story-image-grid.tsx
'use client'

import {
  HStack,
  type ImageProps,
  RasterImage,
  type RasterImagePropsWithOptionalSizes,
  VStack,
  useBreakpointValue,
} from '@villagekit/ui'
import { range } from 'lodash-es'

type GridSize = { numRows: number; numColumns: number }
type GridSizes = { base: GridSize; md: GridSize }

interface StoryImageGridProps {
  images: Array<RasterImagePropsWithOptionalSizes>
  sizes: GridSizes
  aspectRatio?: ImageProps['aspectRatio']
}

export function StoryImageGrid(props: StoryImageGridProps) {
  const { images, sizes, aspectRatio } = props

  const gridSize = useBreakpointValue(sizes)
  if (gridSize == null) {
    throw new Error('StoryImageGrid: Breakpoint size not found')
  }

  const { numRows, numColumns } = gridSize

  const imageSizes = {
    base: ['100%', numColumns] as ['100%', number],
    md: ['1024px', numColumns] as ['1024px', number],
  }

  return (
    <VStack>
      {range(numRows).map((rowIndex) => (
        <HStack key={rowIndex}>
          {range(numColumns).map((columnIndex) => {
            // Legacy indexes past the end of a short image list, so the last cell of
            // a five-image grid is a RasterImage with no src (difference 0e4002cba0a5);
            // the assertion keeps that line under noUncheckedIndexedAccess.
            const image = images[rowIndex * numColumns + columnIndex]!
            return (
              <RasterImage
                key={`${rowIndex}-${columnIndex}`}
                {...image}
                sizes={imageSizes}
                aspectRatio={aspectRatio}
                css={{ minWidth: 0, minHeight: 0, flex: '1 1 0' }}
              />
            )
          })}
        </HStack>
      ))}
    </VStack>
  )
}
