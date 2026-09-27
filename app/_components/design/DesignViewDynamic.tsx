// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/design/view-dynamic.tsx
'use client'

import dynamic from 'next/dynamic'

import { Loading } from '@/app/_components/Loading'

/** The 3D view loaded on the client alone, the spinner in its place until the chunk arrives. */
export const DesignViewDynamic = dynamic(() => import('./DesignView'), {
  loading: () => <Loading />,
  ssr: false,
})
