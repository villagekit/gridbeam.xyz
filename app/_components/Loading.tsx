// ported from https://github.com/villagekit/node-modules/blob/fce357d/apps/gridkit/components/loading.tsx
import { Flex, Spinner, Text } from '@villagekit/ui'

interface LoadingProps {
  errorMessage?: string
}

/** A centered spinner filling its parent, or the error message in red when one is given. */
export function Loading(props: LoadingProps) {
  const { errorMessage } = props

  return (
    <Flex alignItems="center" justifyContent="center" css={{ height: '100%', padding: 8 }}>
      {errorMessage != null ? (
        <Text css={{ color: 'red.600' }}>{errorMessage}</Text>
      ) : (
        <Spinner size="xl" />
      )}
    </Flex>
  )
}
