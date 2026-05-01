import { Box, HStack, Text } from '@villagekit/ui'
import type { ReactNode } from 'react'

interface StoryEditorialNoteProps {
  children: ReactNode
}

export function StoryEditorialNote(props: StoryEditorialNoteProps) {
  const { children } = props

  return (
    <Box
      maxW="3xl"
      mx="auto"
      mb="8"
      px="5"
      py="4"
      borderRadius="lg"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentB.300"
      bg="accentB.50"
      role="note"
      aria-label="Editor's note"
    >
      <HStack gap="3" alignItems="flex-start">
        <InfoIcon />
        <Text variant="secondary" fontSize="sm" lineHeight="1.6">
          {children}
        </Text>
      </HStack>
    </Box>
  )
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      style={{ color: 'var(--chakra-colors-accentB-700)', marginTop: 2, flexShrink: 0 }}
    >
      <title>Editor's note</title>
      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-1 4h2v6H9v-6Z" />
    </svg>
  )
}
