// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/producers.ts

export type Supplier = {
  id: string
  title: string
  location: string
  latitude: number
  longitude: number
  website: string
  system: 'metric' | 'imperial'
}

export const suppliers: Array<Supplier> = [
  {
    id: 'grid-kit-wellington',
    latitude: -41.2768,
    location: 'Wellington, New Zealand',
    longitude: 174.7779,
    title: 'Grid Kit Wellington',
    system: 'metric',
    website: 'https://gridkit.nz',
  },
  {
    id: 'gridbeam-supply',
    latitude: 39.4031029,
    location: 'Willits, California',
    longitude: -123.3590017,
    title: 'Gridbeam Supply',
    system: 'imperial',
    website: 'https://gridbeamsupply.com',
  },
]
