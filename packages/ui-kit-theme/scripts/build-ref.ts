import { writeFileSync } from 'node:fs'

import { emptyDirSync } from 'fs-extra'

import {
  RefBorderRadius,
  RefFontFamily,
  RefFontSize,
  RefFontWeight,
  RefLineHeight,
  RefPalette,
  RefSpace,
} from '../source/tokens'
import { pathStylesTokensRef } from './paths'
import { jsToCss } from './utils'

export function buildRef() {
  console.log('Building [Ref]...')
  emptyDirSync(pathStylesTokensRef)

  const content = {
    ...toCssRefFontFamily(RefFontFamily),
    ...toCssRefFontSize(RefFontSize),
    ...toCssRefFontWeight(RefFontWeight),
    ...toCssRefLineHeight(RefLineHeight),
    ...toCssRefSpace(RefSpace),
    ...toCssRefPalette(RefPalette),
    ...toCssRefBorderRadius(RefBorderRadius),
  }

  writeFileSync(`${pathStylesTokensRef}/index.css`, createCssTemplate(jsToCss(content)))
}

// RefPalette

function toCssRefPalette(payload: typeof RefPalette) {
  let content = {} as Record<string, string>

  Object.entries(payload).forEach(([colorName, colorMap]) => {
    const newColorMap = Object.fromEntries(
      Object.entries(colorMap)
        .sort((a, b) => sortNumberKeys(a[0], b[0]))
        .map(([colorVal, colorInfo]) => [createCssTokenRef(`palette-${colorName}`, colorVal), colorInfo.value]),
    )

    content = { ...content, ...newColorMap }
  })

  return content
}

// RefSpace

function toCssRefSpace(payload: typeof RefSpace) {
  const content = Object.fromEntries(
    Object.entries(payload)
      .sort((a, b) => sortNumberKeys(a[0], b[0]))
      .map(([key, value]) => [createCssTokenRef('space', key), `${value.value}px`]),
  )

  return content
}

// RefBorderRadius

function toCssRefBorderRadius(payload: typeof RefBorderRadius) {
  const content = Object.fromEntries(
    Object.entries(payload)
      .sort((a, b) => sortNumberKeys(a[0], b[0]))
      .map(([key, value]) => [createCssTokenRef('border-radius', key), `${value.value}px`]),
  )

  return content
}

// RefFontFamily

function toCssRefFontFamily(payload: typeof RefFontFamily) {
  const content = Object.fromEntries(
    Object.entries(payload)
      .sort((a, b) => sortNumberKeys(a[0], b[0]))
      .map(([key, value]) => [createCssTokenRef('font-family', key), value.value]),
  )

  return content
}

// RefFontSize

function toCssRefFontSize(payload: typeof RefFontSize) {
  const content = Object.fromEntries(
    Object.entries(payload)
      .sort((a, b) => sortNumberKeys(a[0], b[0]))
      .map(([key, value]) => [createCssTokenRef('font-size', key), `${value.value}px`]),
  )

  return content
}

// RefFontWeight

function toCssRefFontWeight(payload: typeof RefFontWeight) {
  const content = Object.fromEntries(
    Object.entries(payload)
      .sort((a, b) => sortNumberKeys(a[0], b[0]))
      .map(([key, value]) => [createCssTokenRef('font-weight', key), value.value]),
  )

  return content
}

// RefLineHeight

function toCssRefLineHeight(payload: typeof RefLineHeight) {
  const content = Object.fromEntries(
    Object.entries(payload)
      .sort((a, b) => sortNumberKeys(a[0], b[0]))
      .map(([key, value]) => [createCssTokenRef('line-height', key), `${value.value}px`]),
  )

  return content
}

/// Utils

function createCssTemplate(content: string) {
  return `@layer themes {
  :root {
${content}
  }
}`
}

function createCssTokenRef(scope: string, value: string) {
  return `--t-ref-${scope}-${value}`
}

function sortNumberKeys(a: string, b: string) {
  return Number(a) - Number(b)
}
