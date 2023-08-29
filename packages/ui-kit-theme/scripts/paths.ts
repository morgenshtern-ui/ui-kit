import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))

export const pathRoot = resolve(dir, '..')
export const pathSrc = resolve(pathRoot, 'src')
export const pathStyles = resolve(pathSrc, 'styles')
export const pathStylesTokens = resolve(pathStyles, 'tokens')
export const pathStylesTokensRef = resolve(pathStylesTokens, 'ref')
export const pathStylesTokensSys = resolve(pathStylesTokens, 'sys')
