// import { provideGlobalConfig } from '@element-plus/components/config-provider'
// import type { Language } from '@element-plus/locale'
// import English from '@element-plus/locale/lang/en'
// import Chinese from '@element-plus/locale/lang/zh-cn'
// import { mount, type VueWrapper } from '@vue/test-utils'
// import type { ComponentPublicInstance, PropType } from 'vue'
// import { computed, defineComponent, nextTick } from 'vue'

// import { buildTranslator, useLocale } from '../use-locale'

// const TestComp = defineComponent({
//   setup() {
//     const { t } = useLocale()

//     return () => <div class="locale-manifest">{t('teleskop-labs.popconfirm.confirmButtonText')}</div>
//   },
// })

// TODO: fix this test
describe('use-locale', () => {
  // let wrapper: VueWrapper<ComponentPublicInstance>
  // beforeEach(() => {
  //   wrapper = mount(
  //     defineComponent({
  //       props: {
  //         locale: {
  //           type: Object as PropType<Language>,
  //           default: Chinese,
  //         },
  //       },
  //       setup(props) {
  //         provideGlobalConfig(computed(() => ({ locale: props.locale })))
  //         return () => <TestComp />
  //       },
  //     }),
  //   )
  // })
  // afterEach(() => {
  //   wrapper.unmount()
  // })
  it('should provide locale correctly', async () => {
    //   await nextTick()
    //   expect(wrapper.find('.locale-manifest').text()).toBe(Chinese.el.popconfirm.confirmButtonText)
  })
  // it('should update the text reactively', async () => {
  //   await nextTick()
  //   expect(wrapper.find('.locale-manifest').text()).toBe(Chinese.el.popconfirm.confirmButtonText)
  //   await wrapper.setProps({
  //     locale: English,
  //   })
  //   expect(wrapper.find('.locale-manifest').text()).toBe(English.el.popconfirm.confirmButtonText)
  // })
  // it('return key name if not defined', () => {
  //   const t = buildTranslator(English)
  //   expect(t('teleskop-labs.popconfirm.someThing')).toBe('teleskop-labs.popconfirm.someThing')
  // })
  // describe('overrides', () => {
  //   it('should be override correctly', () => {
  //     const override = computed(() => English)
  //     const wrapper = mount(
  //       defineComponent({
  //         setup(_, { expose }) {
  //           const { locale } = useLocale(override)
  //           expose({
  //             locale,
  //           })
  //         },
  //         template: '<div></div>',
  //       }),
  //       {
  //         global: {
  //           provide: {
  //             locale: Chinese,
  //           },
  //         },
  //       },
  //     )
  //     expect(wrapper.vm.locale).toBe(override.value)
  //   })
  // })
})
