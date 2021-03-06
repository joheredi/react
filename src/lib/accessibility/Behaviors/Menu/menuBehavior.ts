import { Accessibility, FocusZoneMode } from '../../types'

/**
 * @description
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 *
 * @specification
 * Adds role='menu'.
 * Embeds FocusZone into component allowing circular arrow key navigation through the children of the component.
 */

const menuBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'menu',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      isCircularNavigation: true,
      preventDefaultWhenHandled: true,
      shouldFocusFirstElementWhenReceivedFocus: true,
    },
  },
})

export default menuBehavior
