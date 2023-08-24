import type { Optional } from '@teleskop-labs/ui-kit-utils'
import type { InjectionKey, Ref } from 'vue'
import { inject, provide, ref } from 'vue'

export type TZIndexContext = Readonly<Ref<number>>

export const defaultZIndexContext: TZIndexContext = ref(2000)

export const Z_INDEX_CONTEXT_KEY: InjectionKey<TZIndexContext> = Symbol('Z_INDEX_CONTEXT_KEY')

export function provideZIndexContext(payload: TZIndexContext) {
  provide(Z_INDEX_CONTEXT_KEY, payload)
}

export function useZIndexContext<T extends Optional<TZIndexContext> = Optional<TZIndexContext>>(
  defaultContext?: T,
): TZIndexContext | T {
  return inject(Z_INDEX_CONTEXT_KEY, defaultContext as TZIndexContext) as T
}
