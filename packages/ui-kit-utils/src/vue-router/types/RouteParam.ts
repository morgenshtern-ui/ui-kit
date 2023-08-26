export type RouteParams = Record<string, RouteParamValue | RouteParamValue[]>

export type RouteParamsRaw = Record<
  string,
  RouteParamValueRaw | Array<Exclude<RouteParamValueRaw, null | undefined>>
>

/**
 * @internal
 */
export type RouteParamValue = string

/**
 * @internal
 */
export type RouteParamValueRaw = RouteParamValue | number | null | undefined
