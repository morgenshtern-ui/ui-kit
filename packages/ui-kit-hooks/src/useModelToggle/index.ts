import type { Optional } from '@teleskop-labs/ui-kit-utils'
import { getCurrentInstance, isBoolean, isClient, isFunction, isNil } from '@teleskop-labs/ui-kit-utils'
import { computedEager } from '@vueuse/core'
import type { Ref } from 'vue'
import { onMounted, watch } from 'vue'

export interface ModelToggleParams {
  indicator: Ref<boolean>
  toggleReason?: Ref<Optional<Event>>
  shouldHideWhenRouteChanges?: Ref<boolean>
  shouldProceed?: () => boolean
  onShow?: (event?: Optional<Event>) => void
  onHide?: (event?: Optional<Event>) => void
}

export function createModelToggleComposable<T extends string>(name: T) {
  const updateEventKey = `update:${name}` as const
  const updateEventRawKey = `onUpdate:${name}` as const

  function useModelToggle({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide,
  }: ModelToggleParams) {
    const instance = getCurrentInstance('useModelToggle')
    const { emit } = instance
    const props = instance.props as UseModelTogglePropsGeneric<T> & {
      isDisabled: boolean
    }

    const hasUpdateHandler = computedEager(() => isFunction(props[updateEventRawKey]))
    // когда оно соответствует значению по умолчанию, мы говорим, что оно отсутствует
    // хотя это может быть ошибочно передано пользователем, но нам нужно исключить это
    // состояние
    const isModelBindingAbsent = computedEager(() => isNil(props[name]))

    function show(event?: Optional<Event>) {
      if (props.isDisabled === true || (isFunction(shouldProceed) && !shouldProceed())) {
        return
      }

      const shouldEmit = isClient && hasUpdateHandler.value

      if (shouldEmit) {
        emit(updateEventKey, true)
      }

      if (!shouldEmit || isModelBindingAbsent.value) {
        doShow(event)
      }
    }

    function hide(event?: Optional<Event>) {
      if (!isClient || props.isDisabled === true) {
        return
      }

      const shouldEmit = isClient && hasUpdateHandler.value

      if (shouldEmit) {
        emit(updateEventKey, false)
      }

      if (!shouldEmit || isModelBindingAbsent.value) {
        doHide(event)
      }
    }

    function doShow(event?: Optional<Event>) {
      if (indicator.value === true) {
        return
      }

      indicator.value = true

      if (toggleReason) {
        toggleReason.value = event
      }

      if (isFunction(onShow)) {
        onShow(event)
      }
    }

    function doHide(event?: Optional<Event>) {
      if (indicator.value === false) {
        return
      }

      indicator.value = false

      if (toggleReason) {
        toggleReason.value = event
      }

      if (isFunction(onHide)) {
        onHide(event)
      }
    }

    function onChange(val?: Optional<boolean>) {
      if (!isBoolean(val)) {
        return
      }

      if (props.isDisabled && val) {
        if (hasUpdateHandler.value) {
          emit(updateEventKey, false)
        }

        return
      }

      if (indicator.value !== val) {
        if (val) {
          doShow()
        } else {
          doHide()
        }
      }
    }

    function toggle() {
      if (indicator.value) {
        hide()
      } else {
        show()
      }
    }

    watch(() => props[name], onChange)

    // eslint-disable-next-line unicorn/consistent-destructuring
    if (shouldHideWhenRouteChanges && !isNil(instance.appContext.config.globalProperties['$route'])) {
      watch(
        () => ({
          // eslint-disable-next-line unicorn/consistent-destructuring
          ...instance.proxy!['$route'],
        }),
        () => {
          if (shouldHideWhenRouteChanges.value && indicator.value) {
            hide()
          }
        },
      )
    }

    onMounted(() => {
      onChange(props[name])
    })

    return {
      show,
      hide,
      toggle,
      hasUpdateHandler,
    }
  }

  return {
    useModelToggle,
  }
}

const { useModelToggle } = createModelToggleComposable('modelValue')

export { useModelToggle }

type UseModelTogglePropsGeneric<T extends string> = {
  [K in T]: boolean
} & {
  [K in `onUpdate:${T}`]: (payload: boolean) => void
}
