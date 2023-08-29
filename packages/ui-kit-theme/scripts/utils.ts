// Css

export function jsToCss(payload: Record<string, any>) {
  return Object.entries(payload)
    .reduce((acc, [key, value]) => `${acc}    ${key}: ${value};\n`, '')
    .trimEnd()
}
