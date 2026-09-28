import type { Metadata } from 'next'

import SubscribePage from './SubscribePage'

export const metadata: Metadata = {
  title: 'Subscribe',
}

export default function Page() {
  return <SubscribePage />
}
