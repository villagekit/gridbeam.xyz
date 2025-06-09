import NextLink from 'next/link'
import { Group, Stack, Link as ChakraLink, Box } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'

export type NavbarProps = {}

type NavbarLink = {
  label: string,
  url: string,
}
const links: Array<NavbarLink> = [
  {
    label: "Start",
    url: "/start"
  },
  {
    label: "Showcase",
    url: "/showcase"
  },
  {
    label: "Stories",
    url: "/stories"
  },
]

export function Navbar(_props: NavbarProps) {
  return (
    <Stack direction='row' css={{ alignItems: 'center', paddingBlock: 2 }}>
      <Stack direction='row' css={{ alignItems: 'center', minHeight: 4 }}>
        <ChakraLink asChild>
          <NextLink href="/">LOGO</NextLink>
        </ChakraLink>
      </Stack>
      <Box css={{ flexGrow: 1 }} />
      <Stack direction='row'>
        <ColorModeButton />
      </Stack>
    </Stack>
  )
}
