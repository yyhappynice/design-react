import React from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class ButtonGroup extends React.Component {
  render() {
    const classes = classNames('dl-button-group')

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    )
  }
}