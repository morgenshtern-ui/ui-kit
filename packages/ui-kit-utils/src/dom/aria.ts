import { isNil } from '../shared'

export const isVisible = (element: HTMLElement) => {
  if (process.env.NODE_ENV === 'test') {
    return true
  }

  const computed = getComputedStyle(element)

  // element.offsetParent won't work on fix positioned
  // WARNING: potential issue here, going to need some expert advices on this issue
  return computed.position === 'fixed' ? false : !isNil(element.offsetParent)
}

export function isLeaf(el: HTMLElement) {
  return !el.getAttribute('aria-owns')
}

export function getSibling(el: HTMLElement, distance: number, elClass: string) {
  const { parentNode } = el

  if (!parentNode) {
    return undefined
  }

  const siblings = parentNode.querySelectorAll(elClass)
  const index = Array.prototype.indexOf.call(siblings, el)

  return siblings[index + distance]
}

export function triggerEvent(el: HTMLElement, name: string, ...opts: boolean[]): HTMLElement {
  let eventName: string

  if (name.includes('mouse') || name.includes('click')) {
    eventName = 'MouseEvents'
  } else if (name.includes('key')) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }

  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  el.dispatchEvent(evt)

  return el
}

export function focusNode(el: HTMLElement) {
  if (!el) {
    return
  }

  el.focus()
  !isLeaf(el) && el.click()
}
