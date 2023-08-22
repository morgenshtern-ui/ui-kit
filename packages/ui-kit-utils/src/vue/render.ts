import type { Slot } from 'vue'

import { isNil } from '../shared'
import type { Optional } from '../typescript'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hSlot(slot: Optional<Slot>, otherwise: any = undefined) {
  return !isNil(slot) ? slot() || otherwise : otherwise
}

export function hUniqueSlot(slot: Optional<Slot>, otherwise: unknown[]) {
  if (!isNil(slot)) {
    const vNode = slot()

    if (!isNil(vNode)) {
      return [...vNode]
    }
  }

  return otherwise
}

/**
 * Source definitely exists,
 * so it's merged with the possible slot
 */
export function hMergeSlot(slot: Optional<Slot>, source: unknown[]) {
  // eslint-disable-next-line unicorn/prefer-spread
  return !isNil(slot) ? source.concat(slot()) : source
}

/**
 * Merge with possible slot,
 * even if source might not exist
 */
export function hMergeSlotSafely(slot: Optional<Slot>, source: unknown[]) {
  if (isNil(slot)) {
    return source
  }

  return !isNil(source) ? [...source, ...slot()] : slot()
}
