import { triggerEvent } from '../..'

describe('Aria Utils', () => {
  describe('Trigger Event', () => {
    it('Util trigger event to trigger event correctly', () => {
      const div = document.createElement('div')

      vi.spyOn(div, 'dispatchEvent')
      const eventName = 'click'

      triggerEvent(div, eventName)
      expect(div.dispatchEvent).toHaveBeenCalled()
    })
  })
})
