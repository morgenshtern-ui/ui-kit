import type { Component, DefineComponent } from 'vue'

type Lazy<T> = () => Promise<T>

/**
 * Allowed Component definitions in route records provided by the user
 */
export type RawRouteComponent = RouteComponent | Lazy<RouteComponent>

/**
 * Allowed Component in {@link RouteLocationMatched}
 */
export type RouteComponent = Component | DefineComponent
