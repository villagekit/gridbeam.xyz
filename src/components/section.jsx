import React from 'react'
import { Box, Link, Text } from 'rebass/styled-components'

import Breakline from './breakline'

function Section ({ id, title, children, ...props }) {
  return (
    <>
      <Box as='section' {...props}>
        {title && <SectionTitle id={id} title={title} />}
        {children}
      </Box>
      <Breakline />
    </>
  )
}

export default Section

function SectionTitle ({ id, title }) {
  return (
    <Box as='section' id={id}>
      <Link href={`#${id}`} css={{ textDecoration: 'none', color: 'inherit' }}>
        <Text as='h2' p={[3, 3, 4]} fontSize={5} fontFamily='heading'>
          {title}
        </Text>
      </Link>
    </Box>
  )
}
