import React from 'react'
import { Box } from 'rebass/styled-components'

function Breakline () {
  return (
    <Box
      as='hr'
      sx={{
        height: 0,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'dark'
      }}
    />
  )
}

export default Breakline
