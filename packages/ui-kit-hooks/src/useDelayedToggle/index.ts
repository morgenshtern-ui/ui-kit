import { defintDefaultProps, isNumber, type TPropsWithDefaults } from '@teleskop-labs/ui-kit-utils'
import type { ToRefs } from 'vue'
import { unref } from 'vue'

import { useTimeout } from '../useTimeout'

interface TDelayedToggleProps {
  /**
   * @description delay of appearance, in millisecond
   */
  readonly showAfter?: number
  /**
   * @description delay of disappear, in millisecond
   */
  readonly hideAfter?: number
  /**
   * @description disappear automatically, in millisecond
   */
  readonly autoClose?: number
}

export const TDelayedToggleDefaultProps = defintDefaultProps<TDelayedToggleProps>()({
  showAfter: 0,
  hideAfter: 200,
  autoClose: 0,
})

export type TDelayedTogglePropsWithDefaults = TPropsWithDefaults<TDelayedToggleProps, typeof TDelayedToggleDefaultProps>

export type UseDelayedToggleProps = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<TDelayedTogglePropsWithDefaults>

export function useDelayedToggle({ showAfter, hideAfter, autoClose, open, close }: UseDelayedToggleProps) {
  const { registerTimeout } = useTimeout()
  const { registerTimeout: registerTimeoutForAutoClose, cancelTimeout: cancelTimeoutForAutoClose } = useTimeout()

  function delayOpen(event?: Event) {
    registerTimeout(() => {
      open(event)

      const autoCloseUnref = unref(autoClose)

      if (isNumber(autoCloseUnref) && autoCloseUnref > 0) {
        registerTimeoutForAutoClose(() => {
          close(event)
        }, autoCloseUnref)
      }
    }, unref(showAfter))
  }

  function delayClose(event?: Event) {
    cancelTimeoutForAutoClose()

    registerTimeout(() => {
      close(event)
    }, unref(hideAfter))
  }

  return {
    delayOpen,
    delayClose,
  }
}
