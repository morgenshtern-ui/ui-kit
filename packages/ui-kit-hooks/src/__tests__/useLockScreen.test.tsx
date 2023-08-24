import { hasClass } from '@teleskop-labs/ui-kit-utils'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, onMounted, ref } from 'vue'

import { useLockScreen } from '../useLockScreen'
import { useNamespace } from '../useNamespace'

const classes = 't-popup-parent--hidden'

const Comp = defineComponent({
  setup() {
    const flag = ref(false)

    useLockScreen(flag)
    onMounted(() => {
      flag.value = true
    })

    return () => <div></div>
  },
})

describe('useLockScreen', () => {
  it('should lock screen when trigger is true', async () => {
    const wrapper = mount(<Comp />)

    await nextTick()
    expect(hasClass(document.body, classes)).toBe(true)

    wrapper.unmount()

    await nextTick()

    setTimeout(() => {
      expect(hasClass(document.body, classes)).toBe(false)
    }, 250)
  })

  it('should cleanup when unmounted', async () => {
    const shouldRender = ref(true)

    mount(
      defineComponent({
        setup() {
          return () => (shouldRender.value ? <Comp /> : <div></div>)
        },
      }),
    )

    await nextTick()

    expect(hasClass(document.body, classes)).toBe(true)

    shouldRender.value = false
    await nextTick()

    setTimeout(() => {
      expect(hasClass(document.body, classes)).toBe(false)
    }, 250)
  })

  it('should render a different namespace than the given one', async () => {
    const namespace = 't'
    const wrapper = mount(
      defineComponent({
        setup() {
          const ns = useNamespace('lock')
          const trigger = ref(false)

          useLockScreen(trigger, { ns })
          onMounted(() => {
            trigger.value = true
          })
        },
        render: () => <div></div>,
      }),
    )

    await nextTick()
    expect(hasClass(document.body, `${namespace}-lock-parent--hidden`)).toBe(true)

    wrapper.unmount()
  })
})
