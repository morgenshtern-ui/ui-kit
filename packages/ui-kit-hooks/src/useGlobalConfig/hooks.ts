// TODO Рефактор
// Что насчет size?

import { debugWarn, type Optional } from '@teleskop-labs/ui-kit-utils'
import { computedEager } from '@vueuse/core'
import type { App, Ref, UnwrapRef } from 'vue'
import { getCurrentInstance, provide, ref, unref } from 'vue'

import { LOCALE_CONTEXT_KEY, useLocale } from '../useLocale'
import { defaultZIndexContext, useZIndex, Z_INDEX_CONTEXT_KEY } from '../useZIndex'
import {
  CONFIG_PROVIDER_CONTEXT_KEY,
  initGlobalConfig,
  type TConfigProviderContext,
  useGlobalConfigContext,
} from './context'
import { getMergedContext } from './utils'

type UnwrapCtx = UnwrapRef<TConfigProviderContext>

const defaultConfig = ref<UnwrapCtx>({})

export function useGlobalConfig<K extends keyof UnwrapCtx, D extends UnwrapCtx[K]>(
  key: K,
  defaultValue?: D,
): Ref<Exclude<UnwrapCtx[K], undefined> | D>
export function useGlobalConfig(): TConfigProviderContext
export function useGlobalConfig(key?: keyof UnwrapCtx, defaultValue = undefined) {
  const config = getCurrentInstance() ? useGlobalConfigContext() : defaultConfig

  if (key) {
    return computedEager(() => config.value?.[key] ?? defaultValue)
  }

  return config
}

export function provideGlobalConfig(config: TConfigProviderContext, app?: App, global = false) {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined

  const provideFn = (app?.provide ?? (inSetup ? provide : undefined)) as Optional<typeof provide>

  if (!provideFn) {
    debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().')

    return
  }

  const context = getMergedContext(oldConfig, config)

  provideFn(CONFIG_PROVIDER_CONTEXT_KEY, context)

  provideFn(
    LOCALE_CONTEXT_KEY,
    computedEager(() => context.value.locale),
  )

  provideFn(
    Z_INDEX_CONTEXT_KEY,
    computedEager(() => context.value.zIndex ?? defaultZIndexContext.value),
  )

  if (global || !initGlobalConfig.value) {
    initGlobalConfig.value = context.value
  }

  return context
}

// for components like `ElMessage` `ElNotification` `ElMessageBox`.
export function useGlobalComponentSettings() {
  const config = useGlobalConfig()

  const locale = useLocale(computedEager(() => config.value?.locale))
  const zIndex = useZIndex(computedEager(() => config.value?.zIndex || defaultZIndexContext.value))

  provideGlobalConfig(computedEager(() => unref(config) || {}))

  return {
    locale,
    zIndex,
  }
}
