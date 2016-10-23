import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './style.css';

class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger'])
  }
  render() {
    const buttonClasses = classNames(
      'Button',
      this.props.type,
  );

    return (
      <a href="#"
         className={buttonClasses}
         onClick={this.handleClick}>
         {this.props.text}
      </a>
    );
  }
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  }
}

export default Button;
