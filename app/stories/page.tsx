import type { Metadata } from 'next'

import { StoriesPage } from './StoriesPage'

export const metadata: Metadata = {
  title: 'Stories',
}

export default function Page() {
  return <StoriesPage />
}
