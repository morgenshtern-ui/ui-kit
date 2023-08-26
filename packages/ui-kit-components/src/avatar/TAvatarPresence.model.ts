import type { VNode } from 'vue'

import type { Presence } from './types'

// Props

export interface TAvatarPresenceProps {
  /**
   * Используется для переопределения цвета границы индикатора присутствия по умолчанию.
   * Принимает любой аргумент цвета, который принимает свойство border-color CSS.
   */
  readonly borderColor?: string

  /**
   * Тип индикатора присутствия для отображения
   */
  readonly presence?: Presence
}

// Slots

export interface TAvatarPresenceSlots {
  readonly default?: () => VNode[]
}
