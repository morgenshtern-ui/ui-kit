import type { LocationQueryRaw } from './LocationQuery'

/**
 * @internal
 */
export interface RouteQueryAndHash {
  query?: LocationQueryRaw
  hash?: string
}
