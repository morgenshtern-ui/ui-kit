/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelize } from '@vue/shared'
import type { VNode, VNodeArrayChildren, VNodeChild, VNodeNormalizedChildren } from 'vue'
import { Comment, createBlock, createCommentVNode, Fragment, isVNode, openBlock, Text } from 'vue'

import { debugWarn } from '../error'
import { hasOwn } from '../objects'
import { isArray } from '../shared'

const SCOPE = 'utils/vue/vnode'

/**
 * Патч-флаги - это подсказки оптимизации, создаваемые компилятором.
 * Когда во время различий встречается блок с динамическими детьми,
 * алгоритм переходит в "оптимизированный режим". В этом режиме
 * мы знаем, что vdom создается функцией рендеринга, сгенерированной
 * компилятором, поэтому алгоритму нужно обрабатывать только
 * явно помеченные этими флагами обновления.
 *
 * Флаги патчей могут быть объединены с помощью побитового оператора | и проверены с помощью оператора &, например:
 *
 * ```js
 * const flag = TEXT | CLASS
 * if (flag & TEXT) { ... }
 * ```
 *
 * Проверьте функцию patchElement в файле '../../runtime-core/src/renderer.ts',
 * чтобы увидеть, как флаги обрабатываются во время различий.
 *
 */
export const PatchFlags = {
  /**
   * Указывает на элемент с динамическим текстовым содержимым (быстрый путь для детей).
   */
  TEXT: 1,

  /**
   * Указывает на элемент с динамическим привязыванием класса.
   */
  CLASS: 1 << 1,

  /**
   * Указывает на элемент с динамическим стилем.
   * Компилятор предварительно компилирует статические строковые стили
   * в статические объекты и обнаруживает и поднимает встроенные статические объекты.
   * Например, style="color: red" и :style="{ color: 'red' }" оба поднимаются как:
   *
   * ```js
   * const style: { color: 'red' }
   * render() { return e('div', { style }) }
   * ```
   */
  STYLE: 1 << 2,

  /**
   * Указывает на элемент с динамическими свойствами, не относящимися к class/style.
   * Может также применяться к компоненту с любыми динамическими свойствами (включая class/style).
   * Когда этот флаг присутствует, у vnode также есть массив dynamicProps,
   * содержащий ключи свойств, которые могут изменяться,
   * чтобы время выполнения могло быстрее сравнивать их
   * (без необходимости беспокоиться о удаленных свойствах).
   */
  PROPS: 1 << 3,

  /**
   * Указывает на элемент с динамическими ключами свойств.
   * При изменении ключей всегда требуется полное сравнение для удаления старого ключа.
   * Этот флаг взаимоисключающий с CLASS, STYLE и PROPS.
   */
  FULL_PROPS: 1 << 4,

  /**
   * during hydration)
   * Указывает на элемент с прослушивателями событий
   * (которые должны быть присоединены во время гидратации).
   */
  HYDRATE_EVENTS: 1 << 5,

  /**
   * Указывает на фрагмент, порядок дочерних элементов которого не изменяется..
   */
  STABLE_FRAGMENT: 1 << 6,

  /**
   * Указывает на фрагмент с ключевыми или частично ключевыми дочерними элементами
   */
  KEYED_FRAGMENT: 1 << 7,

  /**
   * Указывает на фрагмент с неключевыми дочерними элементами..
   */
  UNKEYED_FRAGMENT: 1 << 8,

  /**
   * Указывает на элемент, который требует только непропсового патчинга, например, ref или
   * директивы (хуки onVnodeXXX).  Поскольку каждый патченый vnode проверяет наличие refs
   * и хуков onVnodeXXX, он просто помечает vnode, чтобы родительский блок
   * мог отслеживать его.
   */
  NEED_PATCH: 1 << 9,

  /**
   * Указывает на компонент с динамическими слотами (например, слот, который ссылается на значение, перебираемое в v-for,
   * или динамические имена слотов).
   * Компоненты с этим флагом всегда обновляются принудительно.
   */
  DYNAMIC_SLOTS: 1 << 10,

  /**
   * Указывает на фрагмент, который был создан только потому, что пользователь разместил
   * комментарии на корневом уровне шаблона. Этот флаг используется только в режиме разработки, так как
   * комментарии удаляются в производственной сборке.
   */
  DEV_ROOT_FRAGMENT: 1 << 11,

  /**
   * SPECIAL FLAGS -------------------------------------------------------------
   * Специальные флаги: отрицательные целые числа.
   * Они никогда не сравниваются с помощью побитовых операторов
   * (побитовое сравнение должно происходить только в ветвях, где patchFlag > 0)
   * и являются взаимоисключающими.
   * При проверке специального флага просто проверьте patchFlag: == FLAG.
   */

  /**
   * Указывает на поднятый статический vnode. Это подсказка для гидратации,
   * чтобы пропустить всё поддерево, так как статический контент никогда не требует обновления.
   */
  HOISTED: -1,
  /**
   * Особый флаг, указывающий, что алгоритм сравнения должен прекратить оптимизированный режим.
   * Например, для фрагментов блока, созданных с помощью renderSlot(), при обнаружении слотов,
   * не сгенерированных компилятором (т.е. вручную написанных функций рендеринга,
   * которые всегда должны полностью сравниваться)
   * ИЛИ вручную клонированных vnode.
   */
  BAIL: -2,
} as const

