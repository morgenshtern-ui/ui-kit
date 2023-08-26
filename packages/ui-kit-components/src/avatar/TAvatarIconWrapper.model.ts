import { defintDefaultProps, type TPropsWithDefaults } from '@teleskop-labs/ui-kit-utils'
import type { VNode } from 'vue'

// Props

export interface TAvatarIconWrapperProps {
  readonly bgColor?: string
  readonly label?: string
}

export const TAvatarIconWrapperDefaultProps = defintDefaultProps<TAvatarIconWrapperProps>()({
  bgColor: 'var(--t-sys-elevation-surface-overlay)',
})

export type TAvatarIconWrapperPropsWithDefaults = TPropsWithDefaults<
  TAvatarIconWrapperProps,
  typeof TAvatarIconWrapperDefaultProps
>

// Slots

export interface TAvatarIconWrapperSlots {
  readonly default?: () => VNode[]
}
