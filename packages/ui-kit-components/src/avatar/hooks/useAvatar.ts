import { useRouterLink } from '@teleskop-labs/ui-kit-hooks'
import { computedEager } from '@vueuse/core'
import { toRef } from 'vue'

import type { TAvatarEmitsInner, TAvatarPropsWithDefaults } from '../TAvatar.model'
import type { IndicatorSizeType } from '../types'
import { useAvatarButtonAttributes } from './useAvatarButtonAttributes'

export function useAvatar(props: TAvatarPropsWithDefaults, emit: TAvatarEmitsInner) {
  const isDisabledProps = toRef(props, 'isDisabled')

  const {
    tagComputed: routerTagComputed,
    linkAttributesComputed,
    isLinkTag,
  } = useRouterLink(props, {
    isDisabled: isDisabledProps,
    linkFallbackTag: toRef(props, 'linkFallbackTag'),
  })

  const { avatarButtonAttributes } = useAvatarButtonAttributes({
    isDisabled: isDisabledProps,
    isLinkTag,
  })

  const innerTagComputed = computedEager(() => {
    if (props.onClick || props.isDisabled) {
      return 'button'
    }

    if (isLinkTag.value) {
      return routerTagComputed.value
    }

    return props.linkFallbackTag || 'span'
  })

  const isValidIconSize = computedEager(() => props.size !== 'xxlarge' && props.size !== 'xsmall')

  const classes = computedEager(() => [
    `t-avatar--appearance-${props.appearance}`,
    `t-avatar--size-${props.size}`,
    props.isDisabled && `t-avatar--is-disabled`,
  ])

  const styles = computedEager(() => ({
    '--t-comp-avatar-color-background': props.borderColor,
    '--t-comp-avatar-color-border': props.borderColor,
  }))

  const innerAttributesComputed = computedEager(() => {
    const attrs = {
      ...linkAttributesComputed.value,
      ...avatarButtonAttributes.value,
    }

    const handlers = {} as Record<string, unknown>

    if (props.onClick) {
      handlers['onClick'] = handleClick
    }

    return Object.assign(attrs, handlers)
  })

  function getStatusSize() {
    return props.size as IndicatorSizeType
  }

  function handleClick(event: MouseEvent) {
    emit('click', event)
  }

  return {
    innerTagComputed,
    classes,
    styles,
    innerAttributesComputed,
    isValidIconSize,
    getStatusSize,
  }
}
