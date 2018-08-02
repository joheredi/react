import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'
import _ from 'lodash'

import { childrenExist, createShorthandFactory, customPropTypes, UIComponent } from '../../lib'

import { Icon } from '../..'
import labelRules from './labelRules'
import labelVariables from './labelVariables'

/**
 * A label displays content classification
 */
class Label extends UIComponent<any, any> {
  static displayName = 'Label'

  static create: Function

  static className = 'ui-label'

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** A label can be circular. */
    circular: PropTypes.bool,

    /** Additional classes. */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** Label can have an icon. */
    icon: customPropTypes.some([PropTypes.string, PropTypes.object]),

    /** An icon label can format an Icon to appear before or after the text in the label */
    iconPosition: PropTypes.oneOf(['start', 'end']),

    /**
     * Function called when the icon is clicked.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onIconClick: PropTypes.func,
  }

  static handledProps = [
    'as',
    'children',
    'circular',
    'className',
    'content',
    'icon',
    'iconPosition',
    'onIconClick',
  ]

  static defaultProps = {
    as: 'label',
  }

  static rules = labelRules

  static variables = labelVariables

  handleIconOverrides = predefinedProps => {
    const { onIconClick, iconPosition, content } = this.props
    const { onClick, variables, xSpacing } = predefinedProps

    return {
      onClick: e => {
        _.invoke(predefinedProps, 'onClick', e)
        _.invoke(this.props, 'onIconClick', e, this.props)
      },
      ...((onClick || onIconClick) && { tabIndex: '0' }),
      ...((!variables || !variables.color) && { variables: { color: Label.variables().color } }),
      ...(!xSpacing && {
        xSpacing: !content ? 'none' : iconPosition === 'end' ? 'before' : 'after',
      }),
    }
  }

  renderComponent({ ElementType, classes, rest }) {
    const { children, content, icon, iconPosition } = this.props
    const getContent = (): ReactNode => {
      const iconAtEnd = iconPosition === 'end'
      const iconAtStart = !iconAtEnd

      const iconElement = Icon.create(
        {
          className: classes.icon,
          ...(typeof icon === 'string' ? { name: icon } : { ...icon }),
        },
        {
          generateKey: false,
          overrideProps: this.handleIconOverrides,
        },
      )

      return [iconAtStart && icon && iconElement, content, iconAtEnd && icon && iconElement]
    }

    return (
      <ElementType {...rest} className={classes.root}>
        {childrenExist(children) ? children : getContent()}
      </ElementType>
    )
  }
}

Label.create = createShorthandFactory(Label, content => ({ content }))

export default Label
