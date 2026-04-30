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

export const suppliers: Array<Supplier> = []
