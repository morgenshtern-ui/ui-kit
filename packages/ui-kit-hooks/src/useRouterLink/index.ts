import { computedEager, type MaybeRefOrGetter } from '@vueuse/core'
import { computed, getCurrentInstance, toValue } from 'vue'
import type { RouteLocationRaw, RouterLinkProps } from 'vue-router'

import { useGlobalConfig } from '../useGlobalConfig'

export type { RouteLocationRaw } from 'vue-router'

export type VueRouterLinkProps = Readonly<Partial<RouterLinkProps>>

interface NuxtLinkOptions {
  readonly externalRelAttribute?: string | null
  readonly activeClass?: string
  readonly exactActiveClass?: string
  readonly prefetchedClass?: string
  readonly trailingSlash?: 'append' | 'remove'
}

export interface NuxtLinkProps extends NuxtLinkOptions {
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
}

export interface TRouterLinkProps extends NuxtLinkProps, VueRouterLinkProps {}

interface Options {
  readonly isDisabled?: MaybeRefOrGetter<boolean>
  readonly linkFallbackTag?: MaybeRefOrGetter<string>
}

const linkTags = new Set(['a', 'router-link'])

export function useRouterLink(props: TRouterLinkProps, { isDisabled, linkFallbackTag }: Options) {
  const globalProperties = computedEager(() => getCurrentInstance()?.appContext.config.globalProperties)
  const vueRouter = computedEager(() => globalProperties.value?.$router)
  const vueRoute = computedEager(() => globalProperties.value?.$route)

  const routerComponent = useGlobalConfig('routerComponent')

  const isNuxt = computedEager(() => !!globalProperties.value?.['$nuxt'])
  const isNuxtLink = computedEager(() => !!(!toValue(isDisabled) && props.to && isNuxt.value && routerComponent))

  const tagComputed = computedEager(() => {
    const fallback = toValue(linkFallbackTag) || 'span'

    if (toValue(isDisabled)) {
      return fallback
    }

    if (props.href && !props.to) {
      return 'a'
    }

    if (isNuxtLink.value) {
      return routerComponent.value
    }

    if (props.to) {
      return 'router-link'
    }

    return fallback
  })

  const isLinkTag = computedEager(() => isNuxtLink.value || linkTags.has(tagComputed.value as string))

  const hrefComputed = computed(
    () =>
      // to resolve href on server for SEO optimization
      // https://github.com/nuxt/nuxt.js/issues/8204
      props.href || (props.to ? vueRouter.value?.resolve(props.to, vueRoute.value).href : ''),
  )

  const linkAttributesComputed = computed(() => {
    if (!isLinkTag.value) {
      return {}
    }

    const rel = props.target === '_blank' ? 'noopener noreferrer' : undefined

    if (tagComputed.value === 'a') {
      return {
        target: props.target,
        href: hrefComputed.value,
        rel: props.rel || rel,
      }
    }

    const vueRouterAttrs = {
      to: props.to,
      replace: props.replace,
      custom: props.custom,
      activeClass: props.activeClass,
      exactActiveClass: props.exactActiveClass,
      ariaCurrentValue: props.ariaCurrentValue,
    }

    if (tagComputed.value === 'router-link') {
      return vueRouterAttrs
    }

    if (isNuxtLink.value) {
      return {
        ...vueRouterAttrs,
        externalRelAttribute: props.externalRelAttribute,
        prefetchedClass: props.prefetchedClass,
        trailingSlash: props.trailingSlash,

        // TODO: Точно так можно?
        href: props.href,
        external: props.external,
        target: props.target,
        rel: props.rel || rel,
        noRel: props.noRel,
        prefetch: props.prefetch,
        noPrefetch: props.noPrefetch,
      }
    }

    return {}
  })

  const isActiveRouterLink = computedEager(() => {
    if (!vueRouter.value || !props.to) {
      return false
    }

    const to = vueRouter.value.resolve(props.to).href
    const currentHref = vueRouter.value.currentRoute.value.path

    return to.replace('#', '') === currentHref.replace('#', '')
  })

  return {
    isLinkTag,
    tagComputed,
    hrefComputed,
    isActiveRouterLink,
    linkAttributesComputed,
  }
}
