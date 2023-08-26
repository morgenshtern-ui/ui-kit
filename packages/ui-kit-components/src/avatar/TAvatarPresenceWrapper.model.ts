import type { VNode } from 'vue'

import type { TAvatarPresenceProps } from './TAvatarPresence.model'
import type { IndicatorSizeType } from './types'

// Props

export interface TAvatarPresenceWrapperProps extends TAvatarPresenceProps {
  readonly size: IndicatorSizeType
}

// Slots

export interface TAvatarPresenceWrapperSlots {
  readonly default?: () => VNode[]
}
