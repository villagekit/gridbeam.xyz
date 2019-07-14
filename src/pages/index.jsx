import React from 'react'

import { withLayout } from '../components/layout'
import SEO from '../components/seo'
import GridBeamViewer from '../components/grid-beam-viewer'

const model = {
  beams: [
    {
      direction: 'z',
      origin: [0, 0, 0],
      length: 10
    }
  ]
}

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
      <GridBeamViewer model={model} />
    </header>
  )
}

export default withLayout(Landing)
