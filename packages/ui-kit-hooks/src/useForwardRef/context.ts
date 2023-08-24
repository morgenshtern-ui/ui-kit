import type { InjectionKey } from 'vue'
import { provide } from 'vue'

export interface TForwardRefContext {
  setForwardRef: <T>(el: T) => void
}

export const FORWARD_REF_INJECTION_KEY: InjectionKey<TForwardRefContext> = Symbol('FORWARD_REF_INJECTION_KEY')

export function provideForwardRefContext(context: TForwardRefContext) {
  provide(FORWARD_REF_INJECTION_KEY, context)
}
