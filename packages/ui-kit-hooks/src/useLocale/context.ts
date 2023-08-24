import type { Language } from '@teleskop-labs/ui-kit-locale'
import type { Optional } from '@teleskop-labs/ui-kit-utils'
import type { InjectionKey, Ref } from 'vue'
import { inject, ref } from 'vue'

type TLocationContext = Ref<Optional<Language>>

const locationDefaultContext: TLocationContext = ref()

export const LOCALE_CONTEXT_KEY: InjectionKey<TLocationContext> = Symbol('LOCALE_CONTEXT_KEY')

export function useLocationContext() {
  return inject(LOCALE_CONTEXT_KEY, locationDefaultContext)
}
