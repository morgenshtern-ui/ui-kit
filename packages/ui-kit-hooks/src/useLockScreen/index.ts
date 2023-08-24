import {
  addClass,
  getScrollBarWidth,
  getStyle,
  hasClass,
  isClient,
  removeClass,
  throwError,
} from '@teleskop-labs/ui-kit-utils'
import { isRef, onScopeDispose, type Ref, watch } from 'vue'

import { useNamespace, type UseNamespaceReturn } from '../useNamespace'

export interface UseLockScreenOptions {
  ns?: UseNamespaceReturn
  // shouldLock?: MaybeRef<boolean>
}

/**
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param isActive {Ref<boolean>}
 */
export function useLockScreen(isActive: Ref<boolean>, options: UseLockScreenOptions = {}) {
  if (!isRef(isActive)) {
    throwError('[useLockScreen]', 'You need to pass a ref param to this function')
  }

  const ns = options.ns || useNamespace('popup')

  const hiddenClassName = ns.sm('parent', 'hidden')

  if (!isClient || hasClass(document.body, hiddenClassName)) {
    return
  }

  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyWidth = '0'

  function cleanup() {
    setTimeout(() => {
      removeClass(document?.body, hiddenClassName)

      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth
      }
    }, 200)
  }

  watch(isActive, (val) => {
    if (!val) {
      cleanup()

      return
    }

    withoutHiddenClass = !hasClass(document.body, hiddenClassName)

    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width
    }

    scrollBarWidth = getScrollBarWidth(ns.namespace)
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight
    const bodyOverflowY = getStyle(document.body, 'overflowY')

    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && withoutHiddenClass) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    }

    addClass(document.body, hiddenClassName)
  })
  onScopeDispose(() => cleanup())
}
