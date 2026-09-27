import type { ReactNode } from 'react'

import { CatalogueLayout } from '@/app/_components/layouts/CatalogueLayout'

// the app router's form of the getLayout legacy attached to both designs pages
export default function DesignsLayout({ children }: { children: ReactNode }) {
  return <CatalogueLayout>{children}</CatalogueLayout>
}
