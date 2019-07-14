import React from 'react'

import { withLayout } from '../components/layout'
import SEO from '../components/seo'
import Bweemer from '../components/bweemer'

function Landing () {
  return (
    <>
      <SEO
        title='Home'
        keywords={[
          'grid',
          'beam',
          'modular',
          'open',
          'hardware',
          'construction',
          'furniture'
        ]}
      />
      <Hero />
    </>
  )
}

function Hero () {
  return (
    <header>
      <h1>heyo</h1>
      <Bweemer />
    </header>
  )
}

export default withLayout(Landing)
