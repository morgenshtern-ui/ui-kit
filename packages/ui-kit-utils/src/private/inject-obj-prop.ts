/* eslint-disable @typescript-eslint/no-explicit-any */
type InferValue<Prop extends PropertyKey, Desc> = Desc extends { get: () => any; value: any }
  ? never
  : Desc extends { value: infer T }
  ? Record<Prop, T>
  : Desc extends { get: () => infer T }
  ? Record<Prop, T>
  : never

type DefineProperty<Prop extends PropertyKey, Desc extends PropertyDescriptor> = Desc extends {
  writable: any
  set: (val: any) => any
}
  ? never
  : Desc extends { writable: any; get: () => any }
  ? never
  : Desc extends { writable: false }
  ? Readonly<InferValue<Prop, Desc>>
  : Desc extends { writable: true }
  ? InferValue<Prop, Desc>
  : Readonly<InferValue<Prop, Desc>>

export function injectProp<
  Obj extends object,
  Key extends PropertyKey,
  PGet extends Required<PropertyDescriptor>['get'],
  PSet extends Required<PropertyDescriptor>['set'],
>(target: Obj, propName: Key, get?: PGet, set?: PSet): asserts target is Obj & DefineProperty<Key, { get: PGet }> {
  Object.defineProperty(target, propName, {
    get: get as any,
    set: set as any,
    enumerable: true,
  })
}

export function injectMultipleProps(target: object, props: Record<string, PropertyDescriptor['get']>) {
  Object.keys(props).forEach((key) => {
    injectProp(target, key, props[key])
  })

  return target
}
