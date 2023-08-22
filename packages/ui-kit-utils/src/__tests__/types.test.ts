import * as vueShared from '@vue/shared'
import * as vue from 'vue'

import { isArray, isElement, isEmpty, isPropAbsent, isUndefined, isVNode } from '..'

describe('types', () => {
  it('re-export from @vue/shared', () => {
    expect(isArray).toBe(vueShared.isArray)
  })

  it('re-export from vue', () => {
    expect(isVNode).toBe(vue.isVNode)
  })

  it('isUndefined should work', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined('null')).toBe(false)
  })

  it('isEmpty should work', () => {
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty('hello')).toBe(false)
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(true)
  })

  it('isElement should work', () => {
    expect(isElement(document.createElement('div'))).toBe(true)
    expect(isElement(document.createElement('span'))).toBe(true)
    expect(isElement(document.createElement('h1'))).toBe(true)
    expect(isElement({})).toBe(false)
    expect(isElement('element')).toBe(false)
  })

  it('isElement should return false when Element is not exists', () => {
    const _Element = window.Element

    window.Element = undefined as any
    expect(isElement(document.createElement('div'))).toBe(false)

    window.Element = _Element
    expect(isElement(document.createElement('div'))).toBe(true)
  })

  it('isPropAbsent should work', () => {
    expect(isPropAbsent(null)).toBe(true)
    expect(isPropAbsent(undefined)).toBe(true)
    expect(isPropAbsent(123)).toBe(false)
    expect(isPropAbsent({})).toBe(false)
  })
})
