'use client';

import { Box, Stack } from "@chakra-ui/react"

import { Navbar } from "./Navbar"

export type LayoutProps = React.PropsWithChildren<{}>

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <Stack direction="column">
      <Navbar />
      <Box as="main">
        {children}
      </Box>
    </Stack>
  )
}
