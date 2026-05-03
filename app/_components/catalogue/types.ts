import type { StaticImageData } from 'next/image'

// One entry in a catalogue (a design, a part, etc).
export interface CatalogueItemData<Tag extends string = string> {
  id: string
  name: string
  description?: string
  categories: ReadonlyArray<Tag>
  image: StaticImageData | null
  active?: boolean
  inactiveMessage?: string
}

export const SORT_OPTIONS = {
  'name-asc': 'Name (A to Z)',
  'name-desc': 'Name (Z to A)',
} as const

export type SortOption = keyof typeof SORT_OPTIONS
