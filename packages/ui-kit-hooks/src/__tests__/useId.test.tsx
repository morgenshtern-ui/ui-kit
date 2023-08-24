import { config, mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

import { ID_INJECTION_KEY, useId, useIdInjection } from '../useId'

describe('no injection value', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('useIdInjection', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const idInjection = useIdInjection()

          return idInjection
        },
        render: () => <div></div>,
      }),
    )

    expect(wrapper.vm.prefix).toMatch(/^\d{0,4}$/)
    expect(wrapper.vm.current).toBe(0)
  })

  it('useId', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const id = useId()

          return { id }
        },
        render: () => <div></div>,
      }),
    )

    expect(wrapper.vm.id).toMatch(/^t-id-\d{0,4}-\d+$/)
  })
})

describe('with injection value', () => {
  beforeEach(() => {
    config.global.provide = {
      [ID_INJECTION_KEY as symbol]: {
        prefix: 1024,
        current: 0,
      },
    }
  })

  afterEach(() => {
    document.body.innerHTML = ''
    config.global.provide = {}
  })

  it('useIdInjection', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const idInjection = useIdInjection()

          return idInjection
        },
        render: () => <div></div>,
      }),
    )

    expect(wrapper.vm.prefix).toBe(1024)
    expect(wrapper.vm.current).toBe(0)
  })

  it('useId', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const id = useId()

          return { id }
        },
        render: () => <div></div>,
      }),
    )

    expect(wrapper.vm.id).toBe('t-id-1024-0')
  })
})
