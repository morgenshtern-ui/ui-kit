export const RefFontWeightBase = {
  bold: 700,
  medium: 500,
  regular: 400,
  semibold: 600,
} as const

type IRefFontWeight<Base extends typeof RefFontWeightBase = typeof RefFontWeightBase> = {
  [Size in keyof Base]: {
    value: Base[Size]
    name: Size extends string ? `font-weight-${Size}` : never
  }
}

export const RefFontWeight = Object.entries(RefFontWeightBase).reduce((result, [size, val]) => {
  result[size] = {
    value: val,
    name: `font-weight-${size}`,
  }

  return result
}, {} as any) as IRefFontWeight
