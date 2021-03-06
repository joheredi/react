import { ContainerFocusHandler } from 'src/lib/accessibility/FocusHandling/FocusContainer'

const createFocusContainer = (
  { itemsCount, setFocusAtFn }: { itemsCount: number; setFocusAtFn?: () => void } = {
    itemsCount: 0,
  },
) => new ContainerFocusHandler(() => itemsCount, setFocusAtFn || (() => {}))

describe('Focus Container', () => {
  test('inits with focused item index 0', () => {
    const focusContainer = createFocusContainer()

    expect(focusContainer).toBeDefined()
    expect(focusContainer.getFocusedItemIndex()).toBe(0)
  })

  describe('sync item index', () => {
    test('should set focus item index', () => {
      const focusContainer = createFocusContainer({ itemsCount: 5 })
      focusContainer.syncFocusedItemIndex(4)

      expect(focusContainer.getFocusedItemIndex()).toBe(4)
    })

    test('should not set focus index function', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 5, setFocusAtFn: setFocusAt })

      focusContainer.syncFocusedItemIndex(4)
      expect(setFocusAt).not.toBeCalled()
    })
  })

  describe('move previous', () => {
    test('should decrement index of focused item', () => {
      const focusContainer = createFocusContainer({ itemsCount: 5 })
      focusContainer.syncFocusedItemIndex(4)

      focusContainer.movePrevious()
      expect(focusContainer.getFocusedItemIndex()).toBe(3)
    })

    test('should call set focus index function if there are any items', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 5, setFocusAtFn: setFocusAt })

      focusContainer.movePrevious()
      expect(setFocusAt).toBeCalled()
    })

    test('should skip call to set focus index function if there are no items', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 0, setFocusAtFn: setFocusAt })

      focusContainer.movePrevious()
      expect(setFocusAt).not.toBeCalled()
    })

    test('focused item index should not ever become less than 0', () => {
      const focusContainer = createFocusContainer({ itemsCount: 5 })
      focusContainer.syncFocusedItemIndex(0)

      focusContainer.movePrevious()

      expect(focusContainer.getFocusedItemIndex()).toBe(0)
    })
  })

  describe('move next', () => {
    test('should increment index of focused item', () => {
      const focusContainer = createFocusContainer({ itemsCount: 5 })
      focusContainer.syncFocusedItemIndex(3)

      focusContainer.moveNext()
      expect(focusContainer.getFocusedItemIndex()).toBe(4)
    })

    test('should call set focus index function if there are any items', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 5, setFocusAtFn: setFocusAt })

      focusContainer.moveNext()
      expect(setFocusAt).toBeCalled()
    })

    test('should skip call to set focus index function if there are no items', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 0, setFocusAtFn: setFocusAt })

      focusContainer.moveNext()
      expect(setFocusAt).not.toBeCalled()
    })

    test('focused item index should not exceed range of valid indexes', () => {
      const focusContainer = createFocusContainer({ itemsCount: 5 })
      focusContainer.syncFocusedItemIndex(4)

      focusContainer.moveNext()

      expect(focusContainer.getFocusedItemIndex()).toBe(4)
    })
  })

  describe('move first', () => {
    test('should set focused item index to 0', () => {
      const focusContainer = createFocusContainer({ itemsCount: 5 })
      focusContainer.syncFocusedItemIndex(3)

      focusContainer.moveFirst()
      expect(focusContainer.getFocusedItemIndex()).toBe(0)
    })

    test('should call set focus index function if there are any items', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 5, setFocusAtFn: setFocusAt })

      focusContainer.moveFirst()
      expect(setFocusAt).toBeCalled()
    })

    test('should skip call to set focus index function if there are no items', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 0, setFocusAtFn: setFocusAt })

      focusContainer.moveFirst()
      expect(setFocusAt).not.toBeCalled()
    })
  })

  describe('move last', () => {
    test('should set focused item index to last index of valid range', () => {
      const focusContainer = createFocusContainer({ itemsCount: 5 })
      focusContainer.syncFocusedItemIndex(2)

      focusContainer.moveLast()
      expect(focusContainer.getFocusedItemIndex()).toBe(4)
    })

    test('should call set focus index function if there are any items', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 5, setFocusAtFn: setFocusAt })

      focusContainer.moveLast()
      expect(setFocusAt).toBeCalled()
    })

    test('should skip call to set focus index function if there are no items', () => {
      const setFocusAt = jest.fn()
      const focusContainer = createFocusContainer({ itemsCount: 0, setFocusAtFn: setFocusAt })

      focusContainer.moveLast()
      expect(setFocusAt).not.toBeCalled()
    })
  })
})
