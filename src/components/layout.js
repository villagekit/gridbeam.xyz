import React from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle } from 'styled-components'
import { Box, Link } from 'rebass/styled-components'
import reset from 'styled-reset'
import shader from 'shader'

import 'typeface-bungee'
import 'typeface-ibm-plex-sans'
import 'typeface-ibm-plex-serif'

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
`

const Layout = ({ header, children }) => (
  <Main>
    <GlobalStyle />
    {header}
    <Body>{children}</Body>
    <Footer />
  </Main>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

function Main (props) {
  return (
    <Box
      as='main'
      {...props}
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto'
      }}
      css={`
        background-color: ${({ theme }) => shader('#ff', 0.95)};
      `}
    />
  )
}

function Body (props) {
  return (
    <Box
      {...props}
      sx={{
        margin: '0 auto',
        maxWidth: '64rem',
        minHeight: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto'
      }}
    />
  )
}

function Footer () {
  return (
    <Box as='footer' p={3} fontSize={1} fontFamily='body' textAlign='center'>
      <Link
        p={1}
        target='_window'
        href='https://github.com/ahdinosaur/gribeam.nz'
        color='primary'
        sx={{
          textDecoration: 'none',
          ':hover': { textDecoration: 'underline' }
        }}
      >
        gridbeam.nz
      </Link>
      made with
      <span role='img' aria-label='heart' css={{ padding: '0.25rem' }}>
        ❤️
      </span>
      by
      <Link
        p={1}
        href='https://dinosaur.is'
        target='_window'
        color='primary'
        sx={{
          textDecoration: 'none',
          ':hover': { textDecoration: 'underline' }
        }}
      >
        Mikey
      </Link>
    </Box>
  )
}

export default Layout

export function withLayout (PageComponent) {
  return function PageWithLayout (props) {
    return (
      <Layout>
        <PageComponent {...props} />
      </Layout>
    )
  }
}
