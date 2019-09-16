import React, { forwardRef } from 'react'
import { Flex, Button } from 'rebass/styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { useToolbarState, Toolbar, ToolbarItem } from 'reakit/Toolbar'
import { Button as ReaButton } from 'reakit/Button'

import Section from '../components/section'

const menuItems = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Buy',
    to: '/buy'
  },
  {
    label: 'Examples',
    to: '/examples'
  },
  {
    label: 'Guide',
    to: '/guide'
  }
]

function Navbar (props) {
  const toolbar = useToolbarState()
  return (
    <Section>
      <Flex
        as={Toolbar}
        {...toolbar}
        css={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        aria-label='Navigation'
        bg='muted'
      >
        {menuItems.map((navbarItem, index) => (
          <NavbarItem key={index} {...navbarItem} toolbar={toolbar} />
        ))}
      </Flex>
    </Section>
  )
}

// NOTE: this `as` chain is madness

function NavbarItem (props) {
  const { label, to, toolbar } = props

  return (
    <ToolbarItem {...toolbar} as={NavbarItemButton} to={to}>
      {label}
    </ToolbarItem>
  )
}

const NavbarItemButton = forwardRef((props, ref) => {
  const { to, children } = props
  return <ReaButton ref={ref} as={NavbarLink} to={to} children={children} />
})

const onlyIfNotActive = ({ isCurrent }) => {
  return isCurrent ? { style: { display: 'none' } } : null
}

const NavbarLink = forwardRef((props, ref) => {
  return (
    <Button
      ref={ref}
      as={GatsbyLink}
      mx={3}
      my={2}
      px={4}
      py={2}
      bg='secondary.0'
      getProps={onlyIfNotActive}
      {...props}
    />
  )
})

export default Navbar
