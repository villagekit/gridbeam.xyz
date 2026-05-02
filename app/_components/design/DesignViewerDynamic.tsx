'use client'

import { Flex, Spinner } from '@villagekit/ui'
import dynamic from 'next/dynamic'

import type { DesignViewerProps } from './DesignViewer'

const DesignViewerLoading = (
  <Flex alignItems="center" justifyContent="center" w="full" h="320px">
    <Spinner size="xl" />
  </Flex>
)

export const DesignViewerDynamic = dynamic<DesignViewerProps>(
  () => import('./DesignViewer').then((mod) => mod.DesignViewer),
  {
    ssr: false,
    loading: () => DesignViewerLoading,
  },
)
