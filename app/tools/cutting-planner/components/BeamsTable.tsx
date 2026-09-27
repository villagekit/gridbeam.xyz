// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/applet-cutting-planner/src/components/beam-table.tsx
'use client'

import { useCallback } from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'

import {
  Button,
  Center,
  Heading,
  Icon,
  type SystemStyleObject,
  Table,
  Text,
  VStack,
  VisuallyHidden,
} from '@villagekit/ui'

import type { BeamQuota } from '../algorithm'
import { BeamRow } from './BeamRow'

interface BeamsTableProps {
  title: string
  beams: Array<BeamQuota>
  caption: string
  onCreateBeam?: (beam: BeamQuota) => void
  onChangeBeam?: (index: number, beam: BeamQuota) => void
  onDeleteBeam?: (index: number) => void
  css?: SystemStyleObject
}

/**
 * A titled table of beam quotas in its own labeled section, editable row by row when the
 * change, delete and create handlers are given and read-only when they are not.
 */
export function BeamsTable(props: BeamsTableProps) {
  const { title, beams, caption, onCreateBeam, onChangeBeam, onDeleteBeam, css } = props

  const handleCreate = useCallback(() => {
    if (onCreateBeam != null) {
      onCreateBeam({
        count: 1,
        size: 60,
      })
    }
  }, [onCreateBeam])

  return (
    <VStack as="section" aria-label={title} gap="4" css={{ width: '100%', ...css }}>
      <Heading size="md" css={{ textAlign: 'center' }}>
        {title}
      </Heading>

      <Text variant="tertiary" css={{ textAlign: 'center' }}>
        {caption}
      </Text>

      <Table.Root size="sm" variant="line" css={{ width: '100%' }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader css={{ width: '40%' }}>
              <Text variant="secondary">Length</Text>
            </Table.ColumnHeader>

            <Table.ColumnHeader css={{ width: '40%' }}>
              <Text variant="secondary">Quantity</Text>
            </Table.ColumnHeader>

            <Table.ColumnHeader css={{ width: '20%' }}>
              <VisuallyHidden>Delete</VisuallyHidden>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {beams.map((beam, index) => (
            <BeamRow
              // biome-ignore lint/suspicious/noArrayIndexKey:
              key={index}
              index={index}
              beam={beam}
              onChange={onChangeBeam}
              onDelete={onDeleteBeam}
            />
          ))}

          <Table.Row>
            {onCreateBeam != null && (
              <Table.Cell colSpan={4}>
                <Center>
                  <Button onClick={handleCreate} variant="secondary" size="sm">
                    <Icon as={FaRegPlusSquare} />
                    Add beam
                  </Button>
                </Center>
              </Table.Cell>
            )}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </VStack>
  )
}
