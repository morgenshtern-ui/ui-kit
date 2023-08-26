import type { ComponentPublicInstance } from 'vue'

import type { RouteLocationNormalized, RouteLocationRaw } from './RouteLocation'

/**
 * Navigation guard. See [Navigation
 * Guards](/guide/advanced/navigation-guards.md).
 */
export type NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => NavigationGuardReturn | Promise<NavigationGuardReturn>

export interface NavigationGuardNext {
  (): void
  (error: Error): void
  (location: RouteLocationRaw): void
  (valid: boolean | undefined): void
  (cb: NavigationGuardNextCallback): void
}

export type NavigationGuardNextCallback = (vm: ComponentPublicInstance) => any

type NavigationGuardReturn = void | Error | RouteLocationRaw | boolean | NavigationGuardNextCallback

/**
 * {@inheritDoc NavigationGuard}
 */
export type NavigationGuardWithThis<T> = (
  this: T,
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => NavigationGuardReturn | Promise<NavigationGuardReturn>
