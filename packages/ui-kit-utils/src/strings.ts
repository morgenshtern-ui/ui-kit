import { capitalize as toCapitalize } from '@vue/shared'

export {
  camelize,
  hyphenate,
  hyphenate as kebabCase, // alias
} from '@vue/shared'

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export function escapeStringRegexp(string = '') {
  return string.replaceAll(/[$()*+.?[\\\]^{|}]/g, '\\$&').replaceAll('-', '\\x2d')
}

// NOTE: улучшить типы заглавных букв. Восстановить предыдущий код после [PR](https://github.com/vuejs/core/pull/6212) merge
export function capitalize<T extends string>(str: T) {
  return toCapitalize(str) as Capitalize<T>
}

export function toKebabCase(str = '') {
  if (toKebabCase.cache.has(str)) {
    return toKebabCase.cache.get(str)!
  }

  const kebab = str
    .replaceAll(/[^a-z]/gi, '-')
    .replaceAll(/\B[A-Z]/g, '-$1')
    .toLowerCase()

  toKebabCase.cache.set(str, kebab)

  return kebab
}
toKebabCase.cache = new Map<string, string>()
