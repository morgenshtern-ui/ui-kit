export const RefLineHeightBase = {
  '100': 16,
  '200': 20,
  '300': 24,
  '400': 28,
  '500': 32,
  '600': 40,
} as const

type IRefLineHeight<Base extends typeof RefLineHeightBase = typeof RefLineHeightBase> = {
  [Size in keyof Base]: {
    value: Base[Size]
    name: Size extends string ? `line-height-${Size}` : never
  }
}

export const RefLineHeight = Object.entries(RefLineHeightBase).reduce((result, [size, val]) => {
  result[size] = {
    value: val,
    name: `line-height-${size}`,
  }

  return result
}, {} as any) as IRefLineHeight
