import { EVENT_CODE } from '@teleskop-labs/ui-kit-constants'
import { isClient } from '@teleskop-labs/ui-kit-utils'
import { onBeforeUnmount, onMounted } from 'vue'

let registeredEscapeHandlers: Array<(evt: KeyboardEvent) => void> = []

function cachedHandler(evt: Event) {
  const event = evt as KeyboardEvent

  if (event.key === EVENT_CODE.esc) {
    registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event))
  }
}

export function useEscapeKeydown(handler: (evt: KeyboardEvent) => void) {
  onMounted(() => {
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener('keydown', cachedHandler)
    }

    if (isClient) {
      registeredEscapeHandlers.push(handler)
    }
  })

  onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler)

    if (registeredEscapeHandlers.length === 0 && isClient) {
      document.removeEventListener('keydown', cachedHandler)
    }
  })
}
