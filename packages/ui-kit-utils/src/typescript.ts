// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mutable<T extends readonly any[] | Record<string, unknown>>(val: T) {
  return val as Mutable<typeof val>
}

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type HTMLElementCustomized<T> = HTMLElement & T

export type Nullable<T> = T | null
export type Nillable<T> = T | undefined | null
export type Optional<T> = T | undefined

export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T

export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalPropertyOf<BaseType extends object> = Exclude<
  {
    [Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]> ? never : Key
  }[keyof BaseType],
  undefined
>

export type OptionsFields<T extends object> = Pick<T, OptionalPropertyOf<T>>
