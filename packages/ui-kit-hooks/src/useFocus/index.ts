import type { Optional } from '@teleskop-labs/ui-kit-utils'
import type { ShallowRef } from 'vue'

interface Params {
  focus?: () => void
}

export function useFocus(el: ShallowRef<Optional<Params>>) {
  return {
    focus: () => {
      el.value?.focus?.()
    },
  }
}
