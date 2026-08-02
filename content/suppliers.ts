export type Region = 'NZ' | 'AU' | 'EU' | 'UK' | 'US' | 'CA' | 'global'

export type SupplierOffering = 'beams' | 'panels' | 'fasteners' | 'kits' | 'custom' | 'design-build'

export type SupplierStatus = 'active' | 'paused' | 'archived'

export interface Supplier {
  id: string
  name: string
  region: Region
  country: string
  website: string
  offerings: Array<SupplierOffering>
  compatibility: string
  blurb: string
  notes?: string
  status: SupplierStatus
}

export const suppliers: Array<Supplier> = [
  {
    id: 'gridkit-nz',
    name: 'Grid Kit',
    region: 'NZ',
    country: 'Aotearoa New Zealand',
    website: 'https://gridkit.nz',
    offerings: ['beams'],
    compatibility: "40 mm grid — matches this site's catalogue.",
    blurb:
      'Aotearoa New Zealand–based supplier of 40 mm grid-beam hardware. Operates independently of the gridbeam.xyz project.',
    status: 'active',
  },
  {
    id: 'gridbeam-supply',
    name: 'Gridbeam Supply',
    region: 'US',
    country: 'United States',
    website: 'https://gridbeamsupply.com',
    offerings: ['beams', 'fasteners', 'kits'],
    compatibility:
      "Imperial profile — the original grid beam, traced back to Ken Isaacs' Living Structures. Different geometry from this site's 40 mm focus; parts don't mix with 40 mm hardware.",
    blurb:
      "The OG grid-beam supplier. Sells tan-oak gridbeam box sets in 2'–8' lengths, furniture bolts, button shelves, and “How to Build with Grid Beam” by Phil Jergenson, Richard Jergenson, and Wilma Keppel.",
    status: 'active',
  },
]
