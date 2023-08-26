import type { Optional } from '../typescript'

export const listenOptions = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true,
}

export function stop(event: Event) {
  event.stopPropagation()
}

export function prevent(event: Event) {
  event.cancelable !== false && event.preventDefault()
}

export function stopAndPrevent(event: Event) {
  event.cancelable !== false && event.preventDefault()
  event.stopPropagation()
}

export function composeEventHandlers<E>(
  theirsHandler?: (event: E) => Optional<boolean> | void,
  oursHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  function handleEvent(event: E) {
    const shouldPrevent = theirsHandler?.(event)

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event)
    }
  }

  return handleEvent
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WhenMouseHandler = (event: PointerEvent) => any

export function whenMouse(handler: WhenMouseHandler): WhenMouseHandler {
  return (event: PointerEvent) => (event.pointerType === 'mouse' ? handler(event) : undefined)
}
