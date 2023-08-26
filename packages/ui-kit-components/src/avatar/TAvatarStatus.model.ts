import type { VNode } from 'vue'

import type { Status } from './types'

// Props

export interface TAvatarStatusProps {
  /**
   * Переопределение цвета рамки индикатора статуса по умолчанию. Это принимает
   * любой аргумент цвета, который принимает CSS свойство `border-color`.
   */
  readonly borderColor?: string

  /**
   * Содержимое для использования в качестве пользовательского индикатора статуса. Не требуется, если вы используете
   * `Status` отдельно от `Avatar`.
   */
  readonly status?: Status
}

// Slots

export interface TAvatarStatusSlots {
  readonly default?: () => VNode[]
}
