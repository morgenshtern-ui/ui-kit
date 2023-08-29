export const RefFontFamilyBase = {
  'sans-serif':
    "'Inter', system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  monospace: "'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace",
} as const

type IRefFontFamily<Base extends typeof RefFontFamilyBase = typeof RefFontFamilyBase> = {
  [Name in keyof Base]: {
    value: Base[Name]
    name: Name extends string ? `font-family-${Name}` : never
  }
}

export const RefFontFamily = Object.entries(RefFontFamilyBase).reduce((result, [size, val]) => {
  result[size] = {
    value: val,
    name: `font-family-${size}`,
  }

  return result
}, {} as any) as IRefFontFamily
