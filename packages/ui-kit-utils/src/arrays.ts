export function unique<T>(arr: T[]) {
  return [...new Set(arr)]
}
// const d:

export function arrWrap<T>(arr: T | T[]): T[] {
  return Array.isArray(arr) ? arr : ([arr] as T[])
}

type Many<T> = T | readonly T[]

// TODO: rename to `ensureArray`
/** like `_.castArray`, except falsy value returns empty array. */
export function ensureArray<T>(arr: Many<T>): T[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!arr && (arr as any) !== 0) {
    return []
  }

  return Array.isArray(arr) ? arr : ([arr] as T[])
}

export { castArray } from 'lodash-es'
