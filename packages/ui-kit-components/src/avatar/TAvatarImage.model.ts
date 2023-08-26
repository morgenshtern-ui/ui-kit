import { defintDefaultProps, type TPropsWithDefaults } from '@teleskop-labs/ui-kit-utils'

import type { TAvatarPropsWithDefaults } from './TAvatar.model'

export interface TAvatarImageProps {
  readonly alt?: string
  readonly src?: TAvatarPropsWithDefaults['src']
  readonly appearance: TAvatarPropsWithDefaults['appearance']
  readonly size: TAvatarPropsWithDefaults['size']
}

export const TAvatarImageDefaultProps = defintDefaultProps<TAvatarImageProps>()({
  alt: '',
})

export type TAvatarImagePropsWithDefaults = TPropsWithDefaults<TAvatarImageProps, typeof TAvatarImageDefaultProps>
