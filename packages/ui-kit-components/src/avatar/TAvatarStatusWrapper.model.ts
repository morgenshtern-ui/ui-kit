import type { VNode } from 'vue'

import type { TAvatarStatusProps } from './TAvatarStatus.model'
import type { IndicatorSizeType } from './types'

// Props

export interface TAvatarStatusWrapperProps extends TAvatarStatusProps {
  readonly size: IndicatorSizeType
}

// Slots

export interface TAvatarStatusWrapperSlots {
  readonly default?: () => VNode[]
}
