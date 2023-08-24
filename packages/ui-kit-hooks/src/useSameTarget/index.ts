import { NOOP } from '@vue/shared'

export const useSameTarget = (handleClick: ((e: MouseEvent) => void) | undefined = undefined) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP }
  }

  let mousedownTarget = false
  let mouseupTarget = false

  // refer to this https://javascript.info/mouse-events-basics
  // events fired in the order: mousedown -> mouseup -> click
  // we need to set the mousedown handle to false after click fired.
  function onMousedown(e: MouseEvent) {
    // marking current mousedown target.
    mousedownTarget = e.target === e.currentTarget
  }

  function onMouseup(e: MouseEvent) {
    // marking current mouseup target.
    mouseupTarget = e.target === e.currentTarget
  }

  const onClick = (e: MouseEvent) => {
    // if and only if
    if (mousedownTarget && mouseupTarget) {
      handleClick(e)
    }

    mouseupTarget = false
    mousedownTarget = false
  }

  return {
    onMousedown,
    onMouseup,
    onClick,
  }
}
