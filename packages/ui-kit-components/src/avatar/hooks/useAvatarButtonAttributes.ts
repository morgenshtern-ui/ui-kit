import { computedEager } from '@vueuse/core'
import type { Ref } from 'vue'

interface Props {
  readonly isLinkTag: Ref<boolean>
  readonly isDisabled: Ref<boolean>
}

export function useAvatarButtonAttributes({ isDisabled, isLinkTag }: Props) {
  const avatarButtonAttributes = computedEager(() => {
    const disabledAttributes = {
      'aria-disabled': !!isDisabled.value,
      disabled: !!isDisabled.value,
    }

    return {
      type: isLinkTag.value ? undefined : 'button',
      tabindex: isDisabled.value ? -1 : 0,
      ...disabledAttributes,
    }
  })

  return { avatarButtonAttributes }
}
