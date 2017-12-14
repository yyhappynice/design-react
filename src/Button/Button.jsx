import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.scss'

export default class Button extends React.Component {

  static defaultProps = {
    type: 'default',
    htmlType: 'button',
    disabled: false,
    loading: false,
    className: ''
  }

  static propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['large', 'default', 'small']),
    icon: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset'])
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  render () {
    const { type, size, icon, className, htmlType, children, disabled } = this.props

    const classes = classNames(
      'dl-button',
      type && `dl-button-${type}`,
      size && `dl-button-${size}`,
      {
        'is-disabled': disabled
      },
      className,
    )

    return (
      <button
        className={classes}
        disabled={disabled}
        type={htmlType || 'button'}
        onClick={this.onClick.bind(this)}>
        { icon && <i className={`dl-icon-${icon}`} /> }
        <span>{children}</span>
      </button>
    )
  }
}