/**
 * dev only flag -> name mapping
 */
export const PatchFlagNames: Record<keyof typeof PatchFlags, string> = {
  TEXT: 'TEXT',
  CLASS: 'CLASS',
  STYLE: 'STYLE',
  PROPS: 'PROPS',
  FULL_PROPS: 'FULL_PROPS',
  HYDRATE_EVENTS: 'HYDRATE_EVENTS',
  STABLE_FRAGMENT: 'STABLE_FRAGMENT',
  KEYED_FRAGMENT: 'KEYED_FRAGMENT',
  UNKEYED_FRAGMENT: 'UNKEYED_FRAGMENT',
  NEED_PATCH: 'NEED_PATCH',
  DYNAMIC_SLOTS: 'DYNAMIC_SLOTS',
  DEV_ROOT_FRAGMENT: 'DEV_ROOT_FRAGMENT',
  HOISTED: 'HOISTED',
  BAIL: 'BAIL',
}

export type VNodeChildAtom = Exclude<VNodeChild, any[]> // VNode | string | number | boolean | null | undefined | void;
export type RawSlots = Exclude<VNodeNormalizedChildren, any[] | null | string> // { [name: string]: unknown;  $stable?: boolean; };

export function isFragment(node: unknown): node is VNode {
  return isVNode(node) && node.type === Fragment
}

export function isText(node: unknown): node is VNode {
  return isVNode(node) && node.type === Text
}

export function isComment(node: unknown): node is VNode {
  return isVNode(node) && node.type === Comment
}

const TEMPLATE = 'template'

export function isTemplate(node: unknown): node is VNode {
  return isVNode(node) && node.type === TEMPLATE
}

/**
 * determine if the element is a valid element type rather than fragments and comment e.g. <template> v-if
 * @param node {VNode} node to be tested
 */
export function isValidElementNode(node: unknown): node is VNode {
  return isVNode(node) && !isFragment(node) && !isComment(node)
}

/**
 * get a valid child node (not fragment not comment)
 * @param node {VNode} node to be searched
 * @param depth {number} depth to be searched
 */
function getChildren(node: VNodeNormalizedChildren | VNodeChild, depth: number): VNodeNormalizedChildren | VNodeChild {
  if (isComment(node)) {
    return
  }

  if (isFragment(node) || isTemplate(node)) {
    return depth > 0 ? getFirstValidNode(node.children, depth - 1) : undefined
  }

  return node
}

export function getFirstValidNode(nodes: VNodeNormalizedChildren, maxDepth = 3) {
  if (Array.isArray(nodes)) {
    return getChildren(nodes[0], maxDepth)
  }

  return getChildren(nodes, maxDepth)
}

export function renderIf(condition: boolean, ...args: Parameters<typeof createBlock>) {
  return condition ? renderBlock(...args) : createCommentVNode('v-if', true)
}

export function renderBlock(...args: Parameters<typeof createBlock>) {
  // eslint-disable-next-line no-sequences
  return openBlock(), createBlock(...args)
}

export function getNormalizedProps(node: VNode) {
  if (!isVNode(node)) {
    debugWarn(SCOPE, '[getNormalizedProps] must be a VNode')

    return {}
  }

  const raw = node.props || {}
  const type = (isVNode(node.type) ? node.type.props : undefined) || {}
  const props: Record<string, any> = {}

  Object.keys(type).forEach((key) => {
    if (hasOwn(type[key], 'default')) {
      props[key] = type[key].default
    }
  })

  Object.keys(raw).forEach((key) => {
    props[camelize(key)] = raw[key]
  })

  return props
}

export function ensureOnlyChild(children: VNodeArrayChildren | undefined) {
  if (!isArray(children) || children.length > 1) {
    throw new Error('expect to receive a single Vue element child')
  }

  return children[0]
}

export type FlattenVNodes = Array<VNodeChildAtom | RawSlots>

export function flattedChildren(children: FlattenVNodes | VNode | VNodeNormalizedChildren): FlattenVNodes {
  const vNodes = isArray(children) ? children : [children]
  const result: FlattenVNodes = []

  vNodes.forEach((child) => {
    if (isArray(child)) {
      result.push(...flattedChildren(child))
    } else if (isVNode(child) && isArray(child.children)) {
      result.push(...flattedChildren(child.children))
    } else {
      result.push(child)

      if (isVNode(child) && child.component?.subTree) {
        result.push(...flattedChildren(child.component.subTree))
      }
    }
  })

  return result
}
