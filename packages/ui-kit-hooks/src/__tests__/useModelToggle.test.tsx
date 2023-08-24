/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/prop-name-casing */
import { mount, type VueWrapper } from '@vue/test-utils'
import { defineComponent, nextTick, reactive, ref } from 'vue'

import { useModelToggle } from '../useModelToggle'

const AXIOM = 'Rem is the best girl'

const onShow = vi.fn()
const onHide = vi.fn()
const flag = {
  value: true,
}
const shouldProceed = () => flag.value

const Comp = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
    },
    'onUpdate:modelValue': {
      type: Function,
    },
    isDisabled: Boolean,
  },

  setup(props) {
    const indicator = ref(false)
    const { show, hide, toggle } = useModelToggle({
      indicator,
      onShow,
      onHide,
      shouldProceed,
      shouldHideWhenRouteChanges: ref(true),
    })

    return () => (
      <>
        <button class="show" onClick={show}>
          show
        </button>
        <button class="hide" onClick={hide}>
          hide
        </button>
        <button class="toggle" onClick={toggle}>
          toggle
        </button>
        {indicator.value || props['modelValue'] ? <div>{AXIOM}</div> : undefined}
      </>
    )
  },
})

describe('use-model-toggle', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    flag.value = true
    wrapper = mount(Comp)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render correctly', async () => {
    expect(wrapper.text()).not.toContain(AXIOM)
  })

  it('should show and hide via API calls', async () => {
    expect(wrapper.text()).not.toContain(AXIOM)

    await wrapper.find('.show').trigger('click')
    expect(wrapper.text()).toContain(AXIOM)
    expect(onShow).toHaveBeenCalledTimes(1)

    await wrapper.find('.hide').trigger('click')
    expect(wrapper.text()).not.toContain(AXIOM)
    expect(onHide).toHaveBeenCalledTimes(1)
  })

  it('should call callbacks correctly', async () => {
    expect(wrapper.text()).not.toContain(AXIOM)

    await wrapper.find('.show').trigger('click')
    expect(wrapper.text()).toContain(AXIOM)
    expect(onShow).toHaveBeenCalledTimes(1)

    await wrapper.find('.show').trigger('click')
    expect(onShow).toHaveBeenCalledTimes(1)

    await wrapper.find('.hide').trigger('click')
    expect(wrapper.text()).not.toContain(AXIOM)
    expect(onHide).toHaveBeenCalledTimes(1)

    await wrapper.find('.hide').trigger('click')
    expect(onHide).toHaveBeenCalledTimes(1)
  })

  it('should toggle show and hide via API calls', async () => {
    expect(wrapper.text()).not.toContain(AXIOM)

    await wrapper.find('.toggle').trigger('click')
    expect(wrapper.text()).toContain(AXIOM)
    expect(onShow).toHaveBeenCalledTimes(1)

    await wrapper.find('.toggle').trigger('click')
    expect(wrapper.text()).not.toContain(AXIOM)
    expect(onHide).toHaveBeenCalledTimes(1)
  })

  it('should not proceed when the should proceed returns false', async () => {
    flag.value = false
    expect(wrapper.text()).not.toContain(AXIOM)

    await wrapper.find('.show').trigger('click')

    expect(wrapper.text()).not.toContain(AXIOM)
    expect(onShow).not.toHaveBeenCalled()

    await wrapper.find('.toggle').trigger('click')
    expect(wrapper.text()).not.toContain(AXIOM)
    expect(onShow).not.toHaveBeenCalled()
  })

  it('should bind with modelValue', async () => {
    wrapper.unmount()

    const model = ref(false)
    const isDisabled = ref(false)

    wrapper = mount({
      setup: () => () => <Comp v-model={model.value} isDisabled={isDisabled.value} />,
    })

    expect(wrapper.findComponent(Comp).text()).not.toContain(AXIOM)

    await wrapper.find('.show').trigger('click')

    expect(model.value).toBe(true)
    expect(wrapper.findComponent(Comp).text()).toContain(AXIOM)

    await wrapper.find('.hide').trigger('click')

    expect(onHide).toHaveBeenCalledTimes(1)
    expect(model.value).toBe(false)
    expect(wrapper.findComponent(Comp).text()).not.toContain(AXIOM)

    model.value = true
    isDisabled.value = true
    await nextTick()
    // when isDisabled emits false that modifies the model
    expect(model.value).toBe(false)

    // should not hide when isDisabled
    await wrapper.find('.hide').trigger('click')
    expect(onHide).toHaveBeenCalledTimes(1)
  })

  it('should hide when route changes', async () => {
    wrapper.unmount()

    const router = reactive({
      test: '/',
    })

    const globalProps = {
      $route: router as any,
    } as any

    wrapper = mount(Comp, {
      global: {
        config: {
          globalProperties: globalProps,
        },
      },
    })

    expect(wrapper.text()).not.toContain(AXIOM)

    await wrapper.find('.show').trigger('click')

    expect(wrapper.text()).toContain(AXIOM)
    expect(onHide).toHaveBeenCalledTimes(0)
    router.test = '/test/changed'
    await nextTick()
    expect(onHide).toHaveBeenCalledTimes(1)
  })
})
