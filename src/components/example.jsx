import React from 'react'
import { Flex, Link, Text } from 'rebass/styled-components'

function Example (props) {
  const { name, image, playUrl } = props

  return (
    <Flex flexDirection='column' alignItems='center' m={2} p={2}>
      {/*
      <Link
        href={playUrl}
        // target='_window'
        color='primary'
        sx={{
          textDecoration: 'none',
          ':hover': { textDecoration: 'underline' }
        }}
      >
      */}
      <Text as='h3' fontSize={2} fontFamily='heading' textAlign='center'>
        {name}
      </Text>
      {image}
      {/*
      </Link>
      */}
    </Flex>
  )
}

export default Example
