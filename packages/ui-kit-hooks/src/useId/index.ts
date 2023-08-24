import { debugWarn, isClient } from '@teleskop-labs/ui-kit-utils'
import { getCurrentInstance } from 'vue'

import { namespace } from '../useNamespace'
import type { TIdInjectionContext } from './context'
import { defaultIdContext, useIdContext } from './context'

export { ID_INJECTION_KEY, provideIdContext, useIdContext } from './context'

export function useIdInjection(): TIdInjectionContext {
  return getCurrentInstance() ? useIdContext() : defaultIdContext
}

export function useId(deterministicId?: string): string {
  const idInjection = useIdInjection()

  if (!isClient && idInjection === defaultIdContext) {
    debugWarn(
      'IdInjection',
      `Похоже, вы используете серверный рендеринг, вы должны указать поставщика идентификаторов, чтобы обеспечить успех процесса гидратации.
Применение: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`,
    )
  }

  const id = deterministicId || `${namespace}-id-${idInjection.prefix}-${idInjection.current}`

  idInjection.current += 1

  return id
}
