import { Accessibility, FocusZoneMode } from '../../interfaces'

/**
 * @description
 * Adds role='menu'.
 * The 'menu' role is used to identify an element that creates a list of common actions or functions that a user can invoke.
 */

const gridBehavior: Accessibility = (props: any) => ({
  attributes: {},
  focusZone: {
    mode: FocusZoneMode.Wrap,
    props: {
      isCircularNavigation: true,
    },
  },
})

export default gridBehavior
