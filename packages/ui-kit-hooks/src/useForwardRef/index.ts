import type { Optional } from '@teleskop-labs/ui-kit-utils'
import type { ObjectDirective, ShallowRef } from 'vue'

import type { TForwardRefContext } from './context'
import { provideForwardRefContext } from './context'

export function useForwardRef<T>(forwardRef: ShallowRef<Optional<T>>) {
  function setForwardRef(el: T) {
    forwardRef.value = el
  }

  provideForwardRefContext({
    setForwardRef: setForwardRef as TForwardRefContext['setForwardRef'],
  })
}

export function useForwardRefDirective(setForwardRef: TForwardRefContext['setForwardRef']): ObjectDirective {
  return {
    mounted(el) {
      setForwardRef(el)
    },
    updated(el) {
      setForwardRef(el)
    },
    unmounted() {
      setForwardRef(undefined)
    },
  }
}
