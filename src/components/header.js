import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Flex, Text } from 'rebass'

const HeaderContainer = props => (
  <Flex bg='primary' mb={4} p={3} justifyContent='center' {...props} />
)

const HeaderTitle = props => (
  <Text
    as={Link}
    forwardedAs='h1'
    color='white'
    fontFamily='heading'
    fontSize={[3, 4, 5]}
    css={{
      textDecoration: 'none'
    }}
    {...props}
  />
)

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <HeaderTitle to='/'>{siteTitle}</HeaderTitle>
  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
