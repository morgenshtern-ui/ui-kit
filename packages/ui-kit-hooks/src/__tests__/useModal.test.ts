import { EVENT_CODE } from '@teleskop-labs/ui-kit-constants'
import { nextTick, ref } from 'vue'

import { useModal } from '../useModal'

describe('useModal', () => {
  it('should work when ref value changed', async () => {
    const visible = ref(false)
    const onClose = vi.fn()

    useModal(
      {
        onClose,
      },
      visible,
    )

    expect(onClose).not.toHaveBeenCalled()

    visible.value = true
    await nextTick()
    const event = new KeyboardEvent('keydown', {
      code: EVENT_CODE.esc,
    })

    document.dispatchEvent(event)
    expect(onClose).toHaveBeenCalledTimes(1)

    visible.value = false
    await nextTick()
    document.dispatchEvent(event)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
