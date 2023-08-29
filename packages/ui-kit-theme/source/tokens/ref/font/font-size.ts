export const RefFontSizeBase = {
  '050': 11,
  '075': 12,
  '100': 14,
  '200': 16,
  '300': 20,
  '400': 24,
  '500': 29,
  '600': 35,
} as const

type IRefFontSize<Base extends typeof RefFontSizeBase = typeof RefFontSizeBase> = {
  [Size in keyof Base]: {
    value: Base[Size]
    name: Size extends string ? `font-size-${Size}` : never
  }
}

export const RefFontSize = Object.entries(RefFontSizeBase).reduce((result, [size, val]) => {
  result[size] = {
    value: val,
    name: `font-size-${size}`,
  }

  return result
}, {} as any) as IRefFontSize
