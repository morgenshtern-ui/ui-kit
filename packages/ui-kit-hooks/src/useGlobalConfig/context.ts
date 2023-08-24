import type { Language } from '@teleskop-labs/ui-kit-locale'
import type { Component, InjectionKey, Ref, UnwrapRef } from 'vue'
import { inject, ref } from 'vue'

export type TConfigProviderContext = Ref<{
  locale?: Language
  routerComponent?: Component
  zIndex?: number
}>

type UnwrapCtx = UnwrapRef<TConfigProviderContext>

// TODO: Проверить реактивность

// это предназначено для исправления глобальных методов, таких как `ElMessage(opts)`, таким образом мы можем внедрить текущую локаль
// в компонент как injection value по умолчанию.
// refer to: https://github.com/element-plus/element-plus/issues/2610#issuecomment-887965266
export const initGlobalConfig = ref<UnwrapCtx>()

export const CONFIG_PROVIDER_CONTEXT_KEY: InjectionKey<TConfigProviderContext> = Symbol('CONFIG_PROVIDER_CONTEXT_KEY')

export function useGlobalConfigContext() {
  return inject(CONFIG_PROVIDER_CONTEXT_KEY, initGlobalConfig)
}
