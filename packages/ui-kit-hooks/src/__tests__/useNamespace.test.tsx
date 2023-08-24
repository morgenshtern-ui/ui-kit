import { mount, type VueWrapper } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'

import { useNamespace } from '../useNamespace'

const TestComp = defineComponent({
  setup() {
    const ns = useNamespace('table')
    const cssVar = ns.cssVar({
      'border-style': 'solid',
      'border-width': '',
    })
    const cssVarBlock = ns.cssVarBlock({
      'text-color': '#409eff',
      'active-color': '',
    })

    return () => (
      <div
        id="testId"
        class={[
          ns.b(), // return ns + block
          ns.b('body'),
          ns.e('content'),
          ns.m('active'),
          ns.se('content', 'active'),
          ns.em('content', 'active'),
          ns.sem('body', 'content', 'active'),
          ns.is('focus'),
          ns.is('hover', undefined), // return empty string
          ns.is('clicked', false), // return empty string
        ]}
        style={{ ...cssVar, ...cssVarBlock }}
      >
        text
      </div>
    )
  },
})

describe('use-locale', () => {
  const Comp = defineComponent({
    setup(_props, { slots }) {
      return () => slots['default']?.()
    },
  })
  let wrapper: VueWrapper<InstanceType<typeof Comp>>

  beforeEach(() => {
    wrapper = mount(Comp, {
      slots: { default: () => <TestComp /> },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should provide bem correctly', async () => {
    await nextTick()
    expect(wrapper.find('#testId').classes()).toEqual([
      't-table', // b()
      't-table-body', // b('body')
      't-table__content', // e('content')
      't-table--active', // m('active')
      't-table-content__active', // be('content', 'active')
      't-table__content--active', // em('content', 'active')
      't-table-body__content--active', // bem('body', 'content', 'active')
      't-table--is-focus', // is('focus')
      't-table--is-hover', // is('focus')
    ])

    const style = wrapper.find('#testId').attributes('style')

    expect(style).toMatch('--t-border-style: solid;')
    expect(style).not.toMatch('--t-border-width:')
    expect(style).toMatch('--t-comp-table-text-color: #409eff;')
    expect(style).not.toMatch('--t-comp-table-active-color:')
  })

  it('overrides namespace', () => {
    const { vm } = mount(
      defineComponent({
        setup(_, { expose }) {
          const { namespace } = useNamespace('ns')

          expose({
            namespace,
          })
        },
        template: '<div></div>',
      }),
      {
        global: {
          provide: {
            namespace: 'el',
          },
        },
      },
    ) as any

    expect(vm.namespace).toBe('t')
  })
})
