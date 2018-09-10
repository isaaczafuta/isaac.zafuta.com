import PropTypes from 'prop-types';
import React from 'react';


class CurrencyInput extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
  };

  handleChange = (newValue) => {
    const number = parseInt(newValue.replace(/[^\d]/g, ''), 10);
    this.props.onChange(number);
  };

  render() {
    const {onChange, value, ...props} = this.props;

    const formatted = `$${Number(value / 100).toFixed(2)}`;

    return (
      <input value={formatted}
             onChange={(e) => this.handleChange(e.target.value)}
             {...props}/>
    );
  }
}

export {
  CurrencyInput,
}
