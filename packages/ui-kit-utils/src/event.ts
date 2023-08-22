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
