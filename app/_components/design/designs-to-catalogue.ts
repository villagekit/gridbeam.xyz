import type { CatalogueItemData } from '@/app/_components/catalogue'
import type { DesignIndexEntry } from '@/app/_lib/designs'

// `furniture` is on almost every design — too generic to be a useful filter.
const EXCLUDED_TAGS = new Set(['furniture'])

// Curated label + display order for design tags. Tags discovered at runtime
// that aren't in this map are appended alphabetically at the end with a
// title-cased fallback.
const TAG_LABELS: ReadonlyArray<[string, string]> = [
  ['bedroom', 'Bedroom'],
  ['cat', 'Cats'],
  ['desk', 'Desk'],
  ['dining', 'Dining'],
  ['garage', 'Garage'],
  ['kid', 'Kids'],
  ['kitchen', 'Kitchen'],
  ['lounge', 'Lounge'],
  ['office', 'Office'],
  ['seating', 'Seating'],
  ['storage', 'Storage'],
  ['table', 'Tables'],
  ['utility', 'Utility'],
  ['workbench', 'Workbench'],
]

export function designsToCatalogueItems(
  designs: ReadonlyArray<DesignIndexEntry>,
): Array<CatalogueItemData> {
  return designs.map((d) => ({
    id: d.id,
    name: d.label,
    description: d.description,
    categories: d.tags.filter((t) => !EXCLUDED_TAGS.has(t)),
    image: d.image,
  }))
}

export function buildDesignFilterOptions(
  designs: ReadonlyArray<DesignIndexEntry>,
): Record<string, string> {
  const present = new Set<string>()
  for (const d of designs) {
    for (const t of d.tags) {
      if (!EXCLUDED_TAGS.has(t)) present.add(t)
    }
  }

  const labelMap = new Map(TAG_LABELS)
  const result: Record<string, string> = {}

  // Curated tags first, in their canonical order.
  for (const [value, label] of TAG_LABELS) {
    if (present.has(value)) {
      result[value] = label
      present.delete(value)
    }
  }

  // Anything left over: alphabetical, title-cased.
  for (const tag of [...present].sort()) {
    result[tag] = labelMap.get(tag) ?? capitalize(tag)
  }

  return result
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
