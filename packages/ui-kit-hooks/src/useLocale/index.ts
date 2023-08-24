import { type Language, ru } from '@teleskop-labs/ui-kit-locale'
import { get, type Optional } from '@teleskop-labs/ui-kit-utils'
import { computedEager } from '@vueuse/core'
import type { MaybeRef, Ref } from 'vue'
import { isRef, ref, unref } from 'vue'

import { useLocationContext } from './context'

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export interface LocaleContext {
  locale: Ref<Language>
  lang: Ref<string>
  t: Translator
}

export function useLocale(localeOverrides?: Ref<Optional<Language>>) {
  const locale = localeOverrides || useLocationContext()

  return buildLocaleContext(computedEager(() => locale.value || ru))
}

export function buildLocaleContext(locale: MaybeRef<Language>): LocaleContext {
  const lang = computedEager(() => unref(locale).name)
  const localeRef = isRef(locale) ? locale : ref(locale)

  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale),
  }
}

export function buildTranslator(locale: MaybeRef<Language>): Translator {
  // TODO: check reactive
  const localeUnref = unref(locale)

  return (path, option) => translate(path, option, localeUnref)
}

export function translate(path: string, option: undefined | TranslatorOption, locale: Language): string {
  return get(locale, path, path).replaceAll(/{(?<temp1>\w+)}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`)
}
