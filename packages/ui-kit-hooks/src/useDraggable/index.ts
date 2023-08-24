import { addUnit, type Nillable } from '@teleskop-labs/ui-kit-utils'
import { type MaybeRefOrGetter, toValue } from '@vueuse/core'
import { onBeforeUnmount, onMounted, type ShallowRef, watchEffect, type WatchStopHandle } from 'vue'

export function useDraggable(
  targetRef: ShallowRef<Nillable<HTMLElement>>,
  dragRef: ShallowRef<Nillable<HTMLElement>>,
  draggable: MaybeRefOrGetter<boolean>,
) {
  let transform = {
    offsetX: 0,
    offsetY: 0,
  }

  function onMousedown(e: MouseEvent) {
    const downX = e.clientX
    const downY = e.clientY
    const { offsetX, offsetY } = transform

    const targetRect = targetRef.value!.getBoundingClientRect()
    const targetLeft = targetRect.left
    const targetTop = targetRect.top
    const targetWidth = targetRect.width
    const targetHeight = targetRect.height

    const { clientWidth } = document.documentElement
    const { clientHeight } = document.documentElement

    const minLeft = -targetLeft + offsetX
    const minTop = -targetTop + offsetY
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
    const maxTop = clientHeight - targetTop - targetHeight + offsetY

    function onMousemove(evt: MouseEvent) {
      const moveX = Math.min(Math.max(offsetX + evt.clientX - downX, minLeft), maxLeft)
      const moveY = Math.min(Math.max(offsetY + evt.clientY - downY, minTop), maxTop)

      transform = {
        offsetX: moveX,
        offsetY: moveY,
      }
      targetRef.value!.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`
    }

    function onMouseup() {
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  function onDraggable() {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener('mousedown', onMousedown)
    }
  }

  function offDraggable() {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener('mousedown', onMousedown)
    }
  }

  let watchStopHandle: WatchStopHandle | undefined = undefined

  // TODO: clear
  onMounted(() => {
    watchStopHandle = watchEffect(() => {
      if (toValue(draggable)) {
        onDraggable()
      } else {
        offDraggable()
      }
    })
  })

  onBeforeUnmount(() => {
    watchStopHandle?.()
    offDraggable()
  })
}
