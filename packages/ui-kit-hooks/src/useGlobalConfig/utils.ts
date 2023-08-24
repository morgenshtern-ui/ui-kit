import { keysOf } from '@teleskop-labs/ui-kit-utils'
import { computedEager } from '@vueuse/core'
import type { MaybeRef, UnwrapRef } from 'vue'
import { unref } from 'vue'

import type { TConfigProviderContext } from './context'

type UnwrapCtx = UnwrapRef<TConfigProviderContext>

export function getMergedContext(oldCtx: TConfigProviderContext | undefined, newCtx: MaybeRef<UnwrapCtx>) {
  return computedEager<UnwrapCtx>(() => {
    const ctx = unref(newCtx)

    if (!oldCtx?.value) {
      return ctx
    }

    return mergeConfig(oldCtx.value, ctx)
  })
}

function mergeConfig(a: UnwrapCtx, b: UnwrapCtx): UnwrapCtx {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
  const obj: Record<string, unknown> = {}

  for (const key of keys) {
    obj[key] = b[key] ?? a[key]
  }

  return obj
}
