import { mount } from '@vue/test-utils'

import { useTimeout } from '../useTimeout'

const _mount = (cb: () => void) =>
  mount({
    setup() {
      const { cancelTimeout, registerTimeout } = useTimeout()

      registerTimeout(cb, 0)

      return { cancelTimeout }
    },
    render: () => undefined,
  })

describe('use-timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    wrapper = _mount(cb)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  let wrapper: ReturnType<typeof _mount>
  const cb = vi.fn()

  it('should register timeout correctly', async () => {
    expect(cb).not.toHaveBeenCalled()
    vi.runOnlyPendingTimers()
    expect(cb).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should cancel the timeout correctly', async () => {
    ;(wrapper.vm as any).cancelTimeout()

    vi.runOnlyPendingTimers()

    expect(cb).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should cancel timeout before unmount', () => {
    expect(cb).not.toHaveBeenCalled()

    wrapper.unmount()
    vi.runOnlyPendingTimers()

    expect(cb).not.toHaveBeenCalled()
  })
})
