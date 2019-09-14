import React from 'react'
import { Box, Text } from 'rebass/styled-components'

import Breakline from './breakline'

function Section ({ title, children, ...props }) {
  return (
    <>
      <Box as='section' {...props}>
        {title && <SectionTitle title={title} />}
        {children}
      </Box>
      <Breakline />
    </>
  )
}

export default Section

function SectionTitle ({ title }) {
  return (
    <Text as='h2' p={[3, 3, 4]} fontSize={5} fontFamily='heading'>
      {title}
    </Text>
  )
}
