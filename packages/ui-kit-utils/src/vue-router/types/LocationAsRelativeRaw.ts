import type { RouteParamsRaw } from './RouteParam'
import type { RouteRecordName } from './RouteRecord'

/**
 * @internal
 */
export interface LocationAsRelativeRaw {
  name?: RouteRecordName
  params?: RouteParamsRaw
}
