export { isVNode, type VNode } from 'vue'

const objectToString = Object.prototype.toString

export function toTypeString(value: unknown) {
  return objectToString.call(value)
}

export const { isArray } = Array

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMap(val: unknown): val is Map<any, any> {
  return toTypeString(val) === '[object Map]'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSet(val: unknown): val is Set<any> {
  return toTypeString(val) === '[object Set]'
}

export function isDate(val: unknown): val is Date {
  return toTypeString(val) === '[object Date]'
}

export function isRegExp(val: unknown): val is RegExp {
  return toTypeString(val) === '[object RegExp]'
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}

export function isSymbol(val: unknown): val is Symbol {
  return typeof val === 'symbol'
}

export function isPlainObject(val: unknown): val is object {
  return toTypeString(val) === '[object Object]'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (isObject(val) || isFunction(val)) && isFunction((val as any).then) && isFunction((val as any).catch)
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

export function isEmpty(val: unknown) {
  return (!val && val !== 0) || (isArray(val) && val.length === 0) || (isObject(val) && Object.keys(val).length === 0)
}

export function isElement(element: unknown): element is Element {
  if (Element === undefined) {
    return false
  }

  return element instanceof Element
}

export function isStringNumber(val: string): boolean {
  if (!isString(val)) {
    return false
  }

  return !Number.isNaN(Number(val))
}
export function isNull(value: unknown): value is undefined {
  return value === null
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined
}
export function isNil(value: unknown): value is null | undefined {
  // eslint-disable-next-line unicorn/no-null, eqeqeq
  return value == null
}

export function isPropAbsent(prop: unknown): prop is null | undefined {
  return isNil(prop)
}

export function NOOP() {}

export function toRawType(value: unknown): string {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}
