import { isClient } from '../browser'
import { isNil } from '../shared'
import type { Optional } from '../typescript'
import { getStyle } from './style'

export function isScroll(el: HTMLElement, isVertical?: boolean): boolean {
  if (!isClient) {
    return false
  }

  const key = (
    {
      undefined: 'overflow',
      true: 'overflow-y',
      false: 'overflow-x',
    } as const
  )[String(isVertical)]!
  const overflow = getStyle(el, key)

  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}

export function getScrollContainer(el: HTMLElement, isVertical?: boolean): Optional<Window | HTMLElement> {
  if (!isClient) {
    return
  }

  let parent: HTMLElement = el

  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }

    if (isScroll(parent, isVertical)) {
      return parent
    }

    parent = parent.parentNode as HTMLElement
  }

  return parent
}

let scrollBarWidth: number

export function getScrollBarWidth(namespace: string): number {
  if (!isClient) {
    return 0
  }

  if (!isNil(scrollBarWidth)) {
    return scrollBarWidth
  }

  const outer = document.createElement('div')

  outer.className = `${namespace}-scrollbar__wrap`
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.append(outer)

  const widthNoScroll = outer.offsetWidth

  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')

  inner.style.width = '100%'
  outer.append(inner)

  const widthWithScroll = inner.offsetWidth

  outer.remove()
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}

/**
 * Прокрутите элемент контейнера, расположив элемент **selected** в верхней части контейнера.
 */
export function scrollIntoView(container: HTMLElement, selected: HTMLElement): void {
  if (!isClient) {
    return
  }

  if (!selected) {
    container.scrollTop = 0

    return
  }

  const offsetParents: HTMLElement[] = []
  let pointer = selected.offsetParent

  while (!isNil(pointer) && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer as HTMLElement)
    pointer = (pointer as HTMLElement).offsetParent
  }

  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}
