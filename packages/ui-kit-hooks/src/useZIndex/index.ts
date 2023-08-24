import type { Optional } from '@teleskop-labs/ui-kit-utils'
import { computedEager } from '@vueuse/core'
import { ref } from 'vue'

import { defaultZIndexContext, type TZIndexContext, useZIndexContext } from './context'

export { defaultZIndexContext, provideZIndexContext, useZIndexContext, Z_INDEX_CONTEXT_KEY } from './context'

const zIndex = ref(0)

export function useZIndex(zIndexOverrides: Optional<TZIndexContext> = undefined) {
  const zIndexContext = zIndexOverrides || useZIndexContext(defaultZIndexContext)

  const currentZIndex = computedEager(() => zIndexContext.value + zIndex.value)

  function nextZIndex() {
    zIndex.value += 1

    return currentZIndex.value
  }

  return {
    initialZIndex: zIndexContext.value,
    currentZIndex,
    nextZIndex,
  }
}
