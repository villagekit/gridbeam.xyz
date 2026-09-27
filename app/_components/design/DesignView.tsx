// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/design/view.tsx
'use client'

import { useHasParams } from '@villagekit/parameters'
import { ProductView, type ProductViewProps } from '@villagekit/product'

/** The engine's 3D view of the product, its parameter controls shown when the design has any. */
export default function DesignView(props: ProductViewProps) {
  const hasParams = useHasParams()
  return <ProductView showParamControls={hasParams} {...props} />
}
