import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { AutoControlledComponent, createHTMLInput, customPropTypes } from '../../lib'
import Icon from '../Icon'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import {
  Extendable,
  ItemShorthand,
  ReactChildren,
  ComponentEventHandler,
} from '../../../types/utils'

export interface IInputProps {
  as?: any
  children?: ReactChildren
  className?: string
  clearable?: boolean
  defaultValue?: React.ReactText
  fluid?: boolean
  icon?: ItemShorthand
  inline?: boolean
  input?: ItemShorthand
  onChange?: ComponentEventHandler<IInputProps>
  value?: React.ReactText
  type?: string
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

export interface IInputState {
  value?: React.ReactText
}

/**
 * An Input
 * @accessibility
 * For good screen reader experience set aria-label or aria-labelledby attribute for input.
 *
 *
 * Other considerations:
 *  - if input is search, then use "role='search'"
 *
 */
class Input extends AutoControlledComponent<Extendable<IInputProps>, IInputState> {
  private inputRef: HTMLInputElement

  static className = 'ui-input'

  static displayName = 'Input'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** A property that will change the icon on the input and clear the input on click on Cancel */
    clearable: PropTypes.bool,

    /** The default value of the input. */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /** Optional Icon to display inside the Input. */
    icon: customPropTypes.itemShorthand,

    /** An input can be used inline with text */
    inline: PropTypes.bool,

    /** Shorthand for input */
    input: customPropTypes.itemShorthand,

    /**
     * Called on change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

    /** The HTML input type. */
    type: PropTypes.string,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** The value of the input. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static defaultProps = {
    as: 'div',
    input: 'text',
  }

  static autoControlledProps = ['value']

  state = { value: this.props.value || this.props.defaultValue || '' }

  renderComponent({ ElementType, classes, styles, variables, rest }) {
    const { input, type } = this.props
    const { value = '' } = this.state
    const inputClasses = classes.input

    return (
      <ElementType className={classes.root}>
        {createHTMLInput(input, {
          defaultProps: {
            type,
            value,
            onChange: this.handleChange,
            ...rest,
          },
          overrideProps: {
            className: inputClasses,
            ref: this.handleInputRef,
          },
        })}
        {Icon.create(this.computeIcon(), {
          defaultProps: {
            styles: styles.icon,
            variables: variables.icon,
          },
          overrideProps: this.handleIconOverrides,
        })}
      </ElementType>
    )
  }

  private handleChange = (e: React.SyntheticEvent) => {
    const value = _.get(e, 'target.value')

    _.invoke(this.props, 'onChange', e, { ...this.props, value })

    this.trySetState({ value })
  }

  private handleInputRef = (c: HTMLInputElement) => (this.inputRef = c)

  private handleOnClear = () => {
    const { clearable } = this.props

    if (clearable) {
      this.trySetState({ value: '' })
    }
  }

  private computeIcon = () => {
    const { clearable, icon } = this.props
    const { value } = this.state

    if (clearable && (value as string).length !== 0) {
      return 'close'
    }

    if (!_.isNil(icon)) {
      return icon
    }

    return null
  }

  private handleIconOverrides = predefinedProps => ({
    onClick: (e: React.SyntheticEvent) => {
      this.handleOnClear()
      this.inputRef.focus()
      _.invoke(predefinedProps, 'onClick', e, this.props)
    },
    ...(predefinedProps.onClick && { tabIndex: '0' }),
  })
}

export default Input
