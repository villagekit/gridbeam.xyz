// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/components/beam-row.tsx
'use client'

import { useCallback } from 'react'
import { FaRegMinusSquare } from 'react-icons/fa'

import { Icon, IconButton, NumberInput, type NumberInputProps, Table } from '@villagekit/ui'

import type { BeamQuota } from '../'

interface BeamRowProps {
  index: number
  beam: BeamQuota
  onChange?: (index: number, beam: BeamQuota) => void
  onDelete?: (index: number) => void
}

/**
 * One table row of a beam quota: its length and count as flushed number inputs, read-only with
 * grayed steppers when no `onChange` is given, and a delete button when `onDelete` is.
 */
export function BeamRow(props: BeamRowProps) {
  const { index, beam, onChange, onDelete } = props

  const handleSizeChange = useCallback<NonNullable<NumberInputProps['onValueChange']>>(
    ({ valueAsNumber: size }) => {
      if (onChange != null) {
        onChange(index, {
          ...beam,
          size,
        })
      }
    },
    [onChange, index, beam],
  )

  const handleCountChange = useCallback<NonNullable<NumberInputProps['onValueChange']>>(
    ({ valueAsNumber: count }) => {
      if (onChange != null) {
        onChange(index, {
          ...beam,
          count,
        })
      }
    },
    [onChange, index, beam],
  )

  const handleSizeBlur = useCallback(() => {
    if (Number.isNaN(beam.size)) {
      handleSizeChange({ value: '30', valueAsNumber: 30 })
    }
  }, [handleSizeChange, beam])

  const handleCountBlur = useCallback(() => {
    if (Number.isNaN(beam.count)) {
      handleCountChange({ value: '1', valueAsNumber: 1 })
    }
  }, [handleCountChange, beam])

  const handleDelete = useCallback(() => {
    if (onDelete != null) {
      onDelete(index)
    }
  }, [onDelete, index])

  return (
    <Table.Row>
      <Table.Cell>
        <NumberInput.Root
          variant="flushed"
          value={Number.isNaN(beam.size) ? '' : String(beam.size)}
          onValueChange={handleSizeChange}
          size="sm"
          min={2}
          max={60}
          disabled={onChange == null}
        >
          <NumberInput.Input onBlur={handleSizeBlur} />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Table.Cell>

      <Table.Cell>
        <NumberInput.Root
          variant="flushed"
          value={Number.isNaN(beam.count) ? '' : String(beam.count)}
          onValueChange={handleCountChange}
          size="sm"
          min={1}
          max={50}
          disabled={onChange == null}
        >
          <NumberInput.Input onBlur={handleCountBlur} />
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
        </NumberInput.Root>
      </Table.Cell>

      <Table.Cell>
        {onDelete != null && (
          <IconButton title="Delete" onClick={handleDelete} variant="tertiary" size="sm">
            <Icon as={FaRegMinusSquare} />
          </IconButton>
        )}
      </Table.Cell>
    </Table.Row>
  )
}
