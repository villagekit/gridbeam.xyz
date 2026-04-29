import { Box, Container, Heading, Text } from '@villagekit/ui'

export default function HomePage() {
  return (
    <Box as="main" py="16">
      <Container maxW="2xl">
        <Heading as="h1" size="2xl" mb="4">
          gridbeam.xyz
        </Heading>
        <Text fontSize="lg">Coming soon — an open-source educational site about grid beam.</Text>
      </Container>
    </Box>
  )
}
