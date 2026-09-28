// A copy of ../ui/src/Toaster.tsx at 540e9c3, carried here until the operator publishes the ui
// that exports `toaster` and mounts the `Toaster` in its `Provider`; the bump plan deletes this
// file and points the subscribe form's import at `@villagekit/ui`.
'use client'

import {
  Toaster as ChakraToaster,
  type CreateToasterReturn,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

/**
 * The one toast store the `Toaster` renders: `toaster.create({ title, type })` from any component,
 * the way `useToast()` did under Chakra v2. Toasts stack at the bottom, v2's default position.
 */
export const toaster: CreateToasterReturn = createToaster({
  placement: 'bottom',
  pauseOnPageIdle: true,
})

/**
 * The notification region, mounted once by `SiteProvider`; Chakra v3 renders toasts only through
 * an explicit `Toaster`, where v2's provider mounted its regions itself. The markup is Chakra's
 * toaster snippet (https://chakra-ui.com/docs/components/toast).
 */
export function Toaster() {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root width={{ md: 'sm' }}>
            {toast.type === 'loading' ? <Spinner size="sm" /> : <Toast.Indicator />}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
