import type { TRouterLinkProps } from '@teleskop-labs/ui-kit-hooks'
import { defintDefaultProps, type ShortEmits, type TPropsWithDefaults } from '@teleskop-labs/ui-kit-utils'
import type { VNode } from 'vue'

import type { AppearanceType, Presence, SizeType, Status } from './types'

// Props

// interface NuxtLinkOptions {
//   readonly externalRelAttribute?: string | null
//   readonly activeClass?: string
//   readonly exactActiveClass?: string
//   readonly prefetchedClass?: string
//   readonly trailingSlash?: 'append' | 'remove'
// }

// export interface NuxtLinkProps extends NuxtLinkOptions {
//   readonly to?: RouteLocationRaw
//   readonly href?: RouteLocationRaw
//   readonly external?: boolean
//   readonly replace?: boolean
//   readonly custom?: boolean
//   readonly target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null
//   readonly rel?: string
//   readonly noRel?: boolean
//   readonly prefetch?: boolean
//   readonly noPrefetch?: boolean
//   readonly activeClass?: string
//   readonly exactActiveClass?: string
//   readonly ariaCurrentValue?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'
// }

// interface TRouterLinkProps extends NuxtLinkProps {}

export interface TAvatarProps extends TRouterLinkProps {
  readonly tag?: string
  readonly linkFallbackTag?: string
  /**
   * Указывает форму аватара. Большинство аватаров круглые, но квадратные аватары
   * могут быть использованы для 'контейнерных' объектов.
   */
  readonly appearance?: AppearanceType
  /**
   * Используется для предоставления лучшего контента для скринридеров при использовании присутствия/статуса. Вместо
   * того чтобы скринридер произносил "онлайн, одобрено, Джон Смит", передача метки
   * позволяет настроить сообщение, например, "Джон Смит (одобрено и онлайн)".
   */
  readonly label?: string
  /**
   * Используется для переопределения цвета рамки вокруг тела аватара.
   * Принимает любой аргумент цвета, который принимает CSS-свойство border-color.
   */
  readonly borderColor?: string
  /**
   * Изменяет стиль, указывая, что аватар отключен.
   */
  readonly isDisabled?: boolean
  /**
   * Предоставляет альтернативный текст для изображения аватара.
   */
  readonly name?: string
  /**
   * Указывает онлайн-статус пользователя, показывая маленькую иконку на аватаре.
   * Ссылка на значения присутствия в компоненте Presence.
   * В качестве альтернативы принимает любой элемент React. Для лучших результатов рекомендуется
   * использовать квадратное содержимое с высотой и шириной 100%.
   */
  readonly presence?: Presence
  /**
   * Определяет размер аватара
   */
  readonly size?: SizeType
  /**
   * URL для загрузки изображения (это также может быть изображение, закодированное в base64).
   */
  readonly src?: string
  /**
   * Указывает контекстную информацию, показывая маленькую иконку на аватаре.
   * Ссылка на значения статуса в компоненте Status.
   */
  readonly status?: Status
  /**
   * Индекс, показывающий, где этот аватар находится в группе `stack`.
   */
  readonly stackIndex?: number
  /**
   * Назначает конкретный порядок tabIndex базовому узлу.
   */
  readonly tabIndex?: number
  /**
   * Обработчик, который будет вызван при клике.
   */
  readonly onClick?: (event: MouseEvent) => void
}

export const TAvatarDefaultProps = defintDefaultProps<TAvatarProps>()({
  appearance: 'circle',
  size: 'medium',
  isDisabled: false,
  tag: 'div',
  linkFallbackTag: 'span',
  borderColor: 'var(--t-sys-elevation-surface-overlay)',
})

export type TAvatarPropsWithDefaults = TPropsWithDefaults<TAvatarProps, typeof TAvatarDefaultProps>

// Emits

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TAvatarEmits = {
  click: [event: MouseEvent]
}

export type TAvatarEmitsInner = ShortEmits<TAvatarEmits>

// Slots

export interface TAvatarSlots {
  readonly statusIcon?: () => VNode[]
  readonly presenceIcon?: () => VNode[]
}
