export const RefBorderRadiusBase = {
  '50': 2,
  '100': 4,
  '200': 8,
  '300': 12,
  '400': 16,
} as const

type IRefBorderRadius<Base extends typeof RefBorderRadiusBase = typeof RefBorderRadiusBase> = {
  [Size in keyof Base]: {
    value: Base[Size]
    name: Size extends string ? `border-radius-${Size}` : never
  }
}

export const RefBorderRadius = Object.entries(RefBorderRadiusBase).reduce((result, [size, val]) => {
  result[size] = {
    value: val,
    name: `border-radius-${size}`,
  }

  return result
}, {} as any) as IRefBorderRadius
