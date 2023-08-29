export const RefSpaceBase = {
  '0': 0,
  '025': 2,
  '050': 4,
  '075': 6,
  '100': 8,
  '150': 12,
  '200': 16,
  '250': 20,
  '300': 24,
  '400': 32,
  '500': 40,
  '600': 48,
  '800': 64,
  '1000': 80,
} as const

type IRefSpace<Base extends typeof RefSpaceBase = typeof RefSpaceBase> = {
  [Size in keyof Base]: {
    value: Base[Size]
    name: Size extends string ? `space-${Size}` : never
  }
}

export const RefSpace = Object.entries(RefSpaceBase).reduce((result, [size, val]) => {
  result[size] = {
    value: val,
    name: `space-${size}`,
  }

  return result
}, {} as any) as IRefSpace
