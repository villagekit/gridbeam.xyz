import React from 'react'
import { Flex, Link, Image, Text } from 'rebass/styled-components'

function Example (props) {
  const { name, imageUrl, editUrl } = props

  return (
    <Flex flexDirection='column' alignItems='center' m={2} p={2}>
      <Link
        href={editUrl}
        target='_window'
        color='primary'
        sx={{
          textDecoration: 'none',
          ':hover': { textDecoration: 'underline' }
        }}
      >
        <Text as='h3' fontSize={2} fontFamily='heading' textAlign='center'>
          {name}
        </Text>
        <Image src={imageUrl} />
      </Link>
    </Flex>
  )
}

export default Example
