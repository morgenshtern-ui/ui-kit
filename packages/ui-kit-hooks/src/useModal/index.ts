import { EVENT_CODE } from '@teleskop-labs/ui-kit-constants'
import { isClient } from '@teleskop-labs/ui-kit-utils'
import { useEventListener } from '@vueuse/core'
import { type Ref, watch } from 'vue'

interface ModalInstance {
  onClose: () => void
}

const modalStack: ModalInstance[] = []

export function useModal(instance: ModalInstance, isVisible: Ref<boolean>) {
  watch(isVisible, (val) => {
    if (val) {
      modalStack.push(instance)
    } else {
      modalStack.splice(modalStack.indexOf(instance), 1)
    }
  })
}

function closeModal(e: KeyboardEvent) {
  if (modalStack.length === 0) {
    return
  }

  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation()
    const topModal = modalStack.at(-1)!

    topModal.onClose()
  }
}

if (isClient) {
  useEventListener(document, 'keydown', closeModal)
}
