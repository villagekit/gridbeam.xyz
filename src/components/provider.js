import React from 'react'
import { ThemeProvider } from 'styled-components'
import { MDXProvider as MdxProvider } from '@mdx-js/react'

import theme from '../theme'
import * as base from './base'

const Provider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MdxProvider components={base}>{children}</MdxProvider>
    </ThemeProvider>
  )
}
export default Provider
