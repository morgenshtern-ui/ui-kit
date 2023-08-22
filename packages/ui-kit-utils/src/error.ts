import { isString } from './shared'

class TeleskopLabsError extends Error {
  public constructor(m: string) {
    super(m)
    this.name = 'TeleskopLabsError'
  }
}

export function throwError(scope: string, m: string): never {
  throw new TeleskopLabsError(`[${scope}] ${m}`)
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope) ? new TeleskopLabsError(`[${scope}] ${message}`) : scope

    console.warn(error)
  }
}
