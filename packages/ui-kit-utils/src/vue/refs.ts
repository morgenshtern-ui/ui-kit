import type { ComponentPublicInstance, Ref } from 'vue'

import { isFunction } from '../shared'
import type { Nillable, Optional } from '../typescript'

export type RefSetter = (element: Optional<Element | ComponentPublicInstance>) => void

export function composeRefs(...refs: Array<Ref<Nillable<HTMLElement>> | RefSetter>) {
  return (element: Element | Nillable<ComponentPublicInstance>) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(element as Element | ComponentPublicInstance)
      } else {
        ref.value = element as Optional<HTMLElement>
      }
    })
  }
}
