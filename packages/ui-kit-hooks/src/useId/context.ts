import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export interface TIdInjectionContext {
  prefix: number
  current: number
}

export const defaultIdContext: TIdInjectionContext = {
  prefix: Math.floor(Math.random() * 10_000),
  current: 0,
}

export const ID_INJECTION_KEY: InjectionKey<TIdInjectionContext> = Symbol('ID_INJECTION_KEY')

export function provideIdContext(payload: TIdInjectionContext) {
  provide(ID_INJECTION_KEY, payload)
}

export function useIdContext() {
  return inject(ID_INJECTION_KEY, defaultIdContext)
}
