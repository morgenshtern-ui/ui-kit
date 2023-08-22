import { get, set } from 'lodash-es'
import type { Entries } from 'type-fest'

import type { Arrayable } from './typescript'

export { clone as cloneObject, fromPairs, get, pick, set } from 'lodash-es'

export function keysOf<T extends object>(arr: T): Array<keyof T> {
  return Object.keys(arr) as Array<keyof T>
}

export function entriesOf<T extends object>(arr: T): Entries<T> {
  return Object.entries(arr) as Entries<T>
}

export function hasOwn(val: object, key: string | symbol): key is never {
  return Object.hasOwn(val, key)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProp<T = any>(obj: Record<string, any>, path: Arrayable<string>, defaultValue?: any): { value: T } {
  return {
    get value() {
      return get(obj, path, defaultValue)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set value(val: any) {
      set(obj, path, val)
    },
  }
}
