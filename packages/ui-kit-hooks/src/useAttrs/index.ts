import type { Optional } from '@teleskop-labs/ui-kit-utils'
import { getCurrentInstance } from '@teleskop-labs/ui-kit-utils'
import { computedEager, toValue } from '@vueuse/core'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed } from 'vue'

interface Params {
  excludeListeners?: Optional<boolean>
  excludeKeys?: Optional<MaybeRefOrGetter<string[]>>
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]/

export function useAttrs(params: Params = {}): ComputedRef<Record<string, unknown>> {
  const instance = getCurrentInstance('useAttrs')

  const { excludeListeners = false, excludeKeys } = params
  const allExcludeKeys = computedEager(() => new Set([...(toValue(excludeKeys) || []), ...DEFAULT_EXCLUDE_KEYS]))

  return computed(() =>
    Object.fromEntries(
      Object.entries(instance.proxy?.$attrs || {}).filter(
        ([key]) => !allExcludeKeys.value.has(key) && !(excludeListeners && LISTENER_PREFIX.test(key)),
      ),
    ),
  )
}
