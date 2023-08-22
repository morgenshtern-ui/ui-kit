import type { CSSProperties } from 'vue'

import { isClient } from '../browser'
import { debugWarn } from '../error'
import { entriesOf, keysOf } from '../objects'
import { isNumber, isObject, isString, isStringNumber } from '../shared'
import { camelize } from '../strings'

const SCOPE = 'utils/dom/style'

export function classNameToArray(cls = '') {
  return cls.split(' ').filter((item) => !!item.trim())
}

export function hasClass(el: Element, cls: string): boolean {
  if (!el || !cls) {
    return false
  }

  if (cls.includes(' ')) {
    throw new Error('className should not contain space.')
  }

  return el.classList.contains(cls)
}

export function addClass(el: Element, cls: string) {
  if (!el || !cls.trim()) {
    return
  }

  el.classList.add(...classNameToArray(cls))
}

export function removeClass(el: Element, cls: string) {
  if (!el || !cls.trim()) {
    return
  }

  el.classList.remove(...classNameToArray(cls))
}

export function getStyle(element: HTMLElement, styleName: keyof CSSProperties): string {
  if (!isClient || !element || !styleName) {
    return ''
  }

  let key = camelize(styleName) as keyof CSSStyleDeclaration

  if (key === 'float') {
    key = 'cssFloat'
  }

  try {
    const style = element.style[key]

    if (style) {
      return style as string
    }

    const computed = document.defaultView?.getComputedStyle(element, '')

    return computed ? (computed[key]! as string) : ''
  } catch {
    return element.style[key]! as string
  }
}

export function setStyle(
  element: HTMLElement,
  styleName: CSSProperties | keyof CSSProperties,
  value?: string | number,
) {
  if (!element || !styleName) {
    return
  }

  if (isObject(styleName)) {
    entriesOf(styleName).forEach(([prop, val]) => setStyle(element, prop, val))
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const key = camelize(styleName) as any

    element.style[key] = value as string
  }
}

export function removeStyle(element: HTMLElement, style: CSSProperties | keyof CSSProperties) {
  if (!element || !style) {
    return
  }

  if (isObject(style)) {
    keysOf(style).forEach((prop) => removeStyle(element, prop))
  } else {
    setStyle(element, style, '')
  }
}

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) {
    return ''
  }

  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`
  }

  if (isString(value)) {
    return value
  }

  debugWarn(SCOPE, 'binding value must be a string or number')

  return ''
}
