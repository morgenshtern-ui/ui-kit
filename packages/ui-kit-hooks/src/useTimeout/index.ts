/* eslint-disable @typescript-eslint/no-explicit-any */
import { tryOnScopeDispose } from '@vueuse/core'

export function useTimeout() {
  let timeoutHandle: number

  function registerTimeout(fn: (...args: any[]) => any, delay: number) {
    cancelTimeout()
    timeoutHandle = window.setTimeout(fn, delay)
  }

  function cancelTimeout() {
    window.clearTimeout(timeoutHandle)
  }

  tryOnScopeDispose(() => cancelTimeout())

  return {
    registerTimeout,
    cancelTimeout,
  }
}
