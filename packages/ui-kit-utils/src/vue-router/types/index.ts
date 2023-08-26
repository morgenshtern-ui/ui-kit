import type { RouteLocationNormalizedLoaded } from './RouteLocation'
import type { Router } from './Router'
import type { TypesConfig } from './TypesConfig'

export type { RouteLocationNormalizedLoaded } from './RouteLocation'
export type { RouteLocationRaw } from './RouteLocation'
export type { Router } from './Router'
export type { RouterLinkProps } from './RouterLink'

// TODO: figure out why it cannot be 'vue' like said in docs
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Normalized current location. See {@link RouteLocationNormalizedLoaded}.
     */
    $route: TypesConfig extends Record<'$route', infer T> ? T : RouteLocationNormalizedLoaded
    /**
     * {@link Router} instance used by the application.
     */
    $router: TypesConfig extends Record<'$router', infer T> ? T : Router
  }
}
