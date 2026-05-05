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

export type StoryCategory = 'guide' | 'newsletter' | 'inspiration'

export interface StoryImageMetadata {
  src: string
  alt: string
  width: number
  height: number
}

/**
 * External story — links out to inspiration content on third-party sites
 * (Ken Isaacs interviews, low-tech magazine builds, etc.). Lives only as
 * metadata; there's no in-repo MDX content because we're not hosting the
 * article.
 */
export interface ExternalStoryRef {
  /** Absolute URL the card opens in a new tab. */
  url: string
}

export interface StoryMetadata {
  title: string
  description: string
  shortDescription?: string
  category: StoryCategory
  /** Stable identifier; for external stories this is a synthetic ID, not a URL path. */
  slug: string
  image: StoryImageMetadata
  showImageInStory?: boolean
  publishedAt: string
  updatedAt: string
  originallyPublishedOn?: 'gridkit.nz'
  /** When set, this story is hosted elsewhere — render the card as an external link. */
  external?: ExternalStoryRef
}

export interface Story {
  metadata: StoryMetadata
  /** Internal stories render via MDX; external stories link out instead and have no Content. */
  Content?: ComponentType
}

const internalStoriesBySlug: Record<string, Story> = {
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

/**
 * External "inspiration" stories — links to grid-beam coverage on third-party
 * sites. Sourced from the legacy gridkit.nz `/stories` index (see
 * `node-modules/apps/gridkit/stories.ts`); URLs and image asset IDs verified
 * still resolving on 2026-05-05.
 */
const externalStories: ReadonlyArray<Story> = [
  {
    metadata: {
      slug: 'external-faircompanies-grid-beam-builds-anything',
      category: 'inspiration',
      title: 'Grid Beam modular system builds anything, furniture to bikes',
      description: 'By Kirsten Dirksen',
      publishedAt: '2017-09-17',
      updatedAt: '2017-09-17',
      image: {
        src: 'v1/gridkit.nz/stories/linked-articles/grid-beam-modular-system-builds-anything-furniture-to-bikes_dlfnrf',
        alt: 'A grid-beam build photographed for Kirsten Dirksen’s short film: modular wooden beams used to assemble furniture and a bicycle.',
        width: 1280,
        height: 960,
      },
      external: {
        url: 'https://faircompanies.com/videos/minecraft-for-life-a-modular-system-to-build-your-own-world/',
      },
    },
  },
  {
    metadata: {
      slug: 'external-walker-art-isaacs-interview',
      category: 'inspiration',
      title: 'Enter the Matrix: An Interview with Ken Isaacs',
      description: 'By Susan Snodgrass',
      publishedAt: '2015-11-16',
      updatedAt: '2015-11-16',
      image: {
        src: 'v1/gridkit.nz/stories/linked-articles/enter-the-matrix-an-interview-with-ken-isaacs_kjd89r',
        alt: 'Ken Isaacs, Beach Matrix, installation view in Westport, Connecticut, c. 1967. Photo courtesy the artist.',
        width: 2048,
        height: 1336,
      },
      external: {
        url: 'https://walkerart.org/magazine/enter-matrix-interview-ken-isaacs',
      },
    },
  },
  {
    metadata: {
      slug: 'external-lowtech-open-modular-hardware',
      category: 'inspiration',
      title: 'How to Make Everything Ourselves: Open Modular Hardware',
      description: 'By Kris De Decker',
      publishedAt: '2012-12-15',
      updatedAt: '2012-12-15',
      image: {
        src: 'v1/gridkit.nz/stories/linked-articles/how-to-make-everything-ourselves-open-modular-hardware_nfklfe',
        alt: 'A diagram of open-source consumer goods built from interchangeable modular parts.',
        width: 750,
        height: 605,
      },
      external: {
        url: 'https://www.lowtechmagazine.com/2012/12/how-to-make-everything-ourselves-open-modular-hardware.html',
      },
    },
  },
  {
    metadata: {
      slug: 'external-hunting-shelter',
      category: 'inspiration',
      title: 'Shelter: Documenting a personal quest for non-toxic housing',
      description: 'By Eric Hunting',
      publishedAt: '2003-03-11',
      updatedAt: '2003-03-11',
      image: {
        src: 'v1/gridkit.nz/stories/linked-articles/shelter-documenting-a-personal-quest-for-non-toxic-housing_dnkflb',
        alt: 'Mud-brick castles in West Africa, illustrating Eric Hunting’s essay on shelter.',
        width: 384,
        height: 256,
      },
      external: {
        // Wayback snapshot — the original radio-weblogs.com site is long gone.
        url: 'http://web.archive.org/web/20100619061316/http://radio-weblogs.com/0119080/stories/2003/03/11/galleryUrbanNomadics.html',
      },
    },
  },
]

export const STORY_SLUGS = Object.keys(internalStoriesBySlug)

export function getStory(slug: string): Story | undefined {
  return internalStoriesBySlug[slug]
}

export function getAllStories(): Array<Story> {
  return [...Object.values(internalStoriesBySlug), ...externalStories].sort(
    (a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt),
  )
}

export function isExternalStory(metadata: StoryMetadata): boolean {
  return metadata.external != null
}
