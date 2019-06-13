import React from 'react'
import { Box, Text } from 'rebass'

export const p = props => (
  <Text as='p' p={2} fontFamily='normal' fontSize={1} {...props} />
)
export const a = props => (
  <Text as='a' p={2} fontFamily='normal' fontSize={1} {...props} />
)
export const h1 = props => (
  <Text as='a' p={2} fontSize={[4, 5, 6]} fontFamily='heading' {...props} />
)
export const h2 = props => (
  <Text as='a' p={2} fontSize={[3, 4, 5]} fontFamily='heading' {...props} />
)
export const h3 = props => (
  <Text as='a' p={2} fontSize={[2, 3, 4]} fontFamily='heading' {...props} />
)
export const h4 = props => (
  <Text as='a' p={2} fontSize={[1, 2, 3]} fontFamily='heading' {...props} />
)
export const h5 = props => (
  <Text as='a' p={2} fontSize={[0, 1, 2]} fontFamily='heading' {...props} />
)
// img
// pre
// code
export const ol = props => (
  <Text as='ol' p={2} ml={3} fontFamily='normal' fontSize={1} {...props} />
)
export const ul = props => (
  <Text as='ul' p={2} ml={3} fontFamily='normal' fontSize={1} {...props} />
)
export const li = props => (
  <Text as='li' p={2} ml={3} fontFamily='normal' fontSize={1} {...props} />
)
// blockquote
// hr
// table
// tr
// th
// td
// em
// strong
// delete
// wrapper
// inlineCode
// thematicBreak
export const div = props => <Box {...props} />
