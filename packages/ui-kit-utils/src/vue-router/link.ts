import type { RouteLocationRaw } from './types'

export interface VueRouterLinkProps {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  readonly to?: RouteLocationRaw
  /**
   * Calls `router.replace` instead of `router.push`.
   */
  readonly replace?: boolean
  /**
   * Whether RouterLink should not wrap its content in an `a` tag. Useful when
   * using `v-slot` to create a custom RouterLink
   */
  readonly custom?: boolean
  /**
   * Class to apply when the link is active
   */
  readonly activeClass?: string
  /**
   * Class to apply when the link is exact active
   */
  readonly exactActiveClass?: string
  /**
   * Value passed to the attribute `aria-current` when the link is exact active.
   *
   * @defaultValue `'page'`
   */
  readonly ariaCurrentValue?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'
}

export interface NuxtLinkProps {
  readonly to?: RouteLocationRaw
  readonly href?: RouteLocationRaw
  readonly external?: boolean
  readonly replace?: boolean
  readonly custom?: boolean
  readonly target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null
  readonly rel?: string
  readonly noRel?: boolean
  readonly prefetch?: boolean
  readonly noPrefetch?: boolean
  readonly activeClass?: string
  readonly exactActiveClass?: string
  readonly ariaCurrentValue?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'

  // NuxtLinkOptions
  readonly externalRelAttribute?: string | null
  readonly prefetchedClass?: string
  readonly trailingSlash?: 'append' | 'remove'
}
