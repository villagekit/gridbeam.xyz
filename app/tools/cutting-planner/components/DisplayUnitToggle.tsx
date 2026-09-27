// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/components/display-unit-toggle.tsx
import { Field, FormLabel, HStack, Switch, type SystemStyleObject, Text } from '@villagekit/ui'

interface DisplayUnitToggleProps {
  showInMillimeters: boolean
  onChange: () => void
  css?: SystemStyleObject
}

/**
 * The switch between grid units and millimeters, named for the tree by its `aria-label` and
 * flanked by two hidden labels that flip it on click.
 */
export function DisplayUnitToggle(props: DisplayUnitToggleProps) {
  const { showInMillimeters, onChange, css } = props

  return (
    <Field.Root css={{ display: 'flex', flexDirection: 'row', ...css }}>
      <HStack gap="2" css={{ marginRight: 3 }}>
        <FormLabel aria-hidden htmlFor="cutting-plan-units" css={{ margin: 0 }}>
          <Text fontSize="sm" variant="tertiary">
            Grid units
          </Text>
        </FormLabel>

        {/* No Switch.Label: the hidden input's aria-labelledby always names the label part's id
            (zag's switch connect), so a label part would win over the aria-label below; with none
            rendered the reference resolves to nothing and the aria-label names the checkbox. */}
        <Switch.Root
          ids={{ hiddenInput: 'cutting-plan-units' }}
          checked={showInMillimeters}
          onCheckedChange={onChange}
        >
          <Switch.HiddenInput aria-label="Display units as millimeters or grid units" />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>

        <FormLabel aria-hidden htmlFor="cutting-plan-units" css={{ margin: 0 }}>
          <Text fontSize="sm" variant="tertiary">
            Millimeters
          </Text>
        </FormLabel>
      </HStack>
    </Field.Root>
  )
}
