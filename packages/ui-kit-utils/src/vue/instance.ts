import { getCurrentInstance as _getCurrentInstance } from 'vue'

import { throwError } from '../error'
import { toKebabCase } from '../strings'

export function getCurrentInstance(name: string, message?: string) {
  const vm = _getCurrentInstance()

  if (!vm) {
    throwError('getCurrentInstance', `${name} ${message || 'must be called from inside a setup function'}`)
  }

  return vm
}

export function getCurrentInstanceName(name = 'composables') {
  const vm = getCurrentInstance(name).type

  return toKebabCase(vm?.name)
}
