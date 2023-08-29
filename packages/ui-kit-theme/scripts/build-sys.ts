/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFileSync } from 'node:fs'

import { emptyDirSync } from 'fs-extra'

import {
  SysBorderRadius,
  SysBorderWidth,
  SysColorBackground,
  SysColorBlanket,
  SysColorBorder,
  SysColorIcon,
  SysColorInteraction,
  SysColorLink,
  SysColorSkeleton,
  SysColorText,
  SysElevationShadow,
  SysElevationSurface,
  SysOpacity,
  SysZIndex,
} from '../source/tokens'
import { pathStylesTokensSys } from './paths'
import { jsToCss } from './utils'

const THEME_NAMES = new Set(['light', 'dark'])
const THEME_KEY_NAMES = new Set([...THEME_NAMES].map((name) => `$${name}`))

export function buildSys() {
  console.log('Building [Sys]...')
  ;[...THEME_NAMES].forEach((themeName) => {
    emptyDirSync(`${pathStylesTokensSys}/${themeName}`)
  })

  const colorTextMap = toCssSysColorText(SysColorText)
  const colorLinkMap = toCssSysColorLink(SysColorLink)
  const colorIconMap = toCssSysColorIcon(SysColorIcon)
  const colorBorderMap = toCssSysColorBorder(SysColorBorder)
  const colorBackgroundMap = toCssSysColorBackground(SysColorBackground)
  const colorBlanketMap = toCssSysColorBlanket(SysColorBlanket)
  const colorInteractionMap = toCssSysColorInteraction(SysColorInteraction)
  const colorSkeletonMap = toCssSysColorSkeleton(SysColorSkeleton)
  const elevationSurfaceMap = toCssSysElevationSurface(SysElevationSurface)
  const elevationShadowMap = toCssSysElevationShadow(SysElevationShadow)
  const borderWidth = toCssSysBorderWidth(SysBorderWidth)
  const borderRadius = toCssSysBorderRadius(SysBorderRadius)
  const opacityMap = toCssSysOpacity(SysOpacity)
  const zIndex = toCssSysZIndex(SysZIndex)

  Object.keys(colorBackgroundMap).forEach((themeName) => {
    const content = {
      ...colorTextMap[themeName]!,
      ...colorLinkMap[themeName]!,
      ...colorIconMap[themeName]!,
      ...colorBorderMap[themeName]!,
      ...colorBackgroundMap[themeName]!,
      ...colorBlanketMap[themeName]!,
      ...colorInteractionMap[themeName]!,
      ...colorSkeletonMap[themeName]!,
      ...elevationSurfaceMap[themeName]!,
      ...elevationShadowMap[themeName]!,
      ...opacityMap[themeName]!,
    }

    writeFileSync(`${pathStylesTokensSys}/${themeName}/index.css`, createCssTemplate(jsToCss(content), themeName))
    // writeFileSync(
    //   `${pathStylesTokensSys}/${themeName}/${SysFiles.color.blanket}.css`,
    //   createCssTemplate(jsToCss(colorBlanketMap[themeName]!), themeName),
    // )
    // writeFileSync(
    //   `${pathStylesTokensSys}/${themeName}/${SysFiles.color.text}.css`,
    //   createCssTemplate(jsToCss(colorTextMap[themeName]!), themeName),
    // )
  })

  writeFileSync(
    `${pathStylesTokensSys}/index.css`,
    createCssTemplate(
      jsToCss({
        ...zIndex,
        ...borderWidth,
        ...borderRadius,
      }),
    ),
  )

  // console.log(backgroundMap)

  // writeFileSync(
  //   `${pathStylesTokensSys}/color/${SysFiles.color.background}.css`,
  //   toCssSysColorBackground(SysColorBackground),
  // )
  // writeFileSync(`${pathStylesTokensSys}/color/index.css`, createCssIndexTemplate(Object.values(SysFiles.color)))
}

// Color Text

function toCssSysColorText(payload: typeof SysColorText) {
  return buildThemeMap(flattenObj(payload), 'color-text')
}

// Color Link

function toCssSysColorLink(payload: typeof SysColorLink) {
  return buildThemeMap(flattenObj(payload), 'color-link')
}

// Color Icon

function toCssSysColorIcon(payload: typeof SysColorIcon) {
  return buildThemeMap(flattenObj(payload), 'color-icon')
}

