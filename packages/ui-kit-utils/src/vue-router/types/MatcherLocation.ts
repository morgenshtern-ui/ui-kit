import type { RouteMeta } from './RouteMeta'
import type { RouteParams } from './RouteParam'
import type { RouteRecord, RouteRecordName } from './RouteRecord'

/**
 * Normalized/resolved Route location that returned by the matcher.
 */
export interface MatcherLocation {
  /**
   * Name of the matched record
   */
  name: RouteRecordName | null | undefined
  /**
   * Percentage encoded pathname section of the URL.
   */
  path: string
  /**
   * Object of decoded params extracted from the `path`.
   */
  params: RouteParams
  /**
   * Merged `meta` properties from all the matched route records.
   */
  meta: RouteMeta
  /**
   * Array of {@link RouteRecord} containing components as they were
   * passed when adding records. It can also contain redirect records. This
   * can't be used directly
   */
  matched: RouteRecord[]
}

/**
 * @internal
 */
export interface MatcherLocationAsPath {
  path: string
}
