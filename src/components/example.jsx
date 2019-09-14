import React from 'react'
import { Flex, Link, Text } from 'rebass/styled-components'

function Example (props) {
  const { name, image, url } = props

  return (
    <Flex flexDirection='column' alignItems='center' m={2} p={2}>
      <Link
        href={url}
        target='_window'
        color='primary'
        sx={{
          textDecoration: 'none',
          ':hover': { textDecoration: 'underline' }
        }}
        css={{
          width: '100%',
          height: '100%'
        }}
      >
        <Text
          as='h3'
          fontSize={3}
          fontFamily='heading'
          textAlign='center'
          color='primary'
        >
          {name}
        </Text>
        {image}
      </Link>
    </Flex>
  )
}

export default Example
