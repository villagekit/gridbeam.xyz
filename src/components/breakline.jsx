import React from 'react'
import { Box } from 'rebass/styled-components'

function Breakline (props) {
  const { color = 'dark', width = '100%' } = props
  return (
    <Box
      as='hr'
      sx={{
        width,
        height: 0,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: color
      }}
    />
  )
}

export default Breakline
