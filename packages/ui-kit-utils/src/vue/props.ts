// TODO: можно, наверное, экспортировать из компонента interface пропросов и отсальное, если надо
import type { OptionsFields } from '../typescript'

export function defintDefaultProps<S extends object>() {
  return <D extends InferDefaults<OptionsFields<S>>>(params: D): Readonly<D> => params
}

// Props

// Взято из vue/runtime-core
// TOOD: определить место
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BooleanKey<T, K extends keyof T = keyof T> = K extends any
  ? [T[K]] extends [boolean | undefined]
    ? K
    : never
  : never

type NotUndefined<T> = T extends undefined ? never : T

type NativeType = null | number | string | boolean | symbol | Function
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never)
type PropsWithDefaults<T, Defaults extends InferDefaults<T>, BKeys extends keyof T> = Omit<T, keyof Defaults> & {
  [K in keyof Defaults]-?: K extends keyof T ? (Defaults[K] extends undefined ? T[K] : NotUndefined<T[K]>) : never
} & {
  readonly [K in BKeys]-?: boolean
}

type InferDefaults<T> = {
  [K in keyof T]?: InferDefault<T, T[K]>
}

export type NPropsWithDefaults<T, P extends InferDefaults<T>> = PropsWithDefaults<T, P, BooleanKey<T>>