// Color Border

function toCssSysColorBorder(payload: typeof SysColorBorder) {
  return buildThemeMap(flattenObj(payload), 'color-border')
}

// Color Background

function toCssSysColorBackground(payload: typeof SysColorBackground) {
  return buildThemeMap(flattenObj(payload), 'color-background')
}

// Color Blanket

function toCssSysColorBlanket(payload: typeof SysColorBlanket) {
  return buildThemeMap(flattenObj(payload), 'color-blanket')
}

// Color Interaction

function toCssSysColorInteraction(payload: typeof SysColorInteraction) {
  return buildThemeMap(flattenObj(payload), 'color-interaction')
}

// Color Skeleton

function toCssSysColorSkeleton(payload: typeof SysColorSkeleton) {
  return buildThemeMap(flattenObj(payload), 'color-skeleton')
}

// Elevation Surface

function toCssSysElevationSurface(payload: typeof SysElevationSurface) {
  return buildThemeMap(flattenObj(payload), 'elevation-surface')
}

// Elevation Shadow

function toCssSysElevationShadow(payload: typeof SysElevationShadow) {
  return buildThemeMap(flattenObj(payload), 'elevation-shadow')
}

// Border Width

function toCssSysBorderWidth(payload: typeof SysBorderWidth) {
  return buildThemeMap(payload, 'border-width', 'border-width', false)
}
// Border Radius

function toCssSysBorderRadius(payload: typeof SysBorderRadius) {
  return buildThemeMap(payload, 'border-radius', 'border-radius', false)
}

// Opacity

function toCssSysOpacity(payload: typeof SysOpacity) {
  return buildThemeMap(flattenObj(payload), 'opacity')
}

// Z Index

function toCssSysZIndex(payload: typeof SysZIndex) {
  return buildThemeMap(payload, 'z-index', 'z-index', false)
}

/// Utils

function buildThemeMap(payload: Record<string, any>, scope: string, refScope = 'palette', needSplit = true) {
  const map = Object.fromEntries(
    Object.entries(payload).map(([name, value]: any) => [
      formatTokenName(`--t-sys-${scope}-${name}`),
      getRefToken(refScope, value),
    ]),
  )

  if (!needSplit) {
    return map
  }

  return splitTokensByTheme(map)
}

function splitTokensByTheme(payload: Record<string, any>) {
  const themeMap: Record<string, Record<string, string>> = {}

  ;[...THEME_NAMES].forEach((themeName) => {
    themeMap[themeName] = Object.fromEntries(
      Object.entries(filterByTheme(payload, themeName)).map(([name, value]) => [
        name.replace(`-${themeName}`, ''),
        value,
      ]),
    )
  })

  return themeMap
}

function filterByTheme(payload: Record<string, any>, theme: string) {
  return Object.fromEntries(Object.entries(payload).filter(([key]) => key.endsWith(theme)))
}

function createCssTemplate(content: string, theme: string | undefined = undefined) {
  if (!theme) {
    return `@layer themes {
  :root {
${content}
  }
}`
  }

  return `@layer themes {
  [data-color-mode="${theme}"] {
${content}

    color-scheme: ${theme};
  }
}`
}

function formatTokenName(name: string) {
  return name.replaceAll('$', '').replaceAll('-default', '')
}

function getRefToken(scope: string, payload: any) {
  const sizeScope = ['border-radius', 'border-width']

  if (sizeScope.includes(scope)) {
    return isObject(payload)
      ? `var(--t-ref-${scope}-${formatTokenName((payload as any).name)}, ${(payload as any).value}px)`
      : `${payload}px`
  }

  return isObject(payload)
    ? `var(--t-ref-${scope}-${formatTokenName((payload as any).name)}, ${(payload as any).value})`
    : payload
}

function flattenObj(
  payload: Record<string, any>,
  parentKey: string | undefined = undefined,
  result: Record<string, any> = {},
) {
  Object.keys(payload).forEach((key) => {
    const pathColor = parentKey ? `${parentKey}-${key}` : key
    const val = payload[key]

    if (isObject(val) && !THEME_KEY_NAMES.has(key)) {
      flattenObj(val, pathColor, result)
    } else {
      result[pathColor] = val
    }
  })

  return result
}

function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}
