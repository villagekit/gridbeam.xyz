// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/stories.ts
import type { ComponentType } from 'react'

import TwentyTwentyOneWinterNewsletter, {
  metadata as winterNewsletter,
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

export type StoryCategory =
  // 'article' |
  'guide' | 'inspiration' | 'newsletter'

export type StoryMetadata = {
  title: string
  description?: string
  shortDescription?: string
  category: StoryCategory
  slug: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  showImageInStory?: boolean
  external?: { url: string }
  publishedAt: string
  updatedAt: string
}

export const StoryCategoryColors: Record<StoryCategory, string> = {
  // article: 'TODO',
  guide: 'primary',
  inspiration: 'purple',
  newsletter: 'accentA',
}

const linkedStories: Array<StoryMetadata> = [
  {
    category: 'inspiration',
    description: 'By Kirsten Dirksen',
    image: {
      alt: 'Modular system for DIY builds',
      height: 960,
      src: 'v1/gridkit.nz/stories/linked-articles/grid-beam-modular-system-builds-anything-furniture-to-bikes_dlfnrf.jpg',
      width: 1280,
    },
    external: {
      url: 'https://faircompanies.com/videos/minecraft-for-life-a-modular-system-to-build-your-own-world/',
    },
    publishedAt: '2017-09-17',
    title: 'Grid Beam modular system builds anything, furniture to bikes',
    updatedAt: '2021-09-29',
    slug: 'external-faircompanies-grid-beam-builds-anything',
  },
  {
    category: 'inspiration',
    description: 'By Susan Snodgrass',
    image: {
      alt: 'Ken Isaacs, Beach Matrix, installation view in Westport, Connecticut, c. 1967. Photo courtesy the artist',
      height: 1336,
      src: 'v1/gridkit.nz/stories/linked-articles/enter-the-matrix-an-interview-with-ken-isaacs_kjd89r.jpg',
      width: 2048,
    },
    external: {
      url: 'https://walkerart.org/magazine/enter-matrix-interview-ken-isaacs',
    },
    publishedAt: '2015-11-16',
    title: 'Enter the Matrix: An Interview with Ken Isaacs',
    updatedAt: '2021-09-29',
    slug: 'external-walker-art-isaacs-interview',
  },
  {
    category: 'inspiration',
    description: 'By Kris De Decker',
    image: {
      alt: 'Open source consumer goods',
      height: 605,
      src: 'v1/gridkit.nz/stories/linked-articles/how-to-make-everything-ourselves-open-modular-hardware_nfklfe.jpg',
      width: 750,
    },
    external: {
      url: 'https://www.lowtechmagazine.com/2012/12/how-to-make-everything-ourselves-open-modular-hardware.html',
    },
    publishedAt: '2012-12-15',
    title: 'How to Make Everything Ourselves: Open Modular Hardware',
    updatedAt: '2021-09-29',
    slug: 'external-lowtech-open-modular-hardware',
  },
  {
    category: 'inspiration',
    description: 'By Eric Hunting',
    image: {
      alt: 'Castles in West Africa',
      height: 256,
      src: 'v1/gridkit.nz/stories/linked-articles/shelter-documenting-a-personal-quest-for-non-toxic-housing_dnkflb.jpg',
      width: 384,
    },
    external: {
      url: 'http://web.archive.org/web/20100619061316/http://radio-weblogs.com/0119080/stories/2003/03/11/galleryUrbanNomadics.html',
    },
    publishedAt: '2003-03-11',
    title: 'Shelter: Documenting a personal quest for non-toxic housing',
    updatedAt: '2021-09-29',
    slug: 'external-hunting-shelter',
  },
]

export const allStories = [
  buildingWithGridKit,
  winterNewsletter,
  twentyTwentyTwoNewsletter,
  whatsAGridUnit,
  howToFurnitureBolts,
  howToCutGridBeams,
  ...linkedStories,
] as Array<StoryMetadata>

// The [slug] route's lookup of a hosted story's MDX Content: difference 9c48718ec6f8, which the story pages record removes with the route.
const hostedStories = [
  { metadata: buildingWithGridKit, Content: BuildingWithGridKit },
  { metadata: winterNewsletter, Content: TwentyTwentyOneWinterNewsletter },
  { metadata: twentyTwentyTwoNewsletter, Content: TwentyTwentyTwoNewsletter },
  { metadata: whatsAGridUnit, Content: WhatsAGridUnit },
  { metadata: howToFurnitureBolts, Content: HowToFurnitureBolts },
  { metadata: howToCutGridBeams, Content: HowToCutGridBeams },
] as Array<{ metadata: StoryMetadata; Content: ComponentType }>

export const STORY_SLUGS = hostedStories.map((story) => story.metadata.slug)

export function getStory(slug: string) {
  return hostedStories.find((story) => story.metadata.slug === slug)
}
