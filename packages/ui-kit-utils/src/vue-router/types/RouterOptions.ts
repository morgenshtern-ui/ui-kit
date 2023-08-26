import type { Awaitable } from '../../typescript'
import type { LocationQuery, LocationQueryRaw } from './LocationQuery'
import type { PathParserOptions } from './PathParserOptions'
import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from './RouteLocation'
import type { RouteRecordRaw } from './RouteRecord'
import type { RouterHistory } from './RouterHistory'
import type { _ScrollPositionNormalized, ScrollPosition } from './Scroll'

/**
 * Options to initialize a {@link Router} instance.
 */
export interface RouterOptions extends PathParserOptions {
  /**
   * History implementation used by the router. Most web applications should use
   * `createWebHistory` but it requires the server to be properly configured.
   * You can also use a _hash_ based history with `createWebHashHistory` that
   * does not require any configuration on the server but isn't handled at all
   * by search engines and does poorly on SEO.
   *
   * @example
   * ```js
   * createRouter({
   *   history: createWebHistory(),
   *   // other options...
   * })
   * ```
   */
  history: RouterHistory
  /**
   * Initial list of routes that should be added to the router.
   */
  routes: Readonly<RouteRecordRaw[]>
  /**
   * Function to control scrolling when navigating between pages. Can return a
   * Promise to delay scrolling. Check {@link ScrollBehavior}.
   *
   * @example
   * ```js
   * function scrollBehavior(to, from, savedPosition) {
   *   // `to` and `from` are both route locations
   *   // `savedPosition` can be null if there isn't one
   * }
   * ```
   */
  scrollBehavior?: RouterScrollBehavior
  /**
   * Custom implementation to parse a query. See its counterpart,
   * {@link RouterOptions.stringifyQuery}.
   *
   * @example
   * Let's say you want to use the [qs package](https://github.com/ljharb/qs)
   * to parse queries, you can provide both `parseQuery` and `stringifyQuery`:
   * ```js
   * import qs from 'qs'
   *
   * createRouter({
   *   // other options...
   *   parseQuery: qs.parse,
   *   stringifyQuery: qs.stringify,
   * })
   * ```
   */
  parseQuery?: ParseQuery
  /**
   * Custom implementation to stringify a query object. Should not prepend a leading `?`.
   * {@link RouterOptions.parseQuery | parseQuery} counterpart to handle query parsing.
   */
  stringifyQuery?: StringifyQuery
  /**
   * Default class applied to active {@link RouterLink}. If none is provided,
   * `router-link-active` will be applied.
   */
  linkActiveClass?: string
  /**
   * Default class applied to exact active {@link RouterLink}. If none is provided,
   * `router-link-exact-active` will be applied.
   */
  linkExactActiveClass?: string
}

/**
 * Type of the `scrollBehavior` option that can be passed to `createRouter`.
 *
 * @param to - Route location where we are navigating to
 * @param from - Route location where we are navigating from
 * @param savedPosition - saved position if it exists, `null` otherwise
 */
export type RouterScrollBehavior = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  savedPosition: _ScrollPositionNormalized | null,
) => Awaitable<ScrollPosition | false | void>

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
 * version with the leading `?` and without Should work as URLSearchParams

 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
export type ParseQuery = (search: string) => LocationQuery

/**
 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
 * doesn't prepend a `?`
 *
 * @internal
 *
 * @param query - query object to stringify
 * @returns string version of the query without the leading `?`
 */
export type StringifyQuery = (query: LocationQueryRaw) => string
