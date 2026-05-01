import type { ComponentType } from 'react'

import TwentyTwentyOneWinterNewsletter, {
  metadata as twentyTwentyOneWinterNewsletter,
} from '@/content/stories/2021-winter-newsletter.mdx'
import TwentyTwentyTwoNewsletter, {
  metadata as twentyTwentyTwoNewsletter,
} from '@/content/stories/2022-newsletter.mdx'
import BuildingWithGridKit, {
  metadata as buildingWithGridKit,
} from '@/content/stories/building-with-grid-kit.mdx'
import HowToCutGridBeams, {
  metadata as howToCutGridBeams,
} from '@/content/stories/how-to-cut-grid-beams.mdx'
import HowToFurnitureBolts, {
  metadata as howToFurnitureBolts,
} from '@/content/stories/how-to-furniture-bolts.mdx'
import WhatsAGridUnit, { metadata as whatsAGridUnit } from '@/content/stories/whats-a-grid-unit.mdx'

export type StoryCategory = 'guide' | 'newsletter'

export interface StoryImageMetadata {
  src: string
  alt: string
  width: number
  height: number
}

export interface StoryMetadata {
  title: string
  description: string
  shortDescription?: string
  category: StoryCategory
  slug: string
  image: StoryImageMetadata
  showImageInStory?: boolean
  publishedAt: string
  updatedAt: string
  originallyPublishedOn?: 'gridkit.nz'
}

export interface Story {
  metadata: StoryMetadata
  Content: ComponentType
}

const storiesBySlug: Record<string, Story> = {
  'whats-a-grid-unit': {
    metadata: whatsAGridUnit as unknown as StoryMetadata,
    Content: WhatsAGridUnit,
  },
  'how-to-cut-grid-beams': {
    metadata: howToCutGridBeams as unknown as StoryMetadata,
    Content: HowToCutGridBeams,
  },
  'how-to-furniture-bolts': {
    metadata: howToFurnitureBolts as unknown as StoryMetadata,
    Content: HowToFurnitureBolts,
  },
  'building-with-grid-kit': {
    metadata: buildingWithGridKit as unknown as StoryMetadata,
    Content: BuildingWithGridKit,
  },
  '2022-newsletter': {
    metadata: twentyTwentyTwoNewsletter as unknown as StoryMetadata,
    Content: TwentyTwentyTwoNewsletter,
  },
  '2021-winter-newsletter': {
    metadata: twentyTwentyOneWinterNewsletter as unknown as StoryMetadata,
    Content: TwentyTwentyOneWinterNewsletter,
  },
}

export const STORY_SLUGS = Object.keys(storiesBySlug)

export function getStory(slug: string): Story | undefined {
  return storiesBySlug[slug]
}

export function getAllStories(): Array<Story> {
  return Object.values(storiesBySlug).sort(
    (a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt),
  )
}
