import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes, NotStrictProps } from '../../lib'
import Icon from '../Icon'
import { ButtonBehavior } from '../../lib/accessibility'
import { Accessibility } from '../../lib/accessibility/interfaces'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'

export interface IButtonPropsStrict {
  /** An element type to render as (string or function). */
  as?: any

  /** A button can appear circular. */
  circular?: boolean

  /** Additional classes. */
  className?: string

  /** A button can show it is currently unable to be interacted with. */
  disabled?: boolean

  /** Shorthand for primary content. */
  content?: React.ReactNode

  /** A button can take the width of its container. */
  fluid?: boolean

  /** Button can have an icon. */
  icon?: React.ReactNode | object | (React.ReactNode | object)[]

  /** An icon button can format an Icon to appear before or after the button */
  iconPosition?: 'before' | 'after'

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.SyntheticEvent, data: IButtonProps) => void

  /** A button can be formatted to show different levels of emphasis. */
  type?: 'primary' | 'secondary'

  /** Accessibility behavior if overridden by the user. */
  accessibility?: object | Function

  /** Custom styles to be applied for component. */
  styles?: IComponentPartStylesInput

  /** Custom variables to be applied for component. */
  variables?: ComponentVariablesInput
}

export type IButtonProps = NotStrictProps<IButtonPropsStrict>

/**
 * A button.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Button extends UIComponent<IButtonProps, any> {
  public static displayName = 'Button'

  public static className = 'ui-button'

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A button can appear circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** A button can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A button can take the width of its container. */
    fluid: PropTypes.bool,

    /** Button can have an icon. */
    icon: customPropTypes.itemShorthand,

    /** An icon button can format an Icon to appear before or after the button */
    iconPosition: PropTypes.oneOf(['before', 'after']),

    /**
     * Called after user's click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A button can be formatted to show different levels of emphasis. */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'accessibility',
    'as',
    'children',
    'circular',
    'className',
    'content',
    'disabled',
    'fluid',
    'icon',
    'iconPosition',
    'onClick',
    'styles',
    'type',
    'variables',
  ]

  public static defaultProps = {
    as: 'button',
    accessibility: ButtonBehavior as Accessibility,
  }

  public renderComponent({ ElementType, classes, accessibility, rest }): React.ReactNode {
    const { children, content, disabled, iconPosition } = this.props
    const hasChildren = childrenExist(children)

    return (
      <ElementType
        className={classes.root}
        disabled={disabled}
        onClick={this.handleClick}
        {...accessibility.attributes.root}
        {...rest}
      >
        {hasChildren && children}
        {!hasChildren && iconPosition !== 'after' && this.renderIcon()}
        {!hasChildren && content}
        {!hasChildren && iconPosition === 'after' && this.renderIcon()}
      </ElementType>
    )
  }

  public renderIcon = () => {
    const { disabled, icon, iconPosition, content, type } = this.props

    return Icon.create(icon, {
      defaultProps: {
        xSpacing: !content ? 'none' : iconPosition === 'after' ? 'before' : 'after',
        variables: { color: type === 'primary' && !disabled ? 'white' : undefined },
      },
    })
  }

  private handleClick = (e: React.SyntheticEvent) => {
    const { onClick, disabled } = this.props

    if (disabled) {
      e.preventDefault()
      return
    }

    if (onClick) {
      onClick(e, this.props)
    }
  }
}

export default Button